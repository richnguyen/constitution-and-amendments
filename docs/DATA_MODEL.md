# Data Model — Constitution Quest

Client-only app. All entities are defined in `js/data.js` (content) and `js/save.js` (progress). There is no server-side database.

## Entity: SaveData

The entire player progress fits in one JSON object stored under `localStorage` key `cq.save.v1`.

```
SaveData {
  xp: number              // total XP earned, default 0
  level: number           // current level, default 1
  streak: number          // consecutive days, default 0
  lastActive: string|null // ISO date of last activity, null = first run
  chapters: ChapterState[]
  quizStars: Record<QuizId, number>  // best stars (0–3) per quiz
  badges: BadgeId[]       // earned badge IDs
  collectibles: CollectibleId[]  // earned collectible IDs
  readAmendments: AmendmentId[]  // "a1".."a27" — amendments opened in the Reader
}
```

### ChapterState

```
ChapterState {
  id: ChapterId           // "ch1".."ch5"
  status: "locked" | "unlocked" | "completed"
  stars: number           // 0–3 from comprehension check
}
```

**Constraints:**
- Chapters unlock sequentially: ch1 starts unlocked; chN unlocks when ch(N-1) is completed.
- `badges` and `collectibles` are simple arrays of earned IDs. Missing items are inferred by their absence.

### Screens that read/write SaveData

| Screen | Read | Write |
|---|---|---|
| Header (every screen) | XP, level, streak | — |
| Journey Map | chapter states, current chapter | — |
| Story chapter | — | chapter status, XP, stars, collectibles |
| Quiz | quizStars | quizStars, XP |
| Reader | readAmendments | readAmendments |
| Collection | badges, collectibles, readAmendments | — |
| Reward popup | — | badges, collectibles, level |

---

## Entity: Chapter (content, 5 chapters)

Defined in `js/data.js`. Each chapter has a sequence of story beats and a comprehension check.

```
Chapter {
  id: "ch1" | "ch2" | "ch3" | "ch4" | "ch5"
  title: string
  subtitle: string
  badgeId: BadgeId | null    // badge earned on completion
  collectibleId: CollectibleId | null
  beats: StoryBeat[]
  check: ComprehensionCheck
}
```

### StoryBeat
```
StoryBeat {
  title: string
  body: string
  dyk?: string      // "Did you know?" callout, optional
}
```

### ComprehensionCheck
```
ComprehensionCheck {
  questions: CheckQuestion[]  // 3 questions
}

CheckQuestion {
  q: string
  options: string[]           // 4 options
  correct: number             // index of correct option (0-based)
  explanation: string
}
```

**Displayed on:** Story chapter screen (Screen 2).

---

## Entity: Article (content, 7 articles)

```
Article {
  id: "art1" .. "art7"
  title: string               // e.g. "Article I — The Legislative Branch"
  summary: string
  original: string            // full original text
  plain: string               // teen-tone plain-language
  why?: string                // "Why it matters" optional callout
  keyQuote: string
}
```

**Displayed on:** Reader screen (Screen 4).

---

## Entity: Amendment (content, 27 amendments)

```
Amendment {
  id: "a1" .. "a27"
  year: number
  title: string
  summary: string
  original: string
  plain: string
  why?: string
}
```

**Displayed on:** Reader screen (Screen 4).

---

## Entity: Badge (content, 9 badges)

```
Badge {
  id: "b1" .. "b9"
  name: string
  description: string
  icon: string                // SVG icon name
}
```

**Displayed on:** Collection screen (Screen 5) — earned = full color, missing = silhouette + hint.

---

## Entity: FounderCard (content, 5 cards)

```
FounderCard {
  id: "f1" .. "f5"
  name: string
  role: string
  color: string               // CSS color for card accent
}
```

**Displayed on:** Collection screen (Screen 5).

---

## Entity: Quiz (content, 2 quizzes)

```
Quiz {
  id: "quiz1" | "quiz2"
  name: string
  questions: QuizQuestion[]   // 5 questions
}

QuizQuestion {
  q: string
  options: string[]           // 4 options
  correct: number
  explanation: string
}
```

**Displayed on:** Quiz screen (Screen 3).

---

## Entity: GlossaryTerm (content, ~29 terms)

```
GlossaryTerm {
  term: string
  def: string                 // one-line teen-tone definition
}
```

**Displayed on:** Glossary screen (Screen 6).

---

## Relationships

```
Chapter 1──► StoryBeat      (1:N — beats in a chapter)
Chapter 1──► ComprehensionCheck  (1:1)
ComprehensionCheck 1──► CheckQuestion  (1:N)
Quiz 1──► QuizQuestion  (1:N)
SaveData 1──► ChapterState  (1:N)
SaveData N──► Badge         (N:M, via badges[] array — earned badges)
SaveData N──► Collectible   (N:M, via collectibles[] array)
```

All entities are normalized to 3NF. The only denormalization is `quizStars` as a flat `Record<id, number>` map — acceptable for a client-only app where the map is simpler than a join table for two quizzes.

## Critical Files for Implementation

| File | Why |
|---|---|
| `js/data.js` | All content entities as JS objects — the single source of truth |
| `js/save.js` | SaveData schema, serialization, default state, reset |
| `js/xp.js` | XP/level/badge/streak computation — the game-logic seam |
| `js/views/map.js` | Displays ChapterState and triggers chapter transitions |
