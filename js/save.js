// Constitution Quest — persistence seam.
// The ONLY module that touches localStorage. Views call load()/persist().

import { DATA } from "./data.js";

export const SAVE_KEY = "cq.save.v1";

const STORAGE_AVAILABLE = (() => {
  try {
    const probe = "__cq_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
})();

/**
 * Fresh SaveData for a first-time player: chapter 1 unlocked, everything else
 * locked, no XP, no rewards.
 */
export function defaultState() {
  return {
    xp: 0,
    level: 1,
    streak: 0,
    lastActive: null,
    chapters: DATA.chapters.map((chapter, index) => ({
      id: chapter.id,
      status: index === 0 ? "unlocked" : "locked",
      stars: 0,
    })),
    quizStars: {},
    badges: [],
    collectibles: [],
    readAmendments: [],
  };
}

/**
 * Read progress. Never throws: missing, corrupt or partially-written data falls
 * back to defaults, with only valid known fields restored.
 */
export function load() {
  const base = defaultState();
  if (!STORAGE_AVAILABLE) return base;

  let raw = null;
  try {
    raw = window.localStorage.getItem(SAVE_KEY);
  } catch {
    return base;
  }
  if (!raw) return base;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return base;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return base;

  return mergeIntoDefaults(base, parsed);
}

/** Write progress. Returns true when the write succeeded. */
export function persist(state) {
  if (!STORAGE_AVAILABLE) return false;
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

/** Wipe saved progress. Returns the fresh default state. */
export function reset() {
  if (STORAGE_AVAILABLE) {
    try {
      window.localStorage.removeItem(SAVE_KEY);
    } catch {
      // Storage can be full or blocked; the caller still gets a clean state.
    }
  }
  return defaultState();
}

// --- helpers ---------------------------------------------------------------

const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);
const isStringArray = (value) => Array.isArray(value) && value.every((v) => typeof v === "string");

function clampStars(value) {
  if (!isFiniteNumber(value)) return 0;
  return Math.min(3, Math.max(0, Math.floor(value)));
}

/**
 * Merge stored data onto defaults field by field, so a schema addition or a
 * truncated write cannot leave the app with an undefined chapter list.
 */
function mergeIntoDefaults(base, stored) {
  const next = { ...base, chapters: base.chapters.map((c) => ({ ...c })) };

  if (isFiniteNumber(stored.xp) && stored.xp >= 0) next.xp = Math.floor(stored.xp);
  if (isFiniteNumber(stored.level) && stored.level >= 1) next.level = Math.floor(stored.level);
  if (isFiniteNumber(stored.streak) && stored.streak >= 0) next.streak = Math.floor(stored.streak);
  if (typeof stored.lastActive === "string") next.lastActive = stored.lastActive;
  if (isStringArray(stored.badges)) next.badges = [...new Set(stored.badges)];
  if (isStringArray(stored.collectibles)) next.collectibles = [...new Set(stored.collectibles)];
  if (isStringArray(stored.readAmendments)) {
    next.readAmendments = [...new Set(stored.readAmendments)];
  }

  if (stored.quizStars && typeof stored.quizStars === "object" && !Array.isArray(stored.quizStars)) {
    const knownQuizIds = new Set(DATA.quizzes.map((quiz) => quiz.id));
    next.quizStars = {};
    for (const [quizId, stars] of Object.entries(stored.quizStars)) {
      if (knownQuizIds.has(quizId)) next.quizStars[quizId] = clampStars(stars);
    }
  }

  if (Array.isArray(stored.chapters)) {
    // Chapter progression is sequential and derived, never trusted from storage.
    const completed = new Set();
    for (const saved of stored.chapters) {
      if (!saved || typeof saved !== "object") continue;
      const target = next.chapters.find((c) => c.id === saved.id);
      if (!target) continue;
      if (saved.status === "completed") completed.add(saved.id);
      target.stars = clampStars(saved.stars);
    }
    applySequentialUnlocks(next.chapters, completed);
  }

  return next;
}

/**
 * Chapter N unlocks only when chapter N-1 is completed. Recomputed on every
 * load so a hand-edited save cannot skip ahead: a chapter whose predecessor is
 * not completed is demoted to locked, even if storage claims it was completed.
 */
function applySequentialUnlocks(chapters, completedIds) {
  const reachable = new Set();
  chapters.forEach((chapter, index) => {
    const predecessorDone = index === 0 || reachable.has(chapters[index - 1].id);
    if (completedIds.has(chapter.id) && predecessorDone) {
      chapter.status = "completed";
      reachable.add(chapter.id);
    } else if (predecessorDone) {
      chapter.status = "unlocked";
    } else {
      chapter.status = "locked";
      chapter.stars = 0;
    }
  });
}
