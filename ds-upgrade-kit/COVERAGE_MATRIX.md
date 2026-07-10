# COVERAGE_MATRIX.md — every screen → its components

The "maximum coverage" guarantee: walk the final layouts screen by screen; every visual element maps to a library component or an explicit **[app]** note (screen-level composition the app owns). Re-run this checklist before cutting 0.2.0 — any element with no mapping is a roadmap gap.

Screen ids = cards in `reference/Ornie Mobile Final.dc.html`; `D:` = views in `reference/Ornie App Final.dc.html`.

## Phone — locked core (D-68)

- **2a Today** — PageHeader(greeting) · DayRing · IconButton(sparkle) · ListSection · Card(spine) "RIGHT NOW" · TaskRow + TaskCheck + MetaLine + ProjectDot · ListRow(habit recipe) + WeekDots · Card(close-day) · Dock · Badge(count on dock)
- **2b Capture** — Sheet(half) · Input(lg) · ChipGroup + Chip(parse chips, removable) · Button(lg primary) · Kbd(none on phone) · [app] keyboard inset wiring
- **2c Triage** — TriageCard (Card spine + MetaLine + ChipGroup + ProgressRing 16) · IconButton(skip) · [app] swipe gesture → onDecide
- **2d Tablet base** — SidebarNav(rail mode) · TopBar · ListSection/TaskRow at desktop density · PanelDrawer(inline) · DayRing

## Phone — secondary views

- **2e Upcoming** — DateGroupHeader · TaskRow · MetaLine(time-first) · ListSection · [app] timeline gutter
- **2f Anytime / 2g Someday** — SearchField · ChipGroup(filters) · ListSection · TaskRow · EmptyState
- **2h Logbook** — DateGroupHeader · TaskRow(state=done) · EmptyState
- **2i Trash** — ListRow · Button(danger, confirm via Modal) · EmptyState
- **2j Habits** — ListRow(habit recipe) · WeekDots · SealBadge(never) · copy: "resumed" (R-5)
- **2k People** — Avatar · ListRow(person recipe) · TaskRow(state=waiting) · Badge
- **2l Journal** — Card · Prose · SealBadge · DateGroupHeader · Button(ghost prompt)
- **2m Pages** — Card grid · ListSection · Badge · WikiLink · [app] block layout (block schema is @ornie/core, D-62)
- **2n Modules hub** — ListRow(module recipe) + Switch · Tabs · Badge · EmptyState

## Phone — supplement

- **1l Task detail** — Sheet(tall) · FormField × n · Select · Chip(tags) · SegmentedControl(energy) · TaskCheck · ListRow(subtask recipe) · SealBadge(if vaulted) · Divider
- **1m Focus** — [app screen] composed from: ProgressRing(lg) · Button(ghost) · TaskRow(minimal) — no dedicated FocusScreen component
- **1n Close the day** — [app screen]: PageHeader · TaskRow · DayRing · Button · Toast(undo)
- **1o/1p/1q Notes** — SearchField · ListRow(note recipe) · DateGroupHeader / Prose + WikiLink / [app] editor (toolbar = IconButtons)
- **1r/1s Projects** — ListRow(project recipe) + ProgressRing(16) · PageHeader(view) · ListSection · TaskRow
- **1t Browse** — SearchField · ListSection · ListRow(nav recipe) + Badge(count)
- **1u Ask sheet** — Sheet(tall) · Prose(response) · Chip(action chips) · SegmentedControl(local/cloud) · Input · [app] conversation state
- **1v Settings** — ListSection · ListRow(settings recipe) · Switch · SegmentedControl(appearance) · Badge · Card(plan) · Button
- **1w/1x iOS vs Android** — same components; [app] platform seams (predictive back, share target) per D-03
- **1z Tablet overlay** — PanelDrawer(mode=overlay) · Sheet-as-centered-Modal · TopBar
- **1aa Widgets / 1ab Lock screen / 1ac Share sheet** — **native slivers: tokens only via Tokens.swift/Tokens.kt (D-44/D-45); no React components**

## Desktop (Ornie App Final)

- **Frame** — SidebarNav(expanded/rail) · TopBar · PanelDrawer(inline, Ask) · [app] content column 640
- **D:Today** — PageHeader(greeting) · DayRing · Card(spine) · ListSection · TaskRow(desktop) · EmptyState(evening)
- **D:Inbox** — TriageCard · TaskRow · Button
- **D:Upcoming / Anytime / Someday / Logbook / Trash** — DateGroupHeader · TaskRow · SearchField · ChipGroup · EmptyState · Modal(confirm empty-trash)
- **D:Projects / project view** — ListRow(project) · ProgressRing · PageHeader · ListSection · TaskRow
- **D:Notes** — SearchField · ListRow(note) · Prose · WikiLink
- **D:Pages** — Card grid · [app] block layout
- **D:People** — Avatar · ListRow(person) · TaskRow(waiting)
- **D:Habits** — ListRow(habit) · WeekDots
- **D:Journal** — Card · Prose · SealBadge · DateGroupHeader
- **D:Modules hub / GitHub / Calendar** — ListRow(module) · Switch · Tabs · Badge · MetaLine · EmptyState · [app] module content from block schema
- **D:Quick capture (⌘K)** — CommandOverlay(540) · Input · Chip(parse) · Kbd footer
- **D:Quick Find (⌘/)** — CommandOverlay(560) · SearchField-style input · ListRow(result recipe) · Kbd
- **D:Ask panel** — PanelDrawer(inline 372) · Prose · Chip · SegmentedControl(local/cloud) · Input
- **D:Focus / Close day / Onboarding** — [app screens]: ProgressRing(lg) · Button · TaskRow · StepDots · PageHeader · Toast
- **D:Settings** — ListSection · ListRow(settings) · Switch · SegmentedControl · RadioGroup · Card(plan) · Kbd(shortcut list) · FormField
- **D:Mobile companion / SDK view** — Card · Prose · Kbd · Link · Badge

## Burrow (hub §04)

- **Locked** — PageHeader(view) · Icon(lock, 26 in 64 wash circle) · Input(passphrase) · Button(primary) · ListRow(Face ID recipe) · ListSection("SEALED · 3 ENTRIES") · RedactedBars · SealBadge
- **Open** — countdown MetaLine · Card(entries) · Prose · SealBadge(detail) · ListSection(settings) · ListRow + Switch · [app] auto-seal timer

## Toasts & system moments (cross-cutting)

- Undo after complete/delete ("Done · Undo") — Toast (single action, 8s)
- Export ready / device added — Toast
- Sync pending (rare, cloud ops only) — Spinner in TopBar trailing slot, never a page blocker (D-23)

## Explicitly app-side (never DS)

Swipe/drag gestures · keyboard-inset measurement · SQLite live queries + search logic · conversation state · block-schema rendering logic (schema lives in @ornie/core, D-62) · focus/close-day/onboarding flow orchestration · platform seams (D-03) · Live Activity / widget layouts (native, tokens only).
