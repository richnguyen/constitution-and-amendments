import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

let xp;
let load;

beforeEach(async () => {
  window.localStorage.clear();
  vi.resetModules();
  vi.useRealTimers();
  xp = await import("../js/xp.js");
  ({ load } = await import("../js/save.js"));
});

afterEach(() => {
  vi.useRealTimers();
  window.localStorage.clear();
});

describe("levels", () => {
  it("starts at level 1 with no XP", () => {
    expect(xp.computeLevel(0)).toBe(1);
  });

  it("treats negative and non-finite XP as zero", () => {
    expect(xp.computeLevel(-50)).toBe(1);
    expect(xp.computeLevel(Number.NaN)).toBe(1);
    expect(xp.computeLevel(undefined)).toBe(1);
  });

  it("advances one level per 100 XP", () => {
    expect(xp.computeLevel(99)).toBe(1);
    expect(xp.computeLevel(100)).toBe(2);
    expect(xp.computeLevel(250)).toBe(3);
    expect(xp.computeLevel(1000)).toBe(11);
  });

  it("reports the XP threshold for a level", () => {
    expect(xp.xpForLevel(1)).toBe(0);
    expect(xp.xpForLevel(2)).toBe(100);
    expect(xp.xpForLevel(5)).toBe(400);
  });

  it("reports XP remaining and progress within the level", () => {
    expect(xp.xpToNextLevel(0)).toBe(100);
    expect(xp.xpToNextLevel(40)).toBe(60);
    expect(xp.xpToNextLevel(100)).toBe(100);
    expect(xp.levelProgress(0)).toBe(0);
    expect(xp.levelProgress(50)).toBe(0.5);
    expect(xp.levelProgress(150)).toBe(0.5);
  });
});

describe("xpReward", () => {
  it("awards known reward kinds", () => {
    expect(xp.xpReward("beat")).toBeGreaterThan(0);
    expect(xp.xpReward("chapter")).toBeGreaterThan(xp.xpReward("beat"));
    expect(xp.xpReward("quizQuestion")).toBeGreaterThan(0);
    expect(xp.xpReward("quizPerfect")).toBeGreaterThan(0);
  });

  it("awards nothing for unknown kinds", () => {
    expect(xp.xpReward("nonsense")).toBe(0);
    expect(xp.xpReward()).toBe(0);
  });
});

describe("addXP", () => {
  it("accumulates and syncs the level", () => {
    const state = load();
    xp.addXP(state, 60);
    expect(state.xp).toBe(60);
    expect(state.level).toBe(1);

    xp.addXP(state, 60);
    expect(state.xp).toBe(120);
    expect(state.level).toBe(2);
  });

  it("ignores non-positive and non-finite amounts", () => {
    const state = load();
    xp.addXP(state, 0);
    xp.addXP(state, -10);
    xp.addXP(state, Number.NaN);
    expect(state.xp).toBe(0);
  });

  it("recovers from a corrupt xp field", () => {
    const state = load();
    state.xp = "broken";
    xp.addXP(state, 10);
    expect(state.xp).toBe(10);
    expect(state.level).toBe(1);
  });
});

describe("updateStreak", () => {
  const day = (y, m, d) => new Date(y, m - 1, d, 12, 0, 0);

  it("starts a streak at 1 on first activity", () => {
    const state = load();
    xp.updateStreak(state, day(2026, 3, 1));
    expect(state.streak).toBe(1);
    expect(state.lastActive).toBe("2026-3-1");
  });

  it("does not change the streak on the same day", () => {
    const state = load();
    xp.updateStreak(state, day(2026, 3, 1));
    xp.updateStreak(state, day(2026, 3, 1));
    expect(state.streak).toBe(1);
  });

  it("increments on the next calendar day", () => {
    const state = load();
    xp.updateStreak(state, day(2026, 3, 1));
    xp.updateStreak(state, day(2026, 3, 2));
    expect(state.streak).toBe(2);
    xp.updateStreak(state, day(2026, 3, 3));
    expect(state.streak).toBe(3);
  });

  it("resets after a missed day", () => {
    const state = load();
    xp.updateStreak(state, day(2026, 3, 1));
    xp.updateStreak(state, day(2026, 3, 2));
    xp.updateStreak(state, day(2026, 3, 5));
    expect(state.streak).toBe(1);
  });

  it("handles a month boundary", () => {
    const state = load();
    xp.updateStreak(state, day(2026, 1, 31));
    xp.updateStreak(state, day(2026, 2, 1));
    expect(state.streak).toBe(2);
  });

  it("handles a year boundary", () => {
    const state = load();
    xp.updateStreak(state, day(2025, 12, 31));
    xp.updateStreak(state, day(2026, 1, 1));
    expect(state.streak).toBe(2);
  });

  it("resets when the clock moves backwards", () => {
    const state = load();
    xp.updateStreak(state, day(2026, 3, 10));
    xp.updateStreak(state, day(2026, 3, 1));
    expect(state.streak).toBe(1);
  });

  it("defaults to the real clock when no date is passed", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 4, 20, 9, 0, 0));
    const state = load();
    xp.updateStreak(state);
    expect(state.lastActive).toBe("2026-5-20");
    expect(state.streak).toBe(1);
  });
});

