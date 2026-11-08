import { describe, it, expect } from "vitest";
import { DATA } from "../js/data.js";

const nonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

describe("DATA shape", () => {
  it("exposes every required collection", () => {
    for (const key of [
      "preamble",
      "articles",
      "amendments",
      "chapters",
      "badges",
      "founders",
      "quizzes",
      "glossary",
    ]) {
      expect(DATA, `missing DATA.${key}`).toHaveProperty(key);
    }
  });
});

describe("preamble", () => {
  it("carries title, original text and plain-language text", () => {
    expect(nonEmptyString(DATA.preamble.title)).toBe(true);
    expect(nonEmptyString(DATA.preamble.original)).toBe(true);
    expect(nonEmptyString(DATA.preamble.plain)).toBe(true);
    expect(DATA.preamble.original).toContain("We the People");
  });
});

describe("articles", () => {
  it("has exactly 7 articles", () => {
    expect(DATA.articles).toHaveLength(7);
  });

  it("gives every article a full reader record", () => {
    for (const article of DATA.articles) {
      expect(article.id, "article id").toBeTypeOf("number");
      for (const field of ["title", "summary", "original", "plain", "keyQuote"]) {
        expect(nonEmptyString(article[field]), `article ${article.id} .${field}`).toBe(true);
      }
    }
  });

  it("numbers articles 1 through 7 without gaps", () => {
    expect(DATA.articles.map((a) => a.id)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("quotes the opening line of Article I", () => {
    const first = DATA.articles[0];
    expect(first.keyQuote).toContain("All legislative Powers");
  });
});

describe("amendments", () => {
  it("has exactly 27 amendments", () => {
    expect(DATA.amendments).toHaveLength(27);
  });

  it("numbers amendments 1 through 27 without gaps", () => {
    expect(DATA.amendments.map((a) => a.id)).toEqual(
      Array.from({ length: 27 }, (_, i) => i + 1)
    );
  });

  it("gives every amendment a full reader record", () => {
    for (const amendment of DATA.amendments) {
      for (const field of ["title", "summary", "original", "plain"]) {
        expect(nonEmptyString(amendment[field]), `amendment ${amendment.id} .${field}`).toBe(true);
      }
      expect(amendment.year, `amendment ${amendment.id} year`).toBeTypeOf("number");
      expect(amendment.year).toBeGreaterThanOrEqual(1791);
      expect(amendment.year).toBeLessThanOrEqual(1992);
    }
  });

  it("has a monotonic ratification year sequence", () => {
    const years = DATA.amendments.map((a) => a.year);
    for (let i = 1; i < years.length; i += 1) {
      expect(years[i], `year order at amendment ${i + 1}`).toBeGreaterThanOrEqual(years[i - 1]);
    }
  });

  it("places the rights-bearing amendments correctly", () => {
    expect(DATA.amendments[0].original).toContain("free exercise");
    expect(DATA.amendments[12].plain.toLowerCase()).toContain("slavery");
    expect(DATA.amendments[18].plain.toLowerCase()).toContain("sex");
  });
});

describe("chapters", () => {
  it("has exactly 5 chapters", () => {
    expect(DATA.chapters).toHaveLength(5);
  });

  it("gives every chapter beats ending in a check marker", () => {
    for (const chapter of DATA.chapters) {
      expect(Array.isArray(chapter.beats)).toBe(true);
      expect(chapter.beats.length).toBeGreaterThan(1);
      expect(chapter.beats.at(-1).type).toBe("check");
    }
  });

  it("gives every chapter a three-question comprehension check", () => {
    for (const chapter of DATA.chapters) {
      expect(chapter.check, `chapter ${chapter.id} check`).toHaveLength(3);
      for (const question of chapter.check) {
        expect(nonEmptyString(question.q)).toBe(true);
        expect(question.options).toHaveLength(4);
        expect(question.correct).toBeGreaterThanOrEqual(0);
        expect(question.correct).toBeLessThan(4);
        expect(nonEmptyString(question.explanation)).toBe(true);
      }
    }
  });

  it("references a badge that exists", () => {
    const badgeIds = new Set(DATA.badges.map((b) => b.id));
    for (const chapter of DATA.chapters) {
      expect(badgeIds.has(chapter.badge), `chapter ${chapter.id} badge ${chapter.badge}`).toBe(true);
    }
  });

  it("references founder collectibles that exist", () => {
    const founderIds = new Set(DATA.founders.map((f) => f.id));
    for (const chapter of DATA.chapters) {
      if (chapter.collectible?.type === "founder") {
        expect(founderIds.has(chapter.collectible.id)).toBe(true);
      }
    }
  });
});

describe("badges and founders", () => {
  it("has exactly 9 badges with unique ids", () => {
    expect(DATA.badges).toHaveLength(9);
    const ids = DATA.badges.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has exactly 5 founders with unique ids", () => {
    expect(DATA.founders).toHaveLength(5);
    const ids = DATA.founders.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("describes every founder with a colour and a role", () => {
    for (const founder of DATA.founders) {
      expect(nonEmptyString(founder.name)).toBe(true);
      expect(nonEmptyString(founder.role)).toBe(true);
      expect(founder.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});

describe("quizzes", () => {
  it("has exactly 2 quizzes with unique ids", () => {
    expect(DATA.quizzes).toHaveLength(2);
    const ids = DATA.quizzes.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every quiz five valid questions", () => {
    for (const quiz of DATA.quizzes) {
      expect(quiz.questions, `${quiz.id} questions`).toHaveLength(5);
      for (const question of quiz.questions) {
        expect(question.options).toHaveLength(4);
        expect(question.correct).toBeGreaterThanOrEqual(0);
        expect(question.correct).toBeLessThan(question.options.length);
        expect(nonEmptyString(question.explanation)).toBe(true);
      }
    }
  });

  it("has unique prompts inside each quiz", () => {
    for (const quiz of DATA.quizzes) {
      const prompts = quiz.questions.map((q) => q.q);
      expect(new Set(prompts).size).toBe(prompts.length);
    }
  });

  it("answers its own questions correctly", () => {
    const iq = DATA.quizzes.find((q) => q.id === "constitution-iq");
    expect(iq.questions[0].options[iq.questions[0].correct]).toBe("7");

    const match = DATA.quizzes.find((q) => q.id === "amendments-match");
    expect(match.questions[0].options[match.questions[0].correct]).toBe("13th");
    expect(match.questions[2].options[match.questions[2].correct]).toBe("22nd");
  });
});

describe("glossary", () => {
  it("has the full 29 terms", () => {
    expect(DATA.glossary).toHaveLength(29);
  });

  it("gives every term a definition and a unique name", () => {
    const terms = DATA.glossary.map((entry) => entry.term);
    expect(new Set(terms).size).toBe(terms.length);
    for (const entry of DATA.glossary) {
      expect(nonEmptyString(entry.term)).toBe(true);
      expect(nonEmptyString(entry.def)).toBe(true);
    }
  });

  it("is sorted for scanability", () => {
    const terms = DATA.glossary.map((entry) => entry.term.toLowerCase());
    const sorted = [...terms].sort((a, b) => a.localeCompare(b));
    expect(terms).toEqual(sorted);
  });
});
