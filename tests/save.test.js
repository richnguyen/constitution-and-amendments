import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

let save;

beforeEach(async () => {
  window.localStorage.clear();
  vi.resetModules();
  save = await import("../js/save.js");
});

afterEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("defaultState", () => {
  it("starts a new player with no XP and chapter 1 unlocked", () => {
    const state = save.defaultState();
    expect(state.xp).toBe(0);
    expect(state.level).toBe(1);
    expect(state.streak).toBe(0);
    expect(state.lastActive).toBeNull();
    expect(state.badges).toEqual([]);
    expect(state.collectibles).toEqual([]);
    expect(state.readAmendments).toEqual([]);
    expect(state.quizStars).toEqual({});
  });

  it("locks every chapter after the first", () => {
    const state = save.defaultState();
    expect(state.chapters).toHaveLength(5);
    expect(state.chapters[0].status).toBe("unlocked");
    for (const chapter of state.chapters.slice(1)) {
      expect(chapter.status).toBe("locked");
      expect(chapter.stars).toBe(0);
    }
  });

  it("returns an independent object on each call", () => {
    const first = save.defaultState();
    first.chapters[0].status = "completed";
    expect(save.defaultState().chapters[0].status).toBe("unlocked");
  });
});

describe("load", () => {
  it("returns defaults when storage is empty", () => {
    const state = save.load();
    expect(state).toEqual(save.defaultState());
  });

  it("recovers a persisted state", () => {
    const state = save.defaultState();
    state.xp = 240;
    state.level = 3;
    state.badges = ["we-the-people"];
    save.persist(state);

    const loaded = save.load();
    expect(loaded.xp).toBe(240);
    expect(loaded.level).toBe(3);
    expect(loaded.badges).toEqual(["we-the-people"]);
  });

  it("returns defaults when the JSON is corrupt", () => {
    window.localStorage.setItem(save.SAVE_KEY, "{ not json ]");
    expect(save.load()).toEqual(save.defaultState());
  });

  it("returns defaults when the stored value is not an object", () => {
    window.localStorage.setItem(save.SAVE_KEY, JSON.stringify(["nope"]));
    expect(save.load()).toEqual(save.defaultState());
  });

  it("ignores fields of the wrong type and keeps valid ones", () => {
    window.localStorage.setItem(
      save.SAVE_KEY,
      JSON.stringify({ xp: "lots", level: 4, badges: "we-the-people" })
    );
    const loaded = save.load();
    expect(loaded.xp).toBe(0);
    expect(loaded.level).toBe(4);
    expect(loaded.badges).toEqual([]);
  });

  it("deduplicates reward arrays", () => {
    window.localStorage.setItem(
      save.SAVE_KEY,
      JSON.stringify({ badges: ["a", "a", "b"], collectibles: ["madison", "madison"] })
    );
    const loaded = save.load();
    expect(loaded.badges).toEqual(["a", "b"]);
    expect(loaded.collectibles).toEqual(["madison"]);
  });

  it("drops quiz star records for unknown quizzes and clamps stars", () => {
    window.localStorage.setItem(
      save.SAVE_KEY,
      JSON.stringify({ quizStars: { "constitution-iq": 9, "not-a-quiz": 3 } })
    );
    const loaded = save.load();
    expect(loaded.quizStars["constitution-iq"]).toBe(3);
    expect(loaded.quizStars).not.toHaveProperty("not-a-quiz");
  });

  it("restores completed chapters and unlocks the next one", () => {
    const state = save.defaultState();
    state.chapters[0] = { id: 1, status: "completed", stars: 3 };
    save.persist(state);

    const loaded = save.load();
    expect(loaded.chapters[0].status).toBe("completed");
    expect(loaded.chapters[1].status).toBe("unlocked");
    expect(loaded.chapters[2].status).toBe("locked");
  });

  it("refuses to honour a locked chapter that storage claims is unlocked", () => {
    window.localStorage.setItem(
      save.SAVE_KEY,
      JSON.stringify({
        chapters: [
          { id: 1, status: "unlocked", stars: 0 },
          { id: 2, status: "completed", stars: 3 },
          { id: 3, status: "unlocked", stars: 0 },
        ],
      })
    );
    const loaded = save.load();
    // Chapter 2 cannot be completed before chapter 1, so progression restarts.
    expect(loaded.chapters[0].status).toBe("unlocked");
    expect(loaded.chapters[1].status).toBe("locked");
    expect(loaded.chapters[2].status).toBe("locked");
  });

  it("clamps stored star counts into the 0-3 range", () => {
    window.localStorage.setItem(
      save.SAVE_KEY,
      JSON.stringify({ chapters: [{ id: 1, status: "completed", stars: 99 }] })
    );
    expect(save.load().chapters[0].stars).toBe(3);
  });
});

describe("persist", () => {
  it("writes under the documented key", () => {
    save.persist(save.defaultState());
    expect(window.localStorage.getItem(save.SAVE_KEY)).toBeTruthy();
    expect(save.SAVE_KEY).toBe("cq.save.v1");
  });

  it("reports success", () => {
    expect(save.persist(save.defaultState())).toBe(true);
  });

  it("round-trips nested state", () => {
    const state = save.defaultState();
    state.chapters[0] = { id: 1, status: "completed", stars: 2 };
    state.quizStars = { "constitution-iq": 3 };
    state.readAmendments = ["a1", "a2"];
    save.persist(state);

    const loaded = save.load();
    expect(loaded.chapters[0].stars).toBe(2);
    expect(loaded.quizStars["constitution-iq"]).toBe(3);
    expect(loaded.readAmendments).toEqual(["a1", "a2"]);
  });
});

describe("reset", () => {
  it("clears stored progress", () => {
    const state = save.defaultState();
    state.xp = 500;
    save.persist(state);

    save.reset();
    expect(window.localStorage.getItem(save.SAVE_KEY)).toBeNull();
  });

  it("returns a fresh default state", () => {
    const state = save.defaultState();
    state.xp = 500;
    save.persist(state);

    expect(save.reset().xp).toBe(0);
  });
});

describe("storage failures", () => {
  it("load falls back to defaults when getItem throws", () => {
    vi.spyOn(window.localStorage, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(save.load()).toEqual(save.defaultState());
  });

  it("persist reports failure instead of throwing", () => {
    // Force the module's write path to fail. Stubbing Storage.prototype reaches
    // the call inside persist(), unlike spying on the instance after the
    // module already captured its storage capability at import time.
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    expect(save.persist(save.defaultState())).toBe(false);
  });
});
