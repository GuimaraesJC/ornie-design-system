---
"@ornie/react": minor
---

Phase 3 — shells: app chrome. 8 new components in the shells tier.

**Mobile.** `Sheet` (D-68: scrim + bottom panel, grabber, heights `half`/`tall`/`content`, focus trap + Esc + scrim tap + focus return, keyboard-safe bottom padding via `env(safe-area-inset-bottom)` + the new `--ornie-keyboard-inset` contract token; untitled sheets get an accessible-name fallback), `Dock` (84px bar on surface-sunken, ≤4 nav items + raised 54px capture button with the 4px page-background ring; quiet neutral badge counts; safe-area aware).

**Desktop frame.** `SidebarNav` + `SidebarGroup` + `SidebarItem` (264px expanded / 60px rail, `--ornie-selected` active wash + accent ink, quiet count badges, ProjectDot/mini-ProgressRing project rows with the ring disc blended into the rail, built-in right tooltips with Kbd hints in rail mode), `TopBar` (52px, leading/title/trailing, `scrolled` hairline fade).

**Overlays.** `PanelDrawer` (372px right panel; `mode="inline"` renders an `<aside>` landmark in flow, `mode="overlay"` renders a dialog over the scrim at `--ornie-z-drawer` with the full focus contract; header/footer slots per the Ask panel), `CommandOverlay` (the ⌘K/⌘/ surface composing Modal `placement="top"`: borderless input row, managed `items`/`renderItem`/`onSelect` with combobox/listbox semantics and roving active row, Kbd hint footer; **no search logic** — the app queries SQLite, D-23; widths 540 capture / 560 find).

**Compositions.** `PageHeader` (kicker · greeting/view title · trailing slot — 25px phone/29px desktop greeting per the mockups), `TriageCard` (D-68: Card spine + captured text + source MetaLine + decide ChipGroup + "3 of 7" ProgressRing footer; `onDecide` fires per pick, swipe stays app-side).

**Modal (additive):** `container` prop (portal target — embedding/tests/grids) and `flush` (edge-to-edge body) — both for CommandOverlay composition. Sheet and PanelDrawer share the same `container` escape hatch.

**Token change:** dark `--ornie-selected` deepened river-700 → river-800 so `--ornie-accent-text` holds 4.5:1 on the selected wash (sidebar active items) — pair added to the contrast audit.

All 43 variant grids pass axe (three real fixes along the way: dialog naming on untitled sheets, keyboard-focusable scrollable bodies, listbox semantics dropped for empty result sets, `role="dialog"` moved off `<aside>`). Dock/Sheet verified against the 2a/2b mockups; SidebarNav/TopBar/CommandOverlay against the desktop mockup; PanelDrawer inline vs overlay both demonstrated in its grid.
