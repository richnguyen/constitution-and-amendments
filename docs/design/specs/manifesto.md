# Design manifesto — Constitution Quest

## Task
Gamified web app that teaches middle/high school students the U.S. Constitution
and its 27 amendments through story-first chapters, a journey map, quiz
challenges, badges/XP/levels, collectibles, a full-text reader with plain-language
"what it means" explanations, and a glossary. Local-only progress (localStorage).

## Priorities
1. Story-first: learning happens inside a narrative journey (1787 → today).
2. Game rewards visible and instant: XP, levels, badges, stars, collectibles.
3. Real text + teen-voice plain language, never one without the other.
4. Progress persistence and "continue where I left off".
5. Legible, friendly, accessible — playful but not childish or cluttered.

## Direction — "civic adventure"
A modern, energetic interpretation of founding-era America: deep navy and
crimson (authority, patriotism), parchment cream (the document), and gold
(achievements, stars). Typography: Fraunces (warm, characterful serif) for
display, Nunito Sans (friendly rounded sans) for body/UI. Illustration is
hand-drawn-style inline SVG: a winding journey path with landmarks
(Independence Hall, Capitol, Supreme Court), founder portrait cards, amendment
stamps, quills, stars, scrolls. No external image assets; everything is SVG/CSS.

## Reuse / adapt / explore (from user-supplied references)
- **Adapt — NCC Interactive Constitution:** original text next to a plain-language
  interpretation. We use one teen-voice "What it means" panel instead of dueling
  scholar essays (out of depth scope).
- **Adapt — Annenberg Classroom:** article/amendment-by-amendment guide, an
  interactive "how we got here" timeline, landmark-case story beats, glossary.
- **Adapt — Constitution Facts:** quiz challenges as the core scored loop (1–3 stars).
- **Explore — gamification layer:** journey map hub, XP/levels/streaks, badges,
  founder cards + amendment stamps collection. This is the differentiator the
  brief names ("lots of gamification and storytelling").

## Tradeoffs
- Story-first depth = light legal analysis; no case-law tables, no interpretive
  debate essays.
- Local progress = no accounts, no leaderboards, no social.

## Reference note
Design-studies and palettes catalogs returned no match for this brief's
vocabulary (queried: playful/game/education, poster/retro/comic, navy/cream/red/
gold). Per skill guidance, direction was designed independently from the brief;
no catalog study was adopted. The patriotic palette is a brief-fit choice, not a
borrowed study.
