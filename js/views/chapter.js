// Constitution Quest — story chapter view: beats, then a comprehension check.

import { DATA } from "../data.js";
import { addXP, starsFor } from "../xp.js";

/**
 * Render the chapter and run its interactive flow.
 * All persistent effects go through `handlers.saveState(state)` and
 * `handlers.onComplete(result)` so the router stays the single state owner.
 */
export function render(container, state, handlers, chapterId) {
  const chapter = DATA.chapters.find((c) => c.id === chapterId) || DATA.chapters[0];
  let beatIndex = 0;

  const draw = () => {
    const beat = chapter.beats[beatIndex];
    const total = chapter.beats.length;

    if (beat.type === "check") {
      drawCheck();
      return;
    }

    const isLastStoryBeat = chapter.beats[beatIndex + 1]?.type === "check";
    const dots = chapter.beats
      .map((b, i) => {
        if (i < beatIndex) return '<span class="dot done"></span>';
        if (i === beatIndex) return '<span class="dot current"></span>';
        return '<span class="dot"></span>';
      })
      .join("");

    container.innerHTML = `
      <section class="section story-beat">
        <p class="eyebrow">${chapter.title}</p>
        <div class="dots" aria-hidden="true">${dots}</div>
        <p class="sr-only">Beat ${beatIndex + 1} of ${total}</p>
        <h1>${chapter.title}</h1>
        ${beat.type === "didyouknow"
          ? `<div class="dyk"><span class="dyk-label">Did you know?</span>${escapeHtml(beat.text)}</div>`
          : `<p>${escapeHtml(beat.text)}</p>`}
        <div class="story-nav">
          ${beatIndex > 0
            ? '<button type="button" class="btn btn-ghost" data-nav="back">Back</button>'
            : ""}
          <button type="button" class="btn" data-nav="next">
            ${isLastStoryBeat ? "Take the checkpoint" : "Continue"}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" data-nav="exit">Back to map</button>
        </div>
      </section>
    `;

    container.querySelector('[data-nav="next"]').addEventListener("click", () => {
      beatIndex += 1;
      draw();
    });
    const back = container.querySelector('[data-nav="back"]');
    if (back) back.addEventListener("click", () => {
      beatIndex -= 1;
      draw();
    });
    container.querySelector('[data-nav="exit"]').addEventListener("click", () => handlers.onExit());
  };

  const drawCheck = () => {
    const answers = [];

    const renderQuestion = (index) => {
      const question = chapter.check[index];
      const isLast = index === chapter.check.length - 1;

      container.innerHTML = `
        <section class="section">
          <p class="eyebrow">${chapter.title} · checkpoint</p>
          <p class="sr-only">Question ${index + 1} of ${chapter.check.length}</p>
          <div class="question" data-testid="check-question">
            <p class="question-prompt">${escapeHtml(question.q)}</p>
            <ul class="options" role="group" aria-label="Answer choices">
              ${question.options
                .map(
                  (option, optionIndex) => `
                <li>
                  <button type="button" class="option" data-option="${optionIndex}">
                    <span class="option-key" aria-hidden="true">${"ABCD"[optionIndex]}</span>
                    <span>${escapeHtml(option)}</span>
                  </button>
                </li>`
                )
                .join("")}
            </ul>
            <div data-feedback></div>
          </div>
          <div class="story-nav">
            <button type="button" class="btn" data-continue hidden>
              ${isLast ? "See results" : "Next question"}
            </button>
          </div>
        </section>
      `;

      const optionButtons = [...container.querySelectorAll("[data-option]")];
      const feedback = container.querySelector("[data-feedback]");
      const continueButton = container.querySelector("[data-continue]");

      optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const chosen = Number(button.dataset.option);
          const isCorrect = chosen === question.correct;
          answers.push(isCorrect);

          optionButtons.forEach((other, otherIndex) => {
            other.disabled = true;
            if (otherIndex === question.correct) other.classList.add("correct");
            else if (otherIndex === chosen) other.classList.add("wrong");
          });

          feedback.innerHTML = `
            <p class="feedback ${isCorrect ? "good" : "bad"}">
              <strong>${isCorrect ? "Correct." : "Not quite."}</strong>
              ${escapeHtml(question.explanation)}
            </p>`;
          continueButton.hidden = false;
          continueButton.focus();
        });
      });

      continueButton.addEventListener("click", () => {
        if (index + 1 < chapter.check.length) renderQuestion(index + 1);
        else finish(answers.filter(Boolean).length);
      });
    };

    const finish = (correct) => {
      const total = chapter.check.length;
      const stars = starsFor(correct, total);
      const previous = state.chapters.find((c) => c.id === chapter.id);

      // A completion is only ever an improvement: keep the best star count.
      const bestStars = Math.max(stars, previous?.stars || 0);
      const alreadyCompleted = previous?.status === "completed";

      const record = state.chapters.find((c) => c.id === chapter.id);
      if (record) {
        record.status = "completed";
        record.stars = bestStars;
      }
      unlockNext(state, chapter.id);

      const xpGained = alreadyCompleted ? 0 : 50;
      addXP(state, xpGained);

      handlers.saveState(state);

      container.innerHTML = `
        <section class="section">
          <div class="card result-card" data-testid="chapter-result">
            <p class="eyebrow">${chapter.title}</p>
            <h1>${alreadyCompleted ? "Chapter replayed" : "Chapter complete"}</h1>
            <p class="result-stars" aria-label="${bestStars} of 3 stars">
              ${"★".repeat(bestStars)}${"☆".repeat(3 - bestStars)}
            </p>
            <p>${correct} of ${total} correct${xpGained ? ` · +${xpGained} XP` : ""}</p>
            <div class="result-actions">
              <button type="button" class="btn" data-result="map">Back to map</button>
              <button type="button" class="btn btn-ghost" data-result="replay">Try the chapter again</button>
            </div>
          </div>
        </section>
      `;

      container.querySelector('[data-result="map"]').addEventListener("click", () => {
        handlers.onComplete({ chapterId: chapter.id, stars: bestStars });
      });
      container.querySelector('[data-result="replay"]').addEventListener("click", () => {
        beatIndex = 0;
        draw();
      });
    };

    renderQuestion(0);
  };

  container.dataset.chapterId = String(chapter.id);
  draw();
}

/** Unlock the chapter that follows `chapterId`, if any. */
function unlockNext(state, chapterId) {
  const index = DATA.chapters.findIndex((c) => c.id === chapterId);
  const nextChapter = DATA.chapters[index + 1];
  if (!nextChapter) return;
  const nextRecord = state.chapters.find((c) => c.id === nextChapter.id);
  if (nextRecord && nextRecord.status === "locked") nextRecord.status = "unlocked";
}

/**
 * Chapter copy is authored content, but escaping keeps a stray "<" in future
 * text from breaking the markup.
 */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
