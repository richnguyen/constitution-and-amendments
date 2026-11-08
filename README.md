# Constitution Quest

A browser game that teaches the U.S. Constitution and its 27 amendments through
story chapters, comprehension checks, quizzes, and a collection to fill in.

Playable at any age, aimed at middle and high school students. No account, no
server, no network calls after load; progress saves to the browser.

## What's in it

- **Journey map** — five chapters, unlocked in sequence, with star ratings
- **Story chapters** — narrative beats with "Did you know?" asides, ending in a
  three-question comprehension check with instant feedback
- **Constitution Reader** — the full public-domain text of the Preamble, all
  seven Articles, and all 27 Amendments, each with a plain-language explanation
  and a "Why it matters" note
- **Quizzes** — Constitution I.Q. and Amendments Match, scored with stars
- **Collection** — 9 badges, 5 founder cards, and 27 amendment stamps
- **Glossary** — 29 civics terms with live search

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:8080/index.html>.

The app is plain ES modules and static CSS, so there is no build step for
development: `npm run dev` just serves the directory.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Serve the app on port 8080 |
| `npm test` | Run the unit suite (Vitest + jsdom) |
| `npm run test:watch` | Unit suite in watch mode |
| `npm run test:e2e` | Run the end-to-end suite (Playwright, auto-starts a server) |
| `npm run coverage` | Unit tests with a V8 coverage report |
| `npm run lint` | Placeholder — no linter is configured yet |

First-time E2E run needs the browser binary:

```bash
npx playwright install chromium
```

## Project layout

```
index.html              Entry point; loads the module graph
css/main.css            All styles — design tokens plus components
js/
  app.js                View router; the sole owner of application state
  data.js               Aggregates all content
  data/                 Content: articles, amendments, chapters, founders,
                        quizzes, glossary
  save.js               The only module that touches localStorage
  xp.js                 Game logic: XP, levels, streaks, badges, stars
  components/           Header and reward popup
  views/                One module per screen (map, chapter, reader, quiz,
                        collection, glossary)
tests/                  Unit tests (Vitest)
tests/e2e/              End-to-end tests (Playwright)
docs/                   PRD, screen map, stack and data-model docs
docs/design/            Design tokens, manifesto, and the HTML prototype
```

## Architecture

Three seams carry the design:

- **`js/save.js`** is the only module that reads or writes `localStorage`. It
  validates everything it loads field by field, so a corrupt or hand-edited save
  falls back to defaults instead of breaking the app. Chapter progression is
  recomputed on every load rather than trusted, so a save that claims chapter 3
  is complete while chapter 1 is untouched gets corrected.
- **`js/xp.js`** holds pure functions over the saved state — no DOM, no storage.
  `updateStreak` takes an injectable `now`, so streak tests never depend on the
  wall clock. Every function here is pure, which is why the badge, level and
  star rules can be tested without a browser.
- **`js/app.js`** owns state and routing. Views are stateless: each exports
  `render(container, state, handlers)` and rebuilds its DOM from the state it is
  handed. Views never import each other and never touch storage.

Content lives in `js/data/` and is the single source of truth for every word of
constitutional text. Views import it; nothing is hardcoded in a view.

`js/data.js` is the aggregate entry point that both the views and the content
integrity tests import, so a content edit is checked by the same tests that
guard the shipped data.

## Testing

82 unit tests and 7 end-to-end tests, all passing.

Unit tests cover content integrity (exact entity counts, valid answer indices,
a monotonic amendment year sequence), persistence (corruption recovery, star
clamping, unlock recomputation) and game logic (level thresholds, streak
transitions across month and year boundaries, badge conditions).

The E2E suite drives the real app in Chromium over semantic locators only
(`getByRole`, `getByLabel`, `getByText`, `getByTestId` — never a CSS class or
XPath). It covers the critical path from chapter 1 through completion,
persistence across reload, the quiz flow, the reader, glossary filtering, and
collection states — plus a regression test pinning that replaying a chapter
does not duplicate its founder card or award XP twice.

Two rules the app must hold are worth calling out, because they are pinned by
tests rather than left to the UI:

- **Progression is recomputed, not trusted.** A save file that claims chapter 3
  is unlocked while chapter 1 is untouched is corrected on load.
- **Rewards are idempotent.** Replaying a completed chapter cannot duplicate its
  founder card or grant XP a second time.

## Known gaps

- No linter is configured; `npm run lint` is a stub.
- Keyboard activation of controls has not been verified end to end.
- Layout below roughly 375px wide has not been measured for overflow.

## Browser support

Any current browser with ES module support and `localStorage` — Chrome, Firefox,
Safari, Edge. The layout is responsive down to phone widths, and
`prefers-reduced-motion` is honoured.

## Content and accuracy

Constitutional text is public domain. Plain-language explanations and quiz
content were written for this project and reviewed for factual accuracy during
testing — the amendment year sequence is asserted to be monotonic and the
entity counts are pinned, so content edits that break those invariants fail the
suite.

## License

No license file is included yet. Add one before distributing or accepting
contributions.
