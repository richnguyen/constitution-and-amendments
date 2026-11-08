// Constitution Quest — quiz view: five questions, instant feedback, stars.

import { DATA } from "../data.js";
import { addXP, recordQuizStars, starsFor } from "../xp.js";

export function render(container, state, handlers, quizId) {
  const quiz = DATA.quizzes.find((q) => q.id === quizId) || DATA.quizzes[0];
  let index = 0;
  let correctCount = 0;

  const drawQuestion = () => {
    const question = quiz.questions[index];
    const isLast = index === quiz.questions.length - 1;

    container.innerHTML = `
      <section class="section">
        <p class="eyebrow">${quiz.name}</p>
        <p class="sr-only">Question ${index + 1} of ${quiz.questions.length}</p>
        <div class="question" data-testid="quiz-question">
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
          <button type="button" class="btn btn-ghost btn-sm" data-exit>Back to map</button>
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
        if (isCorrect) correctCount += 1;

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
      if (index + 1 < quiz.questions.length) {
        index += 1;
        drawQuestion();
      } else {
        drawResult();
      }
    });

    container.querySelector("[data-exit]").addEventListener("click", () => handlers.onExit());
  };

  const drawResult = () => {
    const total = quiz.questions.length;
    const stars = starsFor(correctCount, total);
    const previousBest = state.quizStars[quiz.id] || 0;
    const improved = stars > previousBest;

    recordQuizStars(state, quiz.id, stars);
    addXP(state, correctCount * 10 + (stars === 3 ? 30 : 0));
    handlers.saveState(state);

    container.innerHTML = `
      <section class="section">
        <div class="card result-card" data-testid="quiz-result">
          <p class="eyebrow">${quiz.name}</p>
          <h1>${stars === 3 ? "Perfect score" : stars > 0 ? "Nice work" : "Keep practicing"}</h1>
          <p class="result-stars" aria-label="${stars} of 3 stars">
            ${"★".repeat(stars)}${"☆".repeat(3 - stars)}
          </p>
          <p>${correctCount} of ${total} correct${
            improved ? " · new best!" : ` · best is ${state.quizStars[quiz.id]} of 3`
          }</p>
          <div class="result-actions">
            <button type="button" class="btn" data-result="again">Try again</button>
            <button type="button" class="btn btn-ghost" data-result="map">Back to map</button>
          </div>
        </div>
      </section>
    `;

    container.querySelector('[data-result="again"]').addEventListener("click", () => {
      index = 0;
      correctCount = 0;
      drawQuestion();
    });
    container.querySelector('[data-result="map"]').addEventListener("click", () => {
      handlers.onComplete({ quizId: quiz.id, stars });
    });
  };

  container.dataset.quizId = quiz.id;
  drawQuestion();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