describe("rewards", () => {
  it("earns a badge exactly once", () => {
    const state = load();
    expect(xp.earnBadge(state, "we-the-people")).toBe(true);
    expect(xp.earnBadge(state, "we-the-people")).toBe(false);
    expect(state.badges).toEqual(["we-the-people"]);
  });

  it("ignores empty badge ids", () => {
    const state = load();
    expect(xp.earnBadge(state, "")).toBe(false);
    expect(state.badges).toEqual([]);
  });

  it("earns a collectible exactly once", () => {
    const state = load();
    expect(xp.earnCollectible(state, "madison")).toBe(true);
    expect(xp.earnCollectible(state, "madison")).toBe(false);
    expect(state.collectibles).toEqual(["madison"]);
  });
});

describe("starsFor", () => {
  it("awards 3 stars for a perfect score", () => {
    expect(xp.starsFor(5, 5)).toBe(3);
    expect(xp.starsFor(3, 3)).toBe(3);
  });

  it("awards 2 stars from 60% up", () => {
    expect(xp.starsFor(3, 5)).toBe(2);
    expect(xp.starsFor(4, 5)).toBe(2);
  });

  it("awards 1 star for a partial score below 60%", () => {
    expect(xp.starsFor(1, 5)).toBe(1);
    expect(xp.starsFor(2, 5)).toBe(1);
  });

  it("awards nothing for zero correct or zero questions", () => {
    expect(xp.starsFor(0, 5)).toBe(0);
    expect(xp.starsFor(0, 0)).toBe(0);
  });
});

describe("recordQuizStars", () => {
  it("stores the first result", () => {
    const state = load();
    xp.recordQuizStars(state, "constitution-iq", 2);
    expect(state.quizStars["constitution-iq"]).toBe(2);
  });

  it("keeps the best result", () => {
    const state = load();
    xp.recordQuizStars(state, "constitution-iq", 3);
    xp.recordQuizStars(state, "constitution-iq", 1);
    expect(state.quizStars["constitution-iq"]).toBe(3);
  });

  it("upgrades a weaker result", () => {
    const state = load();
    xp.recordQuizStars(state, "constitution-iq", 1);
    xp.recordQuizStars(state, "constitution-iq", 3);
    expect(state.quizStars["constitution-iq"]).toBe(3);
  });
});

describe("checkBadges", () => {
  const data = {
    chapters: [
      { id: 1, badge: "we-the-people" },
      { id: 2, badge: "three-branches" },
    ],
    badges: [
      { id: "we-the-people", name: "We the People", description: "", icon: "scroll" },
      { id: "three-branches", name: "Three Branches", description: "", icon: "capitol" },
      { id: "quiz-whiz", name: "Quiz Whiz", description: "", icon: "star" },
      { id: "stamp-collector", name: "Stamp Collector", description: "", icon: "stamp" },
      { id: "all-27", name: "All 27", description: "", icon: "scroll" },
      { id: "journey-complete", name: "Journey Complete", description: "", icon: "trophy" },
    ],
    amendments: Array.from({ length: 27 }, (_, i) => ({ id: i + 1 })),
  };

  const stateWith = (overrides = {}) => ({
    chapters: [
      { id: 1, status: "locked", stars: 0 },
      { id: 2, status: "locked", stars: 0 },
    ],
    quizStars: {},
    readAmendments: [],
    badges: [],
    ...overrides,
  });

  it("awards nothing for a fresh player", () => {
    expect(xp.checkBadges(stateWith(), data)).toEqual([]);
  });

  it("awards the chapter badge on completion", () => {
    const state = stateWith({
      chapters: [
        { id: 1, status: "completed", stars: 3 },
        { id: 2, status: "locked", stars: 0 },
      ],
    });
    const earned = xp.checkBadges(state, data).map((b) => b.id);
    expect(earned).toEqual(["we-the-people"]);
    expect(state.badges).toContain("we-the-people");
  });

  it("awards Quiz Whiz at three stars", () => {
    const state = stateWith({ quizStars: { "constitution-iq": 3 } });
    expect(xp.checkBadges(state, data).map((b) => b.id)).toContain("quiz-whiz");
  });

  it("does not re-award an owned badge", () => {
    const state = stateWith({
      quizStars: { "constitution-iq": 3 },
      badges: ["quiz-whiz"],
    });
    expect(xp.checkBadges(state, data)).toEqual([]);
    expect(state.badges.filter((id) => id === "quiz-whiz")).toHaveLength(1);
  });

  it("awards Stamp Collector at ten amendments read", () => {
    const state = stateWith({
      readAmendments: Array.from({ length: 10 }, (_, i) => `a${i + 1}`),
    });
    const earned = xp.checkBadges(state, data).map((b) => b.id);
    expect(earned).toContain("stamp-collector");
    expect(earned).not.toContain("all-27");
  });

  it("awards All 27 when every amendment is read", () => {
    const state = stateWith({ readAmendments: data.amendments.map((a) => `a${a.id}`) });
    expect(xp.checkBadges(state, data).map((b) => b.id)).toContain("all-27");
  });

  it("awards Journey Complete only after every chapter", () => {
    const partial = stateWith({
      chapters: [
        { id: 1, status: "completed", stars: 3 },
        { id: 2, status: "locked", stars: 0 },
      ],
    });
    expect(xp.checkBadges(partial, data).map((b) => b.id)).not.toContain("journey-complete");

    const all = stateWith({
      chapters: [
        { id: 1, status: "completed", stars: 3 },
        { id: 2, status: "completed", stars: 3 },
      ],
    });
    expect(xp.checkBadges(all, data).map((b) => b.id)).toContain("journey-complete");
  });
});
