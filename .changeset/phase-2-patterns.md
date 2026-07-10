---
"@ornie/react": minor
---

Phase 2 — patterns: the task language. 14 new components in the patterns tier.

**The task cluster.** `TaskCheck` (23px ø completion circle, checkbox semantics, check draws in over `--ornie-duration-gentle` — instant under reduced motion), `TaskRow` (TaskCheck · title · MetaLine · trailing; `density="phone|desktop"`; states `done`/`waiting`/`resurfaced` — **overdue is not a state, there is no red**; resurfaced renders a quiet "back for a look" chip, R-3), `MetaLine` (11.5px metadata run with automatic `·` separators, tail-first truncation), `ProjectDot` (6px identity dot on the new `--ornie-project-*` semantic tokens — five muted mids, theme-retargetable), `DayRing` (46px ring, remaining count or resting otter-dot; the API cannot express streaks or red, R-5).

**List chrome.** `ListSection` (10.5 caps label, owns hairline separators, `surface="plain|card"`), `ListRow` (leading/title/description/trailing slots, both densities, interactive button/a rendering; settings/person/note/module recipes documented, not minted as components), `DateGroupHeader` (11px caps accent kicker, sticky-capable; the DS formats no dates).

**Forms.** `FormField` (label + any control + help/error; `htmlFor`/`aria-describedby` injection with a single-child contract, group mode for composites; calm validation copy — no exclamation marks), `SearchField` (search icon + clear button + `⌘/`-style Kbd hint; string-first `onChange`, Escape clears).

**Selection.** `SegmentedControl` (2–4 exclusive options, radiogroup semantics, arrows move and select; quiet background swap, no sliding thumb), `ChipGroup` (single/multi Chip selection, roving tabindex, 8px wrap).

**Feedback.** `EmptyState` ("name what is" copy rules baked into the docs), `Toast` + `ToastProvider`/`ToastHost`/`useToast` (bottom-centered on `--ornie-surface-inverse`, max one visible with a queue, 8s auto-dismiss paused on hover/focus, `aria-live="polite"` — nothing in Ornie is assertive; the "Done · Undo" single-action pattern, D-50).

**Tokens:** `--ornie-project-river/moss/clay/fur/rust`, `--ornie-z-toast: 1200`.

**AA over mockup fidelity (sanctioned by the roadmap):** small text (10.5–13px section labels, metadata, placeholders) uses `--ornie-text-muted` where the mockups used `--ornie-text-subtle` — subtle is 3.57:1 in dark, failing WCAG AA at small sizes. Subtle remains for ≥15px text and non-text graphics.

All 35 variant grids (light + dark) pass axe; TaskRow/TaskCheck verified against the 2a mockup in both densities.
