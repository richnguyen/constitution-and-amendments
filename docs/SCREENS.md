# Screen map and flows — Constitution Quest

All screens are views in a single-page app. Primary nav (header + tab bar):
**Map | Reader | Collection | Glossary**. App name + XP bar + level badge +
streak live in the header on every screen. Prototype is plain HTML/JS at
`docs/design/prototype/` (index.html = single entry, all views are JS-driven
states in that file). No routing library; view state lives in `app.js`.

## Header (every screen)
- Brand: star + "Constitution Quest" (Fraunces display).
- XP bar (animated fill), Level badge ("Lv 3"), streak flame ("🔥 4d").
- Mobile: collapsible; tab bar persists at bottom.

## Screen 1 — Journey Map (`#map`) [P0 story 5]
Hub. An illustrated winding path (SVG) of chapters from "1787" to "Today".
- Chapter nodes: completed (gold star, filled), current/next (highlighted,
  pulsing "PLAY" affordance), locked (dimmed padlock).
- Card above the map: "Continue your journey" → resumes current chapter.
- Entry: app open (new user → highlighted first chapter; returning → current).
- Exit: chapter node → Story screen; Reader link → Reader; other tabs.
- States: first-run (no progress), mid-journey (some complete), all-complete
  ("Journey complete! Replay or collect remaining badges").

## Screen 2 — Story chapter (`#chapter`) [P0 stories 1,3]
A chapter is a sequence of story beats (cards) + a comprehension check.
- Beat card: title (Fraunces), illustration chip (SVG icon per beat), body
  text (teen voice, story-first), optional "Did you know?" gold callout.
- Progress dots at top (beat i of n).
- "Continue" primary button advances; final beat → comprehension check.
- Comprehension check: 3 multiple-choice questions, one at a time, instant
  right/wrong with a one-line explanation (P0 story 4).
- Result: stars (0–3), XP award, optional collectible; reward popup
  (badge/level-up/collectible) → back to Map with chapter marked complete.
- States: beat, check question, check result, reward popup; locked chapter
  cannot be entered (Map shows it dimmed).

## Screen 3 — Quiz challenge (`#quiz`) [P0 stories 3,4]
Standalone practice challenges (separate from chapter checks) with 5 questions.
- Question card with 3–4 options; selection is instant-feedback (green/red +
  explanation line), then "Next".
- End: star rating (0–3), XP, replay button; best stars stored.
- States: question, feedback, result, replay.

## Screen 4 — Constitution Reader (`#reader`) [P0 story 2]
Full original text + plain-language "What it means" for Preamble, all 7
Articles, all 27 Amendments.
- Left rail: document list grouped (Preamble / Articles I–VII / Amendments
  1–27 with era labels). Mobile: drawer/select.
- Main: document title, era badge, original text (readable serif), toggle
  "What it means" (pill switch) revealing a teen-voice panel; a "Why it
  matters" gold callout for key documents.
- States: list, open document, "what it means" shown, empty search.

## Screen 5 — Collection (`#collection`) [P0 story 6, P1]
Three sections: Badges, Founder Cards, Amendment Stamps.
- Grid of cards; earned = full color + name; missing = silhouette + "???" +
  hint line ("Earn by finishing Chapter 3"). Selection opens a detail popover
  with description.
- States: empty (first-run), partial, complete (all earned).

## Screen 6 — Glossary (`#glossary`) [P1 story 7]
Searchable list of ~40 civics terms. Each term: name + one-line teen-voice
definition. Search input filters live; tapping a term opens detail with a
2–3 line definition and related term links.
- States: full list, filtered, no-results, detail open.

## Overlay — Reward popup
Celebration modal after any award: badge earned / level up / collectible /
new stars. Icon, title, description, "Collect!" primary button; respects
reduced motion (no confetti animation when reduced-motion on).

## Flows
- New user → Map → "Start your journey" → Chapter 1 → beats → check → reward →
  Map (chapter 1 done, chapter 2 unlocked).
- Returning user → Map shows saved progress → "Continue" resumes current chapter.
- Look up a term mid-chapter → Glossary (header tab) → back returns to chapter.
- Read Amendment 19 → Reader → Amendments → 19 → toggle "What it means".
- Practice → Quiz challenge from Map (optional "Test yourself" link) → stars.

## Persistence contract
localStorage `cq.save.v1`: XP, level, streak, chapter states (locked/unlocked/
completed), per-chapter stars, quiz bests, badges, collectibles, current
chapter. Reset option in footer ("Reset journey" with confirm).
