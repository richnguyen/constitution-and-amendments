// Constitution Quest — Collection: badges, founder cards, amendment stamps.

import { DATA } from "../data.js";

export function render(container, state) {
  const badges = DATA.badges
    .map((badge) => {
      const owned = state.badges.includes(badge.id);
      return `
        <li class="collect-card${owned ? "" : " missing"}" data-testid="badge-${badge.id}">
          <span class="card-icon" aria-hidden="true">${glyph(badge.icon)}</span>
          <span class="name">${owned ? escapeHtml(badge.name) : "???"}</span>
          <span class="hint">${escapeHtml(owned ? badge.description : "Keep playing to unlock")}</span>
        </li>`;
    })
    .join("");

  const founders = DATA.founders
    .map((founder) => {
      const owned = state.collectibles.includes(founder.id);
      return `
        <li class="collect-card founder-card${owned ? "" : " missing"}"
            data-testid="founder-${founder.id}" style="border-top-color:${safeColor(founder.color)}">
          <span class="card-icon" aria-hidden="true">${owned ? glyph("founder") : "?"}</span>
          <span class="name">${owned ? escapeHtml(founder.name) : "???"}</span>
          <span class="hint">${escapeHtml(owned ? founder.role : "Found in a chapter")}</span>
        </li>`;
    })
    .join("");

  const readCount = state.readAmendments.length;
  const stamps = DATA.amendments
    .map((amendment) => {
      const read = state.readAmendments.includes(`a${amendment.id}`);
      return `
        <li class="collect-card${read ? "" : " missing"}" data-testid="stamp-${amendment.id}">
          <span class="card-icon" aria-hidden="true">${read ? "◈" : "·"}</span>
          <span class="name">${read ? `${ordinal(amendment.id)}` : "?"}</span>
          <span class="hint">${read ? escapeHtml(shortTitle(amendment.title)) : "Unread"}</span>
        </li>`;
    })
    .join("");

  container.innerHTML = `
    <section class="section">
      <p class="eyebrow">Your collection</p>
      <h1>Everything you have earned</h1>
      <p style="color:var(--c-muted)">
        ${state.badges.length} badges · ${state.collectibles.length} cards ·
        ${readCount} of ${DATA.amendments.length} amendments read
      </p>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 style="margin:0">Badges</h2>
        <span class="chip">${state.badges.length} / ${DATA.badges.length}</span>
      </div>
      <ul class="collect-grid" style="list-style:none;padding:0;margin:0">${badges}</ul>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 style="margin:0">Founder cards</h2>
        <span class="chip">${state.collectibles.length} / ${DATA.founders.length}</span>
      </div>
      <ul class="collect-grid" style="list-style:none;padding:0;margin:0">${founders}</ul>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 style="margin:0">Amendment stamps</h2>
        <span class="chip" data-testid="stamp-count">${readCount} / ${DATA.amendments.length}</span>
      </div>
      <ul class="collect-grid" style="list-style:none;padding:0;margin:0">${stamps}</ul>
    </section>
  `;
}

const GLYPHS = {
  scroll: "📜",
  capitol: "🏛",
  quill: "🪶",
  star: "★",
  trophy: "🏆",
  stamp: "◈",
  founder: "👤",
};

const glyph = (name) => GLYPHS[name] || GLYPHS.star;

/**
 * Founder colours are authored constants; data.test.js pins them to
 * /^#[0-9A-Fa-f]{6}$/. Fall back to the token colour rather than emitting an
 * unvalidated value into a style attribute.
 */
const safeColor = (value) =>
  /^#[0-9A-Fa-f]{6}$/.test(value) ? value : "var(--c-navy-700)";

function ordinal(n) {
  const teens = n % 100;
  if (teens >= 11 && teens <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

function shortTitle(title) {
  const parts = title.split("—");
  return (parts[1] || title).trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
