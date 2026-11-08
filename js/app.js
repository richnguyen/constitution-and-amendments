// Constitution Quest — view router and the single owner of app state.
//
// State lives here. Views are pure renderers that receive the state plus a set
// of handlers; they never import each other and never touch localStorage.

import { DATA } from "./data.js";
import { load, persist } from "./save.js";
import { updateStreak, checkBadges, addXP, xpReward } from "./xp.js";
import { render as renderHeader } from "./components/header.js";
import * as rewardPopup from "./components/reward-popup.js";
import { render as renderMap } from "./views/map.js";
import { render as renderChapter } from "./views/chapter.js";
import { render as renderQuiz } from "./views/quiz.js";
import { render as renderReader } from "./views/reader.js";
import { render as renderCollection } from "./views/collection.js";
import { render as renderGlossary } from "./views/glossary.js";

const TABS = [
  { id: "map", label: "Journey", view: "map" },
  { id: "reader", label: "Read", view: "reader" },
  { id: "collection", label: "Collection", view: "collection" },
  { id: "glossary", label: "Glossary", view: "glossary" },
];

const TAB_ICONS = {
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z"/><path d="M9 3v15M15 6v15"/></svg>',
  reader: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  collection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15l-3 5-2-3-3 1 2-6"/><circle cx="12" cy="8" r="6"/></svg>',
  glossary: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h7M9 11h5"/></svg>',
};

let state = null;
let currentView = "map";
let chapterId = null;
let quizId = null;
let readDocId = null;

const headerEl = () => document.getElementById("app-header");
const viewEl = () => document.getElementById("view");
const tabEl = () => document.getElementById("tab-bar");
const popupEl = () => document.getElementById("popup-root");

// --- state -----------------------------------------------------------------

/** Persist and refresh chrome that depends on progress. */
function saveState() {
  persist(state);
  renderHeader(headerEl(), state);
  drawTabs();
}

/** Award anything newly qualified and surface the first new item once. */
function grantRewards(context) {
  const newBadges = checkBadges(state, DATA);

  if (context && context.collectibleId) {
    const collectible = DATA.founders.find((f) => f.id === context.collectibleId);
    // Replaying a chapter must not duplicate a card the player already owns.
    if (collectible && !state.collectibles.includes(collectible.id)) {
      state.collectibles.push(collectible.id);
      saveState();
      queueReward({
        kind: "founder",
        title: collectible.name,
        description: `Founder card unlocked. ${collectible.role}.`,
      });
    }
  }

  for (const badge of newBadges) {
    queueReward({
      kind: badge.icon,
      title: badge.name,
      description: badge.description,
    });
  }

  if (!context || !context.collectibleId) saveState();
}

const rewardQueue = [];

function queueReward(reward) {
  rewardQueue.push(reward);
}

function flushRewards() {
  if (!rewardQueue.length) return;
  const next = rewardQueue.shift();
  rewardPopup.show(next, popupEl(), () => {
    const root = popupEl();
    root.innerHTML = "";
    if (rewardQueue.length) setTimeout(flushRewards, 0);
  });
}

// --- navigation ------------------------------------------------------------

function drawTabs() {
  const activeTab = TABS.find(
    (tab) => tab.view === currentView ||
      (tab.view === "reader" && currentView === "reader")
  );
  tabEl().innerHTML = TABS.map(
    (tab) => `
      <button type="button" class="tab" data-tab="${tab.id}"
              aria-current="${tab.id === activeTab?.id ? "page" : "false"}">
        ${TAB_ICONS[tab.id]}
        <span>${tab.label}</span>
      </button>
    `
  ).join("");

  for (const button of tabEl().querySelectorAll("[data-tab]")) {
    button.addEventListener("click", () => showView(button.dataset.tab));
  }
}

function showView(view, options = {}) {
  currentView = view;

  if (view === "chapter") {
    chapterId = options.chapterId ?? chapterId;
  } else if (view === "quiz") {
    quizId = options.quizId ?? quizId;
  } else if (view === "reader") {
    readDocId = options.docId ?? readDocId;
  }

  const container = viewEl();
  container.innerHTML = "";
  renderHeader(headerEl(), state);
  drawTabs();
  window.scrollTo?.({ top: 0, behavior: "instant" });

  const handlers = {
    saveState,
    onExit: () => showView("map"),
    onStartChapter: (id) => startChapter(id),
    onStartQuiz: (id) => startQuiz(id),
    onComplete: (result) => completeAndReturn(result),
  };

  switch (view) {
    case "chapter":
      renderChapter(container, state, handlers, chapterId);
      break;
    case "quiz":
      renderQuiz(container, state, handlers, quizId);
      break;
    case "reader":
      renderReader(container, state, handlers, readDocId);
      break;
    case "collection":
      renderCollection(container, state);
      break;
    case "glossary":
      renderGlossary(container, state);
      break;
    case "map":
    default:
      renderMap(container, state, handlers);
      break;
  }

  flushRewards();
  container.focus?.();
}

function startChapter(id) {
  const record = state.chapters.find((c) => c.id === id);
  if (!record || record.status === "locked") return;
  updateStreak(state);
  saveState();
  showView("chapter", { chapterId: id });
}

function startQuiz(id) {
  updateStreak(state);
  saveState();
  showView("quiz", { quizId: id });
}

function completeAndReturn(result = {}) {
  if (result.chapterId) {
    const chapter = DATA.chapters.find((c) => c.id === result.chapterId);
    grantRewards({ collectibleId: chapter?.collectible?.id });
  } else {
    grantRewards({});
  }
  showView("map");
}

// --- boot ------------------------------------------------------------------

export function init() {
  if (!state) state = load();
  updateStreak(state);
  persist(state);
  showView("map");
}

if (typeof document !== "undefined" && document.getElementById("view")) {
  init();
}
