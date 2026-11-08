# PRD — Constitution Quest (working title)

Interactive, gamified web app that teaches middle/high school students the U.S.
Constitution and its amendments through story-driven chapters and game
mechanics.

## 0. Project type

Web app. Static frontend, runs entirely in the browser, no backend. Progress
persisted in the browser (localStorage). Deployable as static files anywhere.

## 1. Problem statement

Middle/high school students are expected to learn the U.S. Constitution but
find the original text dense and the standard resources dry. Existing civic-ed
platforms (NCC Interactive Constitution, Constitution Annotated, Annenberg
Classroom, Constitution Facts) are excellent reference tools — full text,
scholar interpretation, timelines, quizzes — but none is built as a game.
There is a gap for a story-first, badge-driven experience that turns the
1787 Constitutional Convention, the seven Articles, and the 27 amendments into
an engaging journey a teenager actually wants to play through.

## 2. Target users

- **Maya, 14, 8th-grade civics student.** Goal: pass her civics unit on the
  Constitution. Pain: the textbook is boring and she tunes out reading legal
  text. Wants short story beats, immediate reward, and a sense of progress.
  Skill: casual learner; familiar with games and apps.
- **Dev, 16, history-curious teen.** Goal: understand how the Constitution
  came to be and how amendments changed the country. Pain: reference sites
  overwhelm with legal density. Wants stories, facts, collectibles, and a
  challenge to master.

## 3. User stories

1. As a student I want to start a story chapter and finish it in under ~5
   minutes so that I learn the core idea without a long slog.
   - Acceptance: first chapter (Why a Constitution / Preamble) is completable
     in ≤5 minutes; ends with a comprehension check and points.
   - Priority: P0
2. As a student I want to read the actual Constitution text next to a
   plain-language "What it means" version so that I can quote the real words
   and understand them.
   - Acceptance: every Article and Amendment has original text + a teen-tone
     plain-language explanation reachable from a reader.
   - Priority: P0
3. As a student I want to earn XP, levels, and badges so that learning feels
   like a game.
   - Acceptance: completing story beats and quizzes awards XP; leveling up and
     earning a badge produce visible celebration feedback; at least one badge
     is earnable in the first session.
   - Priority: P0
4. As a student I want to test myself with quiz challenges and get instant
   feedback so that I know what I learned and what to review.
   - Acceptance: each quiz question shows right/wrong immediately with a
     one-line explanation; score maps to 1–3 stars; replay improves stars.
   - Priority: P0
5. As a student I want a visual journey map so that I can see what I finished,
   what is next, and what is locked.
   - Acceptance: chapters render as an illustrated path; completed = marked,
     next = highlighted, later = locked; returning users resume at their
     current chapter.
   - Priority: P0
6. As a student I want to collect Founder Cards and Amendment Stamps so that I
   have a reason to explore everything.
   - Acceptance: each story beat/chapter can award a collectible; a collection
     screen shows earned vs. missing; missing ones hint at how to get them.
   - Priority: P1
7. As a student I want a searchable glossary so that a term I forgot is one
   tap away.
   - Acceptance: glossary reachable from every screen; each term has a
     one-line teen-tone definition.
   - Priority: P1
8. As a returning student I want my progress saved so that I continue where I
   left off.
   - Acceptance: XP, levels, badges, stars, collectibles, and chapter states
     persist across reloads; a "Continue" action resumes the current chapter.
   - Priority: P0

## 4. Scope

In scope:

- Story-first learning: a narrative journey through (a) why the Constitution
  exists (Articles of Confederation → 1787 Convention), (b) the Preamble,
  (c) Articles I–VII (three branches, states, amendment process, ratification),
  (d) the Bill of Rights, (e) the later amendments as the story of expanding
  democracy (13, 14, 15, 19, 26, and the rest summarized), (f) a short
  landmark-case story beat set (a handful, e.g. Marbury, Brown, Miranda, Gideon,
  Tinker — kept light and accurate).
- Reader: full original text + teen-tone plain-language explanation for the
  Preamble, all 7 Articles, and all 27 Amendments.
- Game layer: XP, levels, badges, 1–3 star quiz challenges, streak, journey
  map, Founder Cards + Amendment Stamps collection.
- Glossary of ~40 civics terms.
- Local progress persistence (localStorage), "Continue" resume, reset option.

Out of scope:

- Accounts, online leaderboards, social/multiplayer (user decision: local only).
- Deep scholarly/legal analysis, full case law, interpretive debate essays
  (NCC-style dueling perspectives).
- Audio/video production; printable worksheets; teacher dashboards.
- Non-English localization (English only for v1).

## 5. Success metrics

- A new user can finish the first chapter and earn their first badge within
  one session (target ≤10 minutes).
- A user can open any of the 27 amendments and see both original text and a
  plain-language explanation in ≤2 taps.
- Returning users see their progress intact and resume via "Continue" with no
  setup.
- The journey map communicates locked/unlocked/next state at a glance.

## 6. Open questions

Resolved with the requester: audience = middle/high school students; depth =
story-first/light; persistence = local, no accounts.
Remaining open: final product name ("Constitution Quest" is a working title —
confirm or rename at the design checkpoint).
