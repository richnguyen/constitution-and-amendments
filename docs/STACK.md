# Stack — Constitution Quest

## Frontend framework
**Vanilla JS (ES modules, no framework).** The app has 6 simple views and one JSON blob of state — a framework adds build complexity without proportional benefit. The prototype already proves the DOM-router approach works.

## Styling
**Vanilla CSS with CSS custom properties.** Design tokens are already established as `--c-*` custom properties in the prototype. No preprocessor or CSS-in-JS needed at this scale (~800 lines).

## Backend
**None needed.** Client-only static app. All logic runs in the browser.

## Database
**localStorage.** Progress (XP, levels, badges, collectibles, chapter states, quiz stars) fits in a single JSON key. No server, no network.

## Auth
**None.** Per user decision: local-only, no accounts.

## Hosting
**GitHub Pages or any static host.** The built output is a folder of static files. Deployable with zero server configuration.

## Unit test runner
**Vitest + jsdom.** Fast, native ESM support, compatible with plain JS modules. Tests the pure-logic modules: scoring, persistence, data integrity.

## E2E test runner
**Playwright.** Standard for web app verification. Tests the full user flows: journey map, chapter completion, reader, quiz, persistence across reload.

## Critical Files for Implementation

| File | Why |
|---|---|
| `index.html` | Entry point — loads all modules, wires the header and view container |
| `js/app.js` | View router + global state bridge — the spine of the SPA |
| `js/save.js` | Persistence seam — serialize/deserialize to localStorage |
| `package.json` | Dependency set and scripts the stack resolves to |
| `vitest.config.js` | Unit-test runner config the design commits to |
