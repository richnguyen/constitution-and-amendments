# Domain research notes — Constitution Quest (working title)

Scope: from-scratch web app that teaches middle/high school students the U.S.
Constitution and its amendments through story and games. User decisions locked
with the requester: audience = middle/high school students; depth = story-first
overview (light, not deep scholarly); persistence = local browser progress, no
accounts, no backend.

The reference examples (user-supplied, read from `text_1.txt`) are National
Constitution Center Interactive Constitution, Library of Congress Constitution
Annotated, Annenberg Classroom, and Constitution Facts. Their descriptions in
the brief are the source for the "Conventions" and "UI references" sections.

## Domain vocabulary (entities, KPIs, statuses) — seeds docs/design/specs/CONTEXT.md

Entities:

- **Constitution** — the supreme law of the United States; a single document
  made of a Preamble, 7 Articles, and 27 Amendments.
- **Preamble** — the opening statement of purpose ("We the People...").
- **Article** — a major numbered section of the Constitution (Articles I–VII);
  each establishes a branch of government or a structural rule.
- **Amendment** — a formal, ratified change to the Constitution (1–27).
- **Bill of Rights** — the first ten amendments (ratified 1791), protecting
  individual liberties.
- **Clause** — a specific provision inside an Article or Amendment.
- **Framer** — a delegate who wrote and signed the Constitution at the 1787
  Constitutional Convention (e.g. Madison, Hamilton, Washington, Franklin).
- **Ratification** — the official approval process that made the Constitution
  (and each amendment) law.
- **Federalist / Anti-Federalist** — the two sides of the ratification debate;
  Federalists supported the new Constitution, Anti-Federalists opposed it and
  demanded a bill of rights.
- **Constitutional Convention** — the 1787 meeting in Philadelphia where the
  Constitution was written.
- **Branch** — one of the three parts of the federal government: Legislative
  (Article I, Congress), Executive (Article II, President), Judicial
  (Article III, courts).
- **Separation of powers / checks and balances** — the design that splits power
  among branches and lets each limit the others.
- **Landmark case** — a Supreme Court case that interpreted a clause and shaped
  its meaning (kept light: a handful of famous stories).

Game KPIs (not domain entities — the engagement layer):

- **XP** (experience points) earned from completing stories and quizzes.
- **Level** — grows from XP; unlocks new chapters.
- **Badge** — an achievement earned for a specific feat (e.g. "Amendment
  Collector", "Quiz Whiz", "We the People").
- **Streak** — consecutive days of activity.
- **Completion %** — per-chapter and overall progress.
- **Collectible** — a reward item (Founder Card, Amendment Stamp) tied to
  content mastery.
- **Quiz score** — stars earned per challenge (1–3).

Statuses:

- **Locked / Unlocked** — chapter access state on the journey map.
- **Earned / Locked** — badge and collectible state.
- **Completed / In progress** — chapter and quiz state.

## User decisions

What a teen learner actually decides while using the app:

- **"Which chapter do I play next?"** — the journey map must make the path
  forward obvious and tempting (next unlockable chapter clearly highlighted).
- **"Am I ready to take the quiz?"** — the story chapter should teach enough
  that the quiz feels fair; the app should signal readiness.
- **"How do I earn more points/badges?"** — the reward rules should be legible
  (badge list, what each requires) so effort is directed.
- **"What did I just learn / where do I go to re-check a fact?"** — a quick
  reference (glossary + full text) must be reachable from anywhere.

## Conventions users expect

Teen-oriented learning apps (general conventions, not from a specific source):

- Instant feedback on quiz answers (right/wrong shown immediately with a short
  explanation) — never silent grading.
- Visible reward feedback: points tick up, badges pop, level-ups celebrate.
- Progress persistence: progress bar + "continue where I left off" on reopen.
- Clear difficulty ramp: early chapters are short and easy wins; later content
  asks more.

From the supplied reference descriptions (brief requirement):

- Full original text alongside a plain-language interpretation
  (NCC Interactive Constitution "Common Interpretation" pattern).
- Article-by-article / amendment-by-amendment guide, timelines, and landmark
  case stories (Annenberg Classroom pattern).
- Knowledge-check quizzes as a core loop (Constitution Facts "Constitution
  I.Q." pattern).

## UI references and formats (from user-supplied examples)

| Source (user-supplied) | Observed format | Task fit for this app | Proposal |
|---|---|---|---|
| NCC Interactive Constitution | Full text + scholar "Common Interpretation" + competing-perspective essays | Strong fit for the "read the real text" need; the competing-perspective essays are beyond story-first scope | Adapt: dual-pane "Original text / What it means" view, teen tone, one plain-language voice instead of dueling essays |
| Annenberg Classroom | Constitution guide, videos, interactive timelines, landmark case studies, civics glossary | Timelines and case stories fit the storytelling goal; videos are out of scope (no media production) | Adapt: an interactive "story of how we got here" timeline plus landmark-case story beats; keep a searchable glossary |
| Constitution Facts | Full transcripts + Constitution I.Q. quizzes | Quiz loop fits the game layer | Adapt: leveled quiz "challenges" as the core scoring mechanic (1–3 stars) |
| Constitution Annotated (LoC) | Authoritative article-by-article legal analysis, table of cases | Scholarly depth is out of scope for a story-first teen app | Reuse only as a source for factual accuracy on the handful of landmark stories we include |

Labels: the four reference rows are brief requirements (user supplied the
examples); the gamification conventions are agent proposals inferred from
domain norms, not validated demand.

## User sentiment

Not researched. Out of scope for this self-contained build; no app-store or
review mining was performed. Do not claim demand validation.

## Failed attempts

Not researched. No market/graveyard analysis was requested or performed.

## Opportunity gaps

Not researched as a market claim. The differentiation hypothesis (agent
proposal, not evidence): existing civic-ed platforms are reference tools, not
game experiences; a story-first, badge-driven journey fills the gap the user
named ("interactive and engaging... lots of gamification and storytelling").
This is directional only.
