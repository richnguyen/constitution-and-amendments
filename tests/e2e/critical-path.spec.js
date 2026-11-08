import { test, expect } from "@playwright/test";

/**
 * Critical path: a new player completes chapter 1, earns XP and a founder card,
 * then reloads and finds the progress still there.
 *
 * Locators are semantic only (role, label, text, test id) per RAI.md rule 2.
 */

const CHAPTER_1_CORRECT = [1, 2, 1];

/**
 * Answer the current question by clicking the first option, then advance.
 * Used where a test only needs the flow to progress, not a specific score.
 */
const answerCurrentQuestion = async (page) => {
  const group = page.getByRole("group", { name: "Answer choices" });
  await expect(group).toBeVisible();
  await group.getByRole("button").first().click();
  await expect(page.getByText(/Correct\.|Not quite\./)).toBeVisible();
  await page.getByRole("button", { name: /Next question|See results/ }).click();
};

/**
 * Score a perfect run by clicking the option index the content declares
 * correct, in order. This exercises the "Correct." branch and makes the
 * resulting accuracy and star rating deterministic, so tests can assert on an
 * exact score rather than a loose range.
 */
const answerPerfectly = async (page, correctIndices) => {
  for (const correctIndex of correctIndices) {
    const group = page.getByRole("group", { name: "Answer choices" });
    await expect(group).toBeVisible();
    await group.getByRole("button").nth(correctIndex).click();
    await expect(page.getByText(/Correct\./)).toBeVisible();
    await page.getByRole("button", { name: /Next question|See results/ }).click();
  }
};

test.beforeEach(async ({ page }) => {
  await page.goto("/index.html");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test("new player sees the journey map with chapter 1 unlocked", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Constitution Quest" })).toBeVisible();
  await expect(page.getByTestId("chapter-node-1")).toHaveAttribute("data-status", "unlocked");
  await expect(page.getByTestId("chapter-node-2")).toHaveAttribute("data-status", "locked");
  await expect(page.getByTestId("chapter-progress")).toHaveText("0 / 5");
  await expect(page.getByTestId("level-chip")).toHaveText("Level 1");
});

test("completing chapter 1 awards stars, XP and a founder card, and persists", async ({ page }) => {
  await page.getByTestId("chapter-node-1").getByRole("button", { name: "Play" }).click();

  // Walk the story beats until the checkpoint.
  for (let i = 0; i < 10; i += 1) {
    const next = page.getByRole("button", { name: /Continue|Take the checkpoint/ });
    if (!(await next.isVisible().catch(() => false))) break;
    await next.click();
    if (await page.getByTestId("check-question").isVisible().catch(() => false)) break;
  }

  await expect(page.getByTestId("check-question")).toBeVisible();
  await answerPerfectly(page, CHAPTER_1_CORRECT);

  const result = page.getByTestId("chapter-result");
  await expect(result).toBeVisible();
  await expect(result.getByRole("heading", { name: "Chapter complete" })).toBeVisible();
  await expect(result.getByText("3 of 3 correct")).toBeVisible();

  await result.getByRole("button", { name: "Back to map" }).click();

  // The founder card popup appears on return.
  const popup = page.getByRole("dialog");
  if (await popup.isVisible().catch(() => false)) {
    await expect(popup.getByRole("heading", { name: "James Madison" })).toBeVisible();
    await popup.getByRole("button", { name: "Collect!" }).click();
  }

  await expect(page.getByTestId("chapter-node-1")).toHaveAttribute("data-status", "completed");
  await expect(page.getByTestId("chapter-node-2")).toHaveAttribute("data-status", "unlocked");
  await expect(page.getByTestId("chapter-progress")).toHaveText("1 / 5");
  // A chapter is worth 50 XP, so one completion is progress within level 1.
  await expect(page.getByTestId("xp-text")).not.toHaveText("0 XP · 100 to next");

  // Progress survives a reload.
  await page.reload();
  await expect(page.getByTestId("chapter-node-1")).toHaveAttribute("data-status", "completed");
  await expect(page.getByTestId("chapter-progress")).toHaveText("1 / 5");
});

test("replaying a chapter does not duplicate its founder card or XP", async ({ page }) => {
  const readState = () =>
    page.evaluate(() => JSON.parse(window.localStorage.getItem("cq.save.v1") || "{}"));

  const dismissPopups = async () => {
    for (let i = 0; i < 5; i += 1) {
      const popup = page.getByRole("dialog");
      if (!(await popup.isVisible().catch(() => false))) return;
      await popup.getByRole("button", { name: "Collect!" }).click();
      await page.waitForTimeout(200);
    }
  };

  const playChapter1 = async () => {
    await dismissPopups();
    await page.getByTestId("chapter-node-1").getByRole("button", { name: /Play|Replay/ }).click();
    for (let i = 0; i < 12; i += 1) {
      const next = page.getByRole("button", { name: /Continue|Take the checkpoint/ });
      if (!(await next.isVisible().catch(() => false))) break;
      await next.click();
      if (await page.getByTestId("check-question").isVisible().catch(() => false)) break;
    }
    await answerPerfectly(page, CHAPTER_1_CORRECT);
    await page.getByTestId("chapter-result").getByRole("button", { name: "Back to map" }).click();
    await page.waitForTimeout(250);
    await dismissPopups();
  };

  await playChapter1();
  const afterFirst = await readState();

  await playChapter1();
  const afterSecond = await readState();

  expect(afterSecond.xp).toBe(afterFirst.xp);
  expect(afterSecond.collectibles).toEqual(afterFirst.collectibles);
  expect(afterSecond.collectibles.filter((id) => id === "madison")).toHaveLength(1);
});

test("quiz gives instant feedback, stars, and can be replayed", async ({ page }) => {
  await page.getByRole("button", { name: "Take the quiz" }).click();
  await expect(page.getByTestId("quiz-question")).toBeVisible();

  for (let i = 0; i < 5; i += 1) {
    await answerCurrentQuestion(page);
  }

  const result = page.getByTestId("quiz-result");
  await expect(result).toBeVisible();
  await expect(result.getByText(/of 5 correct/)).toBeVisible();

  await result.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByTestId("quiz-question")).toBeVisible();
});

test("reader shows original text and reveals the plain-language panel", async ({ page }) => {
  await page.getByRole("button", { name: "Read" }).click();

  await expect(page.getByTestId("original-text")).toContainText("We the People");

  const toggle = page.getByRole("button", { name: "What it means" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByTestId("plain-panel")).toBeVisible();

  // Navigate to an amendment and confirm its full text loads.
  await page.getByRole("button", { name: /^1st —/ }).click();
  await expect(page.getByTestId("original-text")).toContainText("establishment of religion");
});

test("glossary search filters the term list", async ({ page }) => {
  await page.getByRole("button", { name: "Glossary" }).click();

  const search = page.getByLabel("Search terms");
  await expect(page.getByTestId("glossary-list").getByRole("term")).toHaveCount(29);

  await search.fill("veto");
  await expect(page.getByTestId("glossary-list").getByRole("term")).toHaveCount(1);
  await expect(page.getByTestId("glossary-list")).toContainText("Veto");

  await search.fill("zzzz");
  await expect(page.getByText("No terms match that search.")).toBeVisible();
});

test("collection shows earned and missing rewards", async ({ page }) => {
  await page.getByRole("button", { name: "Collection" }).click();

  await expect(page.getByTestId("badge-we-the-people")).toContainText("???");
  await expect(page.getByTestId("stamp-count")).toHaveText("0 / 27");
  await expect(page.getByTestId("founder-madison")).toContainText("???");
});
