// Constitution Quest — game logic.
// Pure functions over SaveData. No DOM, no storage access.

export const XP = {
  beat: 5,
  chapter: 50,
  quizQuestion: 10,
  quizPerfect: 30,
};

const LEVEL_STEP = 100;

/** Total XP required to have reached `level`. Level 1 starts at 0 XP. */
export function xpForLevel(level) {
  const normalized = Math.max(1, Math.floor(level));
  return (normalized - 1) * LEVEL_STEP;
}

/** Level implied by a total XP count. */
export function computeLevel(xp) {
  const safe = Number.isFinite(xp) && xp > 0 ? xp : 0;
  return Math.floor(safe / LEVEL_STEP) + 1;
}

/** XP awarded for a reward kind; unknown kinds award nothing. */
export function xpReward(type) {
  return Object.prototype.hasOwnProperty.call(XP, type) ? XP[type] : 0;
}

/** XP still needed to reach the next level. */
export function xpToNextLevel(xp) {
  const safe = Number.isFinite(xp) && xp > 0 ? xp : 0;
  return LEVEL_STEP - (safe % LEVEL_STEP);
}

/** Progress through the current level, 0..1. */
export function levelProgress(xp) {
  const safe = Number.isFinite(xp) && xp > 0 ? xp : 0;
  return (safe % LEVEL_STEP) / LEVEL_STEP;
}

/**
 * Add XP and keep `level` in sync. Mutates and returns the state.
 */
export function addXP(state, amount) {
  if (!Number.isFinite(amount) || amount <= 0) return state;
  state.xp = (Number.isFinite(state.xp) ? state.xp : 0) + Math.floor(amount);
  state.level = computeLevel(state.xp);
  return state;
}

const DAY_MS = 24 * 60 * 60 * 1000;

const toDayKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const daysBetween = (fromKey, toKey) => {
  const [fy, fm, fd] = fromKey.split("-").map(Number);
  const [ty, tm, td] = toKey.split("-").map(Number);
  const from = Date.UTC(fy, fm - 1, fd);
  const to = Date.UTC(ty, tm - 1, td);
  return Math.round((to - from) / DAY_MS);
};

/**
 * Update the daily streak.
 * - First activity: streak becomes 1.
 * - Same day as last activity: unchanged.
 * - Next calendar day: streak + 1.
 * - Any longer gap (or a clock that moved backwards): streak resets to 1.
 *
 * `now` is injectable so tests never depend on the wall clock.
 */
export function updateStreak(state, now = new Date()) {
  const today = toDayKey(now);
  if (!state.lastActive) {
    state.streak = 1;
  } else {
    const gap = daysBetween(state.lastActive, today);
    if (gap === 0) {
      if (!Number.isFinite(state.streak) || state.streak < 1) state.streak = 1;
    } else if (gap === 1) {
      state.streak = (Number.isFinite(state.streak) ? state.streak : 0) + 1;
    } else {
      state.streak = 1;
    }
  }
  state.lastActive = today;
  return state;
}

/** Award a badge id. Returns true when it was newly earned. */
export function earnBadge(state, badgeId) {
  if (!badgeId || state.badges.includes(badgeId)) return false;
  state.badges.push(badgeId);
  return true;
}

/** Award a collectible id. Returns true when it was newly earned. */
export function earnCollectible(state, collectibleId) {
  if (!collectibleId || state.collectibles.includes(collectibleId)) return false;
  state.collectibles.push(collectibleId);
  return true;
}

const CHAPTER_BADGES = new Set([
  "we-the-people",
  "three-branches",
  "federalist",
  "rights-reader",
  "democracy-builder",
]);

/**
 * Every badge whose condition the current state satisfies, earned or not.
 * Pure: the caller decides what is new by diffing against state.badges.
 */
export function earnedBadges(state, data) {
  const earned = [];
  const completed = state.chapters.filter((c) => c.status === "completed");

  for (const chapter of data.chapters) {
    const record = state.chapters.find((c) => c.id === chapter.id);
    if (record && record.status === "completed" && chapter.badge) {
      earned.push(chapter.badge);
    }
  }

  const bestStars = Math.max(0, ...Object.values(state.quizStars || {}));
  if (bestStars >= 3) earned.push("quiz-whiz");

  const amendmentsRead = (state.readAmendments || []).length;
  if (amendmentsRead >= 10) earned.push("stamp-collector");
  if (amendmentsRead >= data.amendments.length) earned.push("all-27");

  if (completed.length === data.chapters.length) earned.push("journey-complete");

  return [...new Set(earned)].filter((id) => CHAPTER_BADGES.has(id) || data.badges.some((b) => b.id === id));
}

/**
 * Grant every badge the state now qualifies for.
 * Returns the list of newly-earned badge objects (empty when nothing changed).
 */
export function checkBadges(state, data) {
  const newly = [];
  for (const badgeId of earnedBadges(state, data)) {
    if (earnBadge(state, badgeId)) {
      const badge = data.badges.find((b) => b.id === badgeId);
      if (badge) newly.push(badge);
    }
  }
  return newly;
}

/** Star rating from a correct-answer count out of the question total. */
export function starsFor(correct, total) {
  if (!total || total <= 0) return 0;
  const ratio = correct / total;
  if (ratio === 1) return 3;
  if (ratio >= 0.6) return 2;
  if (ratio > 0) return 1;
  return 0;
}

/** Record the best star result for a quiz. Mutates and returns state. */
export function recordQuizStars(state, quizId, stars) {
  const best = Math.max(state.quizStars[quizId] || 0, stars);
  state.quizStars[quizId] = Math.min(3, Math.max(0, best));
  return state;
}
