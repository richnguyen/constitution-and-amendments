# RAI.md — Constitution Quest

## What We Are Building
Interactive, gamified web app that teaches middle/high school students the U.S. Constitution and its amendments through story-driven chapters, a journey map, quizzes, collectibles, and a full-text reader with plain-language explanations. Runs entirely in the browser with local progress persistence.

## Stack
- Vanilla JS (ES modules) — no framework, no build step for development
- Vanilla CSS with custom properties — design tokens as `--c-*` vars
- localStorage for progress persistence
- GitHub Pages or any static host for deployment
- Vitest + jsdom for unit tests
- Playwright for E2E tests

## Project Structure
```
/
├── index.html              Entry point — loads all modules, wires header + view container
├── css/
│   └── main.css            All styles (design tokens, layout, component styles)
├── js/
│   ├── app.js              View router + global state bridge (the SPA spine)
│   ├── data.js             All content entities (chapters, articles, amendments, quizzes, glossary)
│   ├── save.js             localStorage persistence seam (SaveData schema, load/save/reset)
│   ├── xp.js               Game-logic seam (XP/level/badge/streak computation)
│   ├── views/
│   │   ├── map.js          Journey Map view
│   │   ├── chapter.js      Story chapter view (beats + comprehension check)
│   │   ├── quiz.js         Quiz challenge view
│   │   ├── reader.js       Constitution Reader view
│   │   ├── collection.js   Collection view (badges, founder cards, stamps)
│   │   └── glossary.js     Glossary view (searchable terms)
│   └── components/
│       ├── reward-popup.js Celebration modal
│       └── header.js       Header with XP bar, level, streak
├── tests/
│   ├── data.test.js        Data integrity tests
│   ├── save.test.js        Persistence tests
│   └── xp.test.js          Scoring/level/badge tests
├── docs/                   Design artifacts (PRD, SCREENS, STACK, DATA_MODEL, prototype)
├── package.json
├── vitest.config.js
├── RAI.md
└── README.md
```

## Commands
```
npm run dev       — start dev server (python3 -m http.server 8080 or npx serve)
npm run test      — run unit tests (Vitest)
npm run test:e2e  — run Playwright E2E tests
npm run coverage  — run unit tests with coverage
npm run lint      — lint check (ESLint + html-validate if configured)
```

## Non-Negotiable Rules
1. Verify each feature at the boundaries that establish its acceptance criteria. Choose unit, integration, and end-to-end checks by behavior and risk rather than requiring every test type for every change.
2. E2E tests use ONLY semantic locators: `getByRole()`, `getByLabel()`, `getByText()`, `getByTestId()`. Never CSS class selectors. Never XPath.
3. The test suite only grows. Tests are never deleted — only updated.
4. Every bug fix ships with a regression test that first reproduces the bug.
5. Accepted visual baselines help detect drift against the selected design contract. Investigate differences in matched states; pixels alone do not establish a defect or prove the baseline is a good design. Review justified contract changes explicitly rather than freezing every captured choice.
6. Completion requires evidence for the agreed acceptance criteria and applicable project checks. Use the QA score only when its UI rubric applies.
7. Shipped behaviour is not changed unless the task asks for exactly that — a rename, removal, move, signature or status-code change, a tightened default or a new guard option all count; never delete, disable or bypass what it does to make room for new code. New behaviour gets its own path beside the stable one (new function, handler, route, component or file); a contract change that is genuinely required gets its own change, agreed with the user first.

## Coding Conventions
- **Naming:** camelCase for JS identifiers; kebab-case for CSS custom properties and file names.
- **Modules:** Each `.js` file is an ES module. Public API exported as named exports. Internal helpers prefixed with `_`.
- **Imports:** Paths relative, no aliases. Group: standard → third-party → local.
- **DOM:** View modules export a `render()` function. No innerHTML with user data; use `textContent` for dynamic text.
- **CSS:** Custom properties for all colors/spacing/typography. No raw hex values in component styles.
- **No jQuery or other DOM libraries.** The app is small enough for native DOM APIs.

## Design Principles
- **Deep modules:** Each view module hides its DOM construction behind a single `render(container, state)` call. Callers never touch view internals.
- **Persistence seam:** `save.js` is the only module that reads/writes localStorage. Views call `save.load()` and `save.persist(state)` — never `localStorage` directly.
- **Content seam:** `data.js` is the single source of truth for all Constitution content. Views import data, never hardcode text.
- **View router:** `app.js` owns view transitions and passes the relevant slice of state to each view's `render()`. Views are stateless — they render from the current state each time.
- **Shipped contracts:** The SaveData schema key (`cq.save.v1`) and the `DATA` object shape in `data.js` are consumed by views and tests. Changes to either require updating all consumers.

## Definition of Done Checklist
- [ ] Feature works per acceptance criteria in the plan
- [ ] Relevant behavior and regression tests pass at the agreed boundaries
- [ ] Integration/end-to-end checks cover applicable critical paths
- [ ] Explicit project coverage targets met, if defined
- [ ] No lint errors
- [ ] QA criteria satisfied; UI score meets its gate when applicable

## Known Patterns
- **Repository pattern for persistence:** `save.js` is the single seam. Views never touch `localStorage` directly.
- **Render functions for views:** Every view module exports `render(container, state)` that replaces the container's content. Views are idempotent — calling `render()` with the same state produces the same DOM.
- **State bridge in app.js:** The global state object is assembled from `save.load()` and passed to each view on render. Views do not hold state between renders.
