// Constitution Quest — header component (brand, level, streak, XP bar).

import { computeLevel, levelProgress, xpToNextLevel } from "../xp.js";

/** Inline icon markup helper — decorative, so always aria-hidden. */
const icon = (path) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
  `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;

const FLAME_PATH =
  '<path d="M12 2c1.5 4 5 5.5 5 9a5 5 0 0 1-10 0c0-1.6.7-2.7 1.6-3.6C9.4 8.7 10 9.9 11 10c-.4-3 0-5.5 1-8z"/>';

/**
 * Render the header into `container`. Idempotent: the container's content is
 * replaced on every call.
 */
export function render(container, state) {
  const xp = Number.isFinite(state.xp) ? state.xp : 0;
  const level = computeLevel(xp);
  const progress = Math.round(levelProgress(xp) * 100);
  const remaining = xpToNextLevel(xp);
  const streak = Number.isFinite(state.streak) ? state.streak : 0;

  container.innerHTML = `
    <div class="header-inner">
      <div>
        <h1 class="brand">Constitution Quest</h1>
        <span class="brand-tag">Learn it by playing</span>
      </div>
      <div class="header-stats">
        <span class="level-chip" data-testid="level-chip">Level ${level}</span>
        <span class="streak-chip" data-testid="streak-chip" title="Day streak">
          ${icon(FLAME_PATH)}${streak}
        </span>
      </div>
      <div class="xp-wrap">
        <div class="xp-bar" role="progressbar" aria-label="Level progress"
             aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"
             aria-valuetext="${progress}% to level ${level + 1}">
          <div class="xp-fill" style="width:${progress}%"></div>
        </div>
        <span class="xp-text" data-testid="xp-text">${xp} XP · ${remaining} to next</span>
      </div>
    </div>
  `;
}
