# @ornie/react

## 0.2.0

### Minor Changes

- 77a0583: Decision pass before Phase 3 — AA-tuned subtle ink, warm scrim, shell rails.

  **`--ornie-text-subtle` retuned instead of avoided.** New sand steps `450` (#9c8f7e, dark) and `550` (#75685a, light) make the quiet third ink hold WCAG AA 4.5:1 on every ground (surface, bg, sunken) in both themes at any text size. Metadata (MetaLine), section labels and trailing counts (ListSection), done task titles, and field placeholders return to `text-subtle` per the mockups — the muted-everywhere workaround from Phase 1/2 is reverted. The contrast audit now holds subtle to the full 4.5 bar on three grounds.

  **Dark scrim is warm again**: `--ornie-overlay` dark is sand-1000 @ 55% (was pure black @ 55%) — "deep warm browns, never pure black" is a theme principle; the roadmap's 55% opacity stands.

  **Chip gains `disabled`** (dims, disables action and × buttons); ChipGroup now forwards it per option instead of rendering inert lookalikes, and its roving tabindex skips disabled buttons.

  **ProgressRing inner disc is themeable in place**: `--ornie-progress-ring-disc` (defaults to `--ornie-surface`) lets sunken contexts (SidebarNav rail, Phase 3) blend the disc without new props.

  **Shell rails for Phase 3:** z-layer tokens `--ornie-z-dock: 100`, `--ornie-z-drawer: 800`, `--ornie-z-sheet: 900` (under modal 1000), and the runtime contract variable `--ornie-keyboard-inset: 0px` — the app sets it from the keyboard APIs; Sheet adds it to `env(safe-area-inset-bottom)`.

- 4f59700: Phase 0 — rails: token pipeline, missing semantic tokens, audits, tier folders.

  **Token pipeline (D-44).** `tokens.json` is now the single source of truth. `pnpm tokens` regenerates `src/styles/tokens.css`, `tokens/Tokens.swift` and `tokens/Tokens.kt`; the CSS file is generated output and must never be hand-edited.

  **New semantic tokens** (both themes, AA-audited): `--ornie-hover`, `--ornie-selected`, `--ornie-track`, `--ornie-done`, `--ornie-surface-inverse`, `--ornie-text-inverse`, `--ornie-tone-{river,fur,moss,clay,stone}` (+ `-ink`), motion tokens `--ornie-duration-quick` (120ms), `--ornie-duration-gentle` (220ms), `--ornie-ease-out`, `--ornie-ease-inout`. All duration tokens collapse to 1ms under `prefers-reduced-motion` in the token layer, so components never write that media query themselves.

  **Focus ring convention.** `--ornie-focus-ring` is now a color (river-500 light / river-300 dark), applied as `outline: 2px solid` with 2px offset on every interactive component — previously it was a box-shadow value. If you consumed `--ornie-focus-ring` as a shadow, switch to the outline pattern. Error-state fields now keep the standard focus ring (focus is identical everywhere); `--ornie-focus-ring-danger` is deprecated.

  **Deprecations (kept working until 0.3.0):** `--ornie-inverse-surface` → `--ornie-surface-inverse`, `--ornie-inverse-text` → `--ornie-text-inverse`, `--ornie-duration-fast` → `--ornie-duration-quick`, `--ornie-duration-normal` → `--ornie-duration-quick`/`gentle`, `--ornie-ease` → `--ornie-ease-out`, `--ornie-focus-ring-danger`.

  **Overlay recalibrated** to the final app designs: light scrim sand-900 @ 40%, dark scrim black @ 55%.

  **Dark-mode discipline (D-67).** Avatar's decorative tones moved to theme-resolving semantic tokens (`--ornie-tone-*`); component CSS now contains zero `[data-ornie-theme]` selectors — CI-enforced by `pnpm audit:tokens` alongside the no-hex and raw-scale rules. `pnpm audit:a11y` (axe over variant grids) and `pnpm audit:contrast` complete the gate set.

  **Tier folders.** Source moved to `src/primitives/` (the existing 12), with `src/patterns/` and `src/shells/` opened for the roadmap; foundations folderized. Package exports are unchanged — flat `OrnieReact.Button`-style API, no import path changes for consumers.

  **Icons (decision, Phase 1 executes):** ~44 glyphs curated from Lucide (ISC), stroke 1.9, round caps/joins, renamed to plain nouns.

- d352866: Phase 1 — primitives: 8 new components, 46-glyph icon set, 12 upgrades, variant-grid infrastructure.

  **New primitives.** `Icon` (+46 tree-shakeable named exports like `IconCheck` — curated from Lucide (ISC) at dev time, stroke 1.9, round caps/joins, plain Ornie nouns; `Icons` foundation gallery), `IconButton` (sizes 32/40/44, ghost/outline/filled, `aria-label` required at the type level), `Chip` (the interactive pill: `selected`/`onSelect`, `onRemove` as a sibling button, `leading` slot, ≥44px touch hit-slop), `Kbd` (`keys={['⌘','K']}` key caps, `onInverse` for tooltip use), `Spinner` (quiet ring; pauses — never strobes — under reduced motion; no full-page spinner exists in Ornie, D-23), `ProgressRing` (conic, value 0–1, sizes 16/24/46, center slot; base of DayRing), `Divider` (hairline, inset presets, both orientations), `Link` (accent/muted text link), `TextArea` (Input's multiline sibling).

  **Upgrades.** Button: `leading`/`trailing` slots (`iconStart`/`iconEnd` deprecated), `loadingLabel` gives loading buttons an accessible name, spin/motion tokens, touch hit-slop. Input/Select: `leading`/`trailing` slots inside the field frame. Checkbox: `indeterminate` re-applied on every render, `description` wired to `aria-describedby`. Radio: new `RadioGroup` (fieldset semantics, controlled `value`/`onChange`, orientation). Switch: `label`/`description` slots, control-on-the-right settings-row default. Badge: `count` mode (tabular-nums, `max`→"99+", `count={0}` renders nothing; danger counts coerce to neutral — counts never shout). Avatar: **new size scale xs 20 / sm 28 / md 36 / lg 44 / xl 56** (was 24–64). Card: `variant="flat|elevated|sunken"`, **padding presets remapped to 0/12/16/24** (was 0/16/24/32), `spine` accent edge, `interactive` (renders button/a). Modal: sizes 400/**540**/680, `placement="center|top"`, `initialFocus`, full focus trap + return, fade-only entrance. Tabs: `size sm/md` (`defaultIndex` deprecated — controlled only). Tooltip: `kbd` shortcut caps, controlled `open`.

  **Deprecations (removed in 0.3.0):** `Button.iconStart/iconEnd` → `leading`/`trailing` · `Card variant="outlined"` → `flat` · `Modal.closeOnOverlayClick` → `dismissible` · `Tabs.defaultIndex` → `index`+`onChange`.

  **Visual changes to review:** Avatar sizes, Card paddings, Modal md 520→540, Switch labelled mode now places the control on the right, Select/Input placeholder ink `text-subtle`→`text-muted` (AA in dark).

  **Tokens:** new `--ornie-accent-text-hover` (link hover ink, AA both themes), `--ornie-duration-spin` + `--ornie-spin-state` (continuous motion pauses under reduced motion).

  **Infrastructure.** Every component now ships impl + CSS + stories + `.prompt.md` + a both-themes variant grid (`<Name>.html`); `pnpm build:grid` bundles the grid harness; `pnpm audit:a11y` runs axe over all 21 grids (green), waiting out entrance animations before measuring. `pnpm icons` regenerates the glyph set from the curation map.

- c16c3c2: Phase 2 — patterns: the task language. 14 new components in the patterns tier.

  **The task cluster.** `TaskCheck` (23px ø completion circle, checkbox semantics, check draws in over `--ornie-duration-gentle` — instant under reduced motion), `TaskRow` (TaskCheck · title · MetaLine · trailing; `density="phone|desktop"`; states `done`/`waiting`/`resurfaced` — **overdue is not a state, there is no red**; resurfaced renders a quiet "back for a look" chip, R-3), `MetaLine` (11.5px metadata run with automatic `·` separators, tail-first truncation), `ProjectDot` (6px identity dot on the new `--ornie-project-*` semantic tokens — five muted mids, theme-retargetable), `DayRing` (46px ring, remaining count or resting otter-dot; the API cannot express streaks or red, R-5).

  **List chrome.** `ListSection` (10.5 caps label, owns hairline separators, `surface="plain|card"`), `ListRow` (leading/title/description/trailing slots, both densities, interactive button/a rendering; settings/person/note/module recipes documented, not minted as components), `DateGroupHeader` (11px caps accent kicker, sticky-capable; the DS formats no dates).

  **Forms.** `FormField` (label + any control + help/error; `htmlFor`/`aria-describedby` injection with a single-child contract, group mode for composites; calm validation copy — no exclamation marks), `SearchField` (search icon + clear button + `⌘/`-style Kbd hint; string-first `onChange`, Escape clears).

  **Selection.** `SegmentedControl` (2–4 exclusive options, radiogroup semantics, arrows move and select; quiet background swap, no sliding thumb), `ChipGroup` (single/multi Chip selection, roving tabindex, 8px wrap).

  **Feedback.** `EmptyState` ("name what is" copy rules baked into the docs), `Toast` + `ToastProvider`/`ToastHost`/`useToast` (bottom-centered on `--ornie-surface-inverse`, max one visible with a queue, 8s auto-dismiss paused on hover/focus, `aria-live="polite"` — nothing in Ornie is assertive; the "Done · Undo" single-action pattern, D-50).

  **Tokens:** `--ornie-project-river/moss/clay/fur/rust`, `--ornie-z-toast: 1200`.

  **AA over mockup fidelity (sanctioned by the roadmap):** small text (10.5–13px section labels, metadata, placeholders) uses `--ornie-text-muted` where the mockups used `--ornie-text-subtle` — subtle is 3.57:1 in dark, failing WCAG AA at small sizes. Subtle remains for ≥15px text and non-text graphics.

  All 35 variant grids (light + dark) pass axe; TaskRow/TaskCheck verified against the 2a mockup in both densities.

- d417e34: Phase 3 — shells: app chrome. 8 new components in the shells tier.

  **Mobile.** `Sheet` (D-68: scrim + bottom panel, grabber, heights `half`/`tall`/`content`, focus trap + Esc + scrim tap + focus return, keyboard-safe bottom padding via `env(safe-area-inset-bottom)` + the new `--ornie-keyboard-inset` contract token; untitled sheets get an accessible-name fallback), `Dock` (84px bar on surface-sunken, ≤4 nav items + raised 54px capture button with the 4px page-background ring; quiet neutral badge counts; safe-area aware).

  **Desktop frame.** `SidebarNav` + `SidebarGroup` + `SidebarItem` (264px expanded / 60px rail, `--ornie-selected` active wash + accent ink, quiet count badges, ProjectDot/mini-ProgressRing project rows with the ring disc blended into the rail, built-in right tooltips with Kbd hints in rail mode), `TopBar` (52px, leading/title/trailing, `scrolled` hairline fade).

  **Overlays.** `PanelDrawer` (372px right panel; `mode="inline"` renders an `<aside>` landmark in flow, `mode="overlay"` renders a dialog over the scrim at `--ornie-z-drawer` with the full focus contract; header/footer slots per the Ask panel), `CommandOverlay` (the ⌘K/⌘/ surface composing Modal `placement="top"`: borderless input row, managed `items`/`renderItem`/`onSelect` with combobox/listbox semantics and roving active row, Kbd hint footer; **no search logic** — the app queries SQLite, D-23; widths 540 capture / 560 find).

  **Compositions.** `PageHeader` (kicker · greeting/view title · trailing slot — 25px phone/29px desktop greeting per the mockups), `TriageCard` (D-68: Card spine + captured text + source MetaLine + decide ChipGroup + "3 of 7" ProgressRing footer; `onDecide` fires per pick, swipe stays app-side).

  **Modal (additive):** `container` prop (portal target — embedding/tests/grids) and `flush` (edge-to-edge body) — both for CommandOverlay composition. Sheet and PanelDrawer share the same `container` escape hatch.

  **Token change:** dark `--ornie-selected` deepened river-700 → river-800 so `--ornie-accent-text` holds 4.5:1 on the selected wash (sidebar active items) — pair added to the contrast audit.

  All 43 variant grids pass axe (three real fixes along the way: dialog naming on untitled sheets, keyboard-focusable scrollable bodies, listbox semantics dropped for empty result sets, `role="dialog"` moved off `<aside>`). Dock/Sheet verified against the 2a/2b mockups; SidebarNav/TopBar/CommandOverlay against the desktop mockup; PanelDrawer inline vs overlay both demonstrated in its grid.

- b18a738: Phase 4 — content, vault, release pass. 6 new components + foundations + docs.

  **Content.** `Prose` (reading typography for rendered notes/journal: h1–h3 on the type scale, 15/1.65 body, calm lists/quotes/code; bare anchors get Link's voice via `a:not([class])` — classed components keep their own; no max-width, width is the app's; renderers must set `tabindex="0"` on `pre` for keyboard scrolling), `WikiLink` (the [[link]] pill: accent-subtle wash, radius-full, wraps as rounded fragments; `unresolved` = dashed border, an invitation — never an error).

  **Vault & progress.** `SealBadge` (lock + "Sealed" chip; `detail` variant lists what sealing skips), `RedactedBars` (deterministic-per-`seed` concealment bars — deliberately NOT a skeleton loader, no shimmer ever), `WeekDots` (7 habit dots: done fill, quiet misses, ringed today, dashed futures — **the API cannot express a streak count, R-5**), `StepDots` (onboarding dots, active elongates to a pill on `--ornie-duration-gentle`).

  **Foundations.** New `Motion` reference card (the whole vocabulary: two durations, two eases, one spin — and the reduced-motion story); `DarkMode` sampler extended with the 0.2.0 task language (TaskRow, MetaLine, ProjectDot, Chips, Kbd).

  **Release pass.** Coverage matrix re-walked top to bottom: every mockup element maps to a component or an explicit app-side note (one flagged follow-up: a large ProgressRing size for the app-composed focus screens). README rewritten as the public integrator doc (stability contract, theming contract, calm rules, native token targets).
