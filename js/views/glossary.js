// Constitution Quest — Glossary with live search.

import { DATA } from "../data.js";

export function render(container, state) {
  container.innerHTML = `
    <section class="section">
      <p class="eyebrow">Glossary</p>
      <h1>Civics terms, in plain words</h1>
      <div class="search-field">
        <label for="glossary-search">Search terms</label>
        <input id="glossary-search" class="search-input" type="search"
               placeholder="Try &quot;veto&quot; or &quot;ratify&quot;"
               autocomplete="off" data-testid="glossary-search">
      </div>
      <p class="sr-only" role="status" data-result-count></p>
      <ul class="glossary-list" data-testid="glossary-list"></ul>
      <p class="empty-note" data-empty hidden>No terms match that search.</p>
    </section>
  `;

  const input = container.querySelector("#glossary-search");
  const list = container.querySelector("[data-testid='glossary-list']");
  const empty = container.querySelector("[data-empty]");
  const status = container.querySelector("[data-result-count]");

  const draw = () => {
    const query = input.value.trim().toLowerCase();
    const matches = DATA.glossary.filter((entry) =>
      !query ||
      entry.term.toLowerCase().includes(query) ||
      entry.def.toLowerCase().includes(query)
    );

    list.innerHTML = matches
      .map(
        (entry) => `
        <li class="glossary-item">
          <dt>${escapeHtml(entry.term)}</dt>
          <dd>${escapeHtml(entry.def)}</dd>
        </li>`
      )
      .join("");

    empty.hidden = matches.length > 0;
    status.textContent = `${matches.length} ${matches.length === 1 ? "term" : "terms"} shown`;
  };

  input.addEventListener("input", draw);
  draw();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
