---
"@ornie/react": minor
---

Phase 0 — rails: token pipeline, missing semantic tokens, audits, tier folders.

**Token pipeline (D-44).** `tokens.json` is now the single source of truth. `pnpm tokens` regenerates `src/styles/tokens.css`, `tokens/Tokens.swift` and `tokens/Tokens.kt`; the CSS file is generated output and must never be hand-edited.

**New semantic tokens** (both themes, AA-audited): `--ornie-hover`, `--ornie-selected`, `--ornie-track`, `--ornie-done`, `--ornie-surface-inverse`, `--ornie-text-inverse`, `--ornie-tone-{river,fur,moss,clay,stone}` (+ `-ink`), motion tokens `--ornie-duration-quick` (120ms), `--ornie-duration-gentle` (220ms), `--ornie-ease-out`, `--ornie-ease-inout`. All duration tokens collapse to 1ms under `prefers-reduced-motion` in the token layer, so components never write that media query themselves.

**Focus ring convention.** `--ornie-focus-ring` is now a color (river-500 light / river-300 dark), applied as `outline: 2px solid` with 2px offset on every interactive component — previously it was a box-shadow value. If you consumed `--ornie-focus-ring` as a shadow, switch to the outline pattern. Error-state fields now keep the standard focus ring (focus is identical everywhere); `--ornie-focus-ring-danger` is deprecated.

**Deprecations (kept working until 0.3.0):** `--ornie-inverse-surface` → `--ornie-surface-inverse`, `--ornie-inverse-text` → `--ornie-text-inverse`, `--ornie-duration-fast` → `--ornie-duration-quick`, `--ornie-duration-normal` → `--ornie-duration-quick`/`gentle`, `--ornie-ease` → `--ornie-ease-out`, `--ornie-focus-ring-danger`.

**Overlay recalibrated** to the final app designs: light scrim sand-900 @ 40%, dark scrim black @ 55%.

**Dark-mode discipline (D-67).** Avatar's decorative tones moved to theme-resolving semantic tokens (`--ornie-tone-*`); component CSS now contains zero `[data-ornie-theme]` selectors — CI-enforced by `pnpm audit:tokens` alongside the no-hex and raw-scale rules. `pnpm audit:a11y` (axe over variant grids) and `pnpm audit:contrast` complete the gate set.

**Tier folders.** Source moved to `src/primitives/` (the existing 12), with `src/patterns/` and `src/shells/` opened for the roadmap; foundations folderized. Package exports are unchanged — flat `OrnieReact.Button`-style API, no import path changes for consumers.

**Icons (decision, Phase 1 executes):** ~44 glyphs curated from Lucide (ISC), stroke 1.9, round caps/joins, renamed to plain nouns.
