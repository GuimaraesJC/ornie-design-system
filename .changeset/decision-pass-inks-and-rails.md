---
"@ornie/react": minor
---

Decision pass before Phase 3 — AA-tuned subtle ink, warm scrim, shell rails.

**`--ornie-text-subtle` retuned instead of avoided.** New sand steps `450` (#9c8f7e, dark) and `550` (#75685a, light) make the quiet third ink hold WCAG AA 4.5:1 on every ground (surface, bg, sunken) in both themes at any text size. Metadata (MetaLine), section labels and trailing counts (ListSection), done task titles, and field placeholders return to `text-subtle` per the mockups — the muted-everywhere workaround from Phase 1/2 is reverted. The contrast audit now holds subtle to the full 4.5 bar on three grounds.

**Dark scrim is warm again**: `--ornie-overlay` dark is sand-1000 @ 55% (was pure black @ 55%) — "deep warm browns, never pure black" is a theme principle; the roadmap's 55% opacity stands.

**Chip gains `disabled`** (dims, disables action and × buttons); ChipGroup now forwards it per option instead of rendering inert lookalikes, and its roving tabindex skips disabled buttons.

**ProgressRing inner disc is themeable in place**: `--ornie-progress-ring-disc` (defaults to `--ornie-surface`) lets sunken contexts (SidebarNav rail, Phase 3) blend the disc without new props.

**Shell rails for Phase 3:** z-layer tokens `--ornie-z-dock: 100`, `--ornie-z-drawer: 800`, `--ornie-z-sheet: 900` (under modal 1000), and the runtime contract variable `--ornie-keyboard-inset: 0px` — the app sets it from the keyboard APIs; Sheet adds it to `env(safe-area-inset-bottom)`.
