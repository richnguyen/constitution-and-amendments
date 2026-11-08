// Constitution Quest — Constitution Reader: original text plus plain language.

import { DATA } from "../data.js";

export function render(container, state, handlers, docId) {
  const docs = buildDocs();
  const activeId = docs.some((doc) => doc.id === docId) ? docId : docs[0].id;

  draw(activeId);

  /** Record an amendment read and notify the router. */
  function markRead(id) {
    if (!id.startsWith("a")) return;
    const already = state.readAmendments.includes(id);
    if (already) return;
    state.readAmendments.push(id);
    handlers.saveState(state);
  }

  function railList(activeDocId) {
    const group = (label, items) => `
      <div class="rail-group">
        <p class="rail-label">${label}</p>
        <ul class="rail-list">
          ${items
            .map(
              (doc) => `
            <li>
              <button type="button" class="rail-btn" data-doc="${doc.id}"
                      aria-current="${doc.id === activeDocId}">
                ${escapeHtml(doc.shortLabel)}
              </button>
            </li>`
            )
            .join("")}
        </ul>
      </div>
    `;

    return `
      ${group("Preamble", docs.filter((d) => d.kind === "preamble"))}
      ${group("Articles", docs.filter((d) => d.kind === "article"))}
      ${group("Amendments", docs.filter((d) => d.kind === "amendment"))}
    `;
  }

  function draw(id) {
    const doc = docs.find((d) => d.id === id) || docs[0];

    container.innerHTML = `
      <section class="section">
        <p class="eyebrow">The Constitution</p>
        <div class="reader">
          <aside class="reader-rail" aria-label="Documents">${railList(doc.id)}</aside>
          <article class="reader-main" data-testid="reader-document">
            <h1 class="doc-title">${escapeHtml(doc.title)}</h1>
            <p>${escapeHtml(doc.summary)}</p>
            <p class="original-text" data-testid="original-text">${escapeHtml(doc.original)}</p>
            <button type="button" class="btn btn-ghost btn-sm" data-toggle-plain
                    aria-expanded="false" aria-controls="plain-panel">
              What it means
            </button>
            <div class="plain-panel" id="plain-panel" data-testid="plain-panel" hidden>
              <h3>In plain language</h3>
              <p style="margin:0">${escapeHtml(doc.plain)}</p>
            </div>
            ${doc.why
              ? `<div class="why-callout"><span class="label">Why it matters</span>${escapeHtml(doc.why)}</div>`
              : ""}
          </article>
        </div>
      </section>
    `;

    for (const button of container.querySelectorAll("[data-doc]")) {
      button.addEventListener("click", () => {
        const nextId = button.dataset.doc;
        markRead(nextId);
        draw(nextId);
        container.querySelector("h1")?.focus?.();
      });
    }

    const toggle = container.querySelector("[data-toggle-plain]");
    const panel = container.querySelector("#plain-panel");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });

    markRead(doc.id);
  }
}

/** Normalise preamble, articles and amendments into one flat reader list. */
function buildDocs() {
  const docs = [
    {
      id: "preamble",
      kind: "preamble",
      title: DATA.preamble.title,
      shortLabel: "The Preamble",
      summary:
        "The opening statement. It names the source of the government's power " +
        "and lists six goals.",
      original: DATA.preamble.original,
      plain: DATA.preamble.plain,
      why: DATA.preamble.why,
    },
  ];

  for (const article of DATA.articles) {
    docs.push({
      id: `art${article.id}`,
      kind: "article",
      title: article.title,
      shortLabel: `Article ${roman(article.id)}`,
      summary: article.summary,
      original: article.original,
      plain: article.plain,
      why: article.why,
    });
  }

  for (const amendment of DATA.amendments) {
    docs.push({
      id: `a${amendment.id}`,
      kind: "amendment",
      title: amendment.title,
      shortLabel: `${ordinal(amendment.id)} — ${shortTitle(amendment.title)}`,
      summary: amendment.summary,
      original: amendment.original,
      plain: amendment.plain,
      why: amendment.why,
    });
  }

  return docs;
}

const ROMAN = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
];

function roman(n) {
  return ROMAN[n - 1] || String(n);
}

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

/** "4th Amendment — Protection from Unreasonable Searches" -> the tail. */
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
