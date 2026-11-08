# Design tokens — Constitution Quest

Semantic tokens only (no raw hex in components). Fonts: Google Fonts
**Fraunces** (display) + **Nunito Sans** (body/UI), loaded in the prototype
head with `display=swap` and serif/sans fallbacks.

## Color roles

| Token | Value | Role |
|---|---|---|
| `--c-navy-900` | `#0E2238` | Primary dark surface (header, footer, journey-path ground), white text on it |
| `--c-navy-700` | `#1D4270` | Secondary dark; link/action on cream |
| `--c-navy-100` | `#E3ECF5` | Soft navy tint (chip background, callout) |
| `--c-cream-50` | `#FBF7EF` | Page background (parchment) |
| `--c-cream-100` | `#F3EAD8` | Card-border / section tint |
| `--c-ink` | `#22303F` | Body text on cream/white |
| `--c-muted` | `#5B6B7B` | Secondary text (labels, captions) |
| `--c-crimson-600` | `#B03A2E` | Primary action (buttons), error |
| `--c-crimson-100` | `#F7E3DF` | Error tint background |
| `--c-gold-500` | `#D9A23B` | Stars, badges, level accents (decorative fill) |
| `--c-gold-700` | `#8A641C` | Gold text on cream (must read as text) |
| `--c-white` | `#FFFFFF` | Card surfaces |
| `--c-success-700` | `#2E6B4F` | Correct-answer text/icon |
| `--c-success-100` | `#E2F0E8` | Correct-answer tint background |
| `--focus-ring` | `#1D4270` + 3px outline, offset 2px | Keyboard focus |

Contrast intent (WCAG AA): navy-900 on cream ≈ 12+:1; ink on cream ≈ 12+:1;
crimson-600 on cream ≈ 6:1; white on crimson-600 ≈ 7:1; gold-700 on cream
≈ 4.6:1 (text use only); muted on cream ≈ 4.9:1. Exact values re-checked on
the render during review.

## Typography

- Display (brand, h1, chapter titles): **Fraunces** 700–900, tight leading.
- UI/body (everything else): **Nunito Sans** 400/600/800.
- Scale: brand 1.75rem; h1 1.625rem; h2 1.375rem; h3 1.125rem; body 1rem;
  small 0.875rem; caption 0.8125rem. Buttons 1rem/700. Body line-height 1.55.
- Never below 0.8125rem for functional text.

## Spacing / shape / elevation

- Space scale: 4 / 8 / 12 / 16 / 24 / 32 / 48.
- Radius: cards 16px; buttons/inputs 12px; chips 999px; badges 999px.
- Shadows: card `0 2px 10px rgba(14,34,56,.10)`; raised (popup)
  `0 12px 32px rgba(14,34,56,.22)`.
- Focus: `outline: 3px solid var(--focus-ring); outline-offset: 2px`.

## Motion

- XP bar: 600ms width ease-out.
- Reward popup: 220ms scale-in 0.96→1 + fade; no translation of page content.
- Chapter-card hover: 120ms translateY(-2px); respects `prefers-reduced-motion`
  (disable all transform/confetti; popup becomes instant fade).

## Icons & illustration

- Inline SVG only, currentColor where possible. Icon set: star, flame (streak),
  padlock, quill, scroll, scales, columns/capitol, gavel, eagle, flag, map-pin,
  trophy, card, stamp, arrow. Decorative SVGs get `aria-hidden="true"`.
- Journey map: one winding path SVG; node = landmark circle + label; states
  completed (gold), current (navy + gold ring, pulse), locked (muted + padlock).
