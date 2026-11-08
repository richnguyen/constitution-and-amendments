// Constitution Quest — Journey Map view.

import { DATA } from "../data.js";

const starRow = (stars) => {
  const earned = Math.min(3, Math.max(0, stars || 0));
  return "★".repeat(earned) + "☆".repeat(3 - earned);
};

/**
 * Render the journey map. `handlers` supplies navigation callbacks so the view
 * never imports the router (no circular dependency).
 */
export function render(container, state, handlers) {
  const { onStartChapter, onStartQuiz } = handlers;
  const chapters = DATA.chapters;
  const firstIncomplete = chapters.find((chapter) => {
    const record = state.chapters.find((c) => c.id === chapter.id);
    return !record || record.status !== "completed";
  });

  const completedCount = state.chapters.filter((c) => c.status === "completed").length;

  const nodes = chapters
    .map((chapter) => {
      const record = state.chapters.find((c) => c.id === chapter.id) || {
        id: chapter.id,
        status: "locked",
        stars: 0,
      };
      const isLocked = record.status === "locked";
      const isCompleted = record.status === "completed";
      const stateClass = isCompleted ? "completed" : isLocked ? "locked" : "current";

      const action = isLocked
        ? `<span class="chip">Locked</span>`
        : `<button type="button" class="btn btn-sm" data-chapter="${chapter.id}">
             ${isCompleted ? "Replay" : "Play"}
           </button>`;

      return `
        <li class="chapter-node ${stateClass}" data-testid="chapter-node-${chapter.id}"
            data-status="${record.status}">
          <span class="node-marker" aria-hidden="true">${isLocked ? "🔒" : chapter.id}</span>
          <div class="node-body">
            <h3>${chapter.title}</h3>
            <p class="sub">${chapter.subtitle}</p>
            ${isCompleted ? `<span class="node-stars" aria-label="${record.stars} of 3 stars">${starRow(record.stars)}</span>` : ""}
          </div>
          ${action}
        </li>
      `;
    })
    .join("");

  const continueCard = firstIncomplete
    ? `
      <div class="card continue-card">
        <div style="flex:1;min-width:200px">
          <p class="eyebrow">Continue your journey</p>
          <h2 style="margin-bottom:2px">${firstIncomplete.title}</h2>
          <p class="sub" style="margin:0;color:var(--c-muted);font-size:var(--fs-small)">
            ${firstIncomplete.subtitle}
          </p>
        </div>
        <button type="button" class="btn" data-chapter="${firstIncomplete.id}">
          ${completedCount === 0 ? "Start Chapter 1" : "Resume"}
        </button>
      </div>
    `
    : `
      <div class="card continue-card">
        <div style="flex:1">
          <p class="eyebrow">Journey complete</p>
          <h2 style="margin-bottom:2px">You finished all five chapters</h2>
          <p class="sub" style="margin:0;color:var(--c-muted);font-size:var(--fs-small)">
            Replay any chapter to keep your stars sharp.
          </p>
        </div>
      </div>
    `;

  container.innerHTML = `
    <section class="map-hero">
      <p class="eyebrow" style="color:var(--c-gold-500)">The journey</p>
      <h1>From "We the People" to today</h1>
      <p>Five chapters, 27 amendments, one story about who holds the power.</p>
    </section>

    <section class="section">${continueCard}</section>

    <section class="section">
      <div class="section-head">
        <h2 style="margin:0">Chapters</h2>
        <span class="chip" data-testid="chapter-progress">${completedCount} / ${chapters.length}</span>
      </div>
      <ul class="chapter-list">${nodes}</ul>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 style="margin:0">Test yourself</h2>
      </div>
      <div class="card" style="display:flex;gap:var(--s-4);align-items:center;flex-wrap:wrap">
        <div style="flex:1;min-width:200px">
          <h3 style="margin-bottom:2px">Constitution I.Q.</h3>
          <p style="margin:0;color:var(--c-muted);font-size:var(--fs-small)">
            Five questions. Instant feedback. Stars for your best run.
          </p>
        </div>
        <button type="button" class="btn btn-ghost" data-quiz="constitution-iq">Take the quiz</button>
      </div>
    </section>
  `;

  for (const button of container.querySelectorAll("[data-chapter]")) {
    button.addEventListener("click", () => onStartChapter(Number(button.dataset.chapter)));
  }
  for (const button of container.querySelectorAll("[data-quiz]")) {
    button.addEventListener("click", () => onStartQuiz(button.dataset.quiz));
  }
}
