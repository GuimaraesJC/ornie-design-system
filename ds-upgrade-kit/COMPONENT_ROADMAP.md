# COMPONENT_ROADMAP.md — from 12 components to the full Ornie library

Derived by walking every screen of the final layouts (`reference/Ornie Mobile Final.dc.html`, `reference/Ornie App Final.dc.html`, `reference/SPECS.md`). Goal: the app repo (and external builders) compose everything from here; nothing visual gets invented app-side except screen layout.

**Tiers** (atomic design, renamed in plain Ornie nouns — D-40):

- `foundations` — tokens + living reference pages (exists)
- `primitives` — one job, one control (= atoms)
- `patterns` — small compositions with light logic (= molecules)
- `shells` — app chrome and overlay surfaces (= organisms)

**Phases** = build order = one Claude Code session each. Every item cites the mockup screens that prove it's needed (ids like `2a`, `1l` = mobile canvas cards; `D:` = desktop views).

Status legend: **NEW** = doesn't exist · **UPG** = exists at 0.1.0, needs the listed upgrades.

---

## Phase 0 — Rails: tokens, audit, folders, icons decision

The mockups needed a `--dm-*` bridge variable set on top of the shipped tokens — that bridge is a list of **missing semantic tokens**. Promote them into `tokens.json` (Layer 2, both themes), regenerate CSS/Swift/Kotlin:

| New semantic token | Purpose (evidence) | Light | Dark |
|---|---|---|---|
| `--ornie-hover` | Row/item hover wash (`--dm-hover`) | sand-50 | sand-800 |
| `--ornie-selected` | Selected row / text selection wash (`--dm-selection`) | river-100 | river-700 |
| `--ornie-track` | Progress tracks, placeholder bars, rails (`--dm-track`, `--dm-soft`) | sand-100 | sand-700 |
| `--ornie-done` | Completed-state ink/wash — core product state (`--dm-done`) | river-300 | river-600 |
| `--ornie-surface-inverse` | Toast/badge dark-on-light surfaces (`--dm-badge-bg`) | sand-900 | sand-100 |
| `--ornie-text-inverse` | Ink on inverse surfaces (`--dm-badge-ink`) | #fff | sand-900 |
| `--ornie-overlay` | Modal/sheet scrim wash | sand-900 @ 40% | black @ 55% |
| `--ornie-focus-ring` | The one focus outline everywhere | river-500 | river-300 |
| `--ornie-duration-quick` / `--ornie-duration-gentle` | 120ms / 220ms; **collapse to 1ms under `prefers-reduced-motion`** (media query in the token layer, so every component inherits it) | — | — |
| `--ornie-ease-out` / `--ornie-ease-inout` | cubic-beziers, defined once | — | — |

Exact light/dark values: match the `--dm-*` assignments in the reference files' `<style>` blocks; adjust only if the AA audit fails.

Also in Phase 0:

1. **Audit scripts** (CI + local): `audit:tokens` — fail on any hex or un-commented raw-scale var in `components/**/*.css`; fail on any `[data-ornie-theme]` selector in component CSS. `audit:contrast` — check every semantic ink/surface pair AA in both themes. `audit:a11y` — axe pass over every variant grid.
2. **Tier folders** — create `primitives/ patterns/ shells/`, move the 12 existing components into `primitives/` (Card, Modal, Tabs → keep in `primitives/` for path stability or move to `shells/`? Decision: **Card, Modal, Tabs stay primitives** — they're leaf surfaces; the new app chrome goes in `shells/`). Keep flat public exports (see CLAUDE.md).
3. **Both-themes variant grid template** — every grid renders the full variant matrix twice, light and dark, side by side (see `templates/COMPONENT_TEMPLATE.md`).
4. **Icons decision (advisory, sanctioned):** curate ~44 glyphs from **Lucide** (ISC license), re-export as Ornie icons: stroke locked at 1.9, round caps/joins, renamed to plain nouns where Lucide's name is jargon. Inventory in Phase 1. Alternative (slower): hand-draw to the same spec — only if licensing posture changes.

**Done-when:** tokens regenerated in all 3 targets · audits wired into CI and passing on the existing 12 components (fix violations they surface) · folders moved with no consumer-visible API change · 0.1.x changeset cut.

---

## Phase 1 — Primitives (12 upgrades + 8 new)

### Button — UPG
Sizes `sm 32 / md 40 / lg 48` (lg = mobile sheet primary); `leading`/`trailing` icon slots; `loading` (Spinner replaces leading slot, width locked); `fullWidth`. Keep variants `primary/secondary/ghost/danger`. Docs: one primary per view; `danger` only for destructive confirmation. Used: everywhere (2b, 1l, 1n, D:capture, D:settings…).

### IconButton — NEW
Icon-only button; sizes `32/40/44`; variants `ghost/outline/filled`; `aria-label` **required prop** (TS-enforced). Used: Ask sparkle (2a header), sheet close ×, top-bar actions, editor toolbar (1q).

### Input — UPG
Sizes; `leading` icon slot; `trailing` slot (clear, kbd hint); error state (paired with FormField); `multiline` prop or sibling `TextArea` (pick one — recommend separate `TextArea`, same skin); passthrough `inputMode`/`enterKeyHint` for mobile sheets. Used: 2b capture, 1v, D:quick-capture, Burrow passphrase.

### Select — UPG
Stays native `<select>` under the skin (a11y for free); add sizes + leading icon. Custom listbox is a **non-goal** until a real need appears. Used: 1l fields, D:settings.

### Checkbox — UPG
`indeterminate`; `description` slot. Note: task completion does NOT use Checkbox — that's TaskCheck (Phase 2). Used: D:settings, checklists in 1l.

### Radio — UPG
Add `RadioGroup` (name wiring, orientation, described-by). Used: D:settings, theme picker.

### Switch — UPG
`label`/`description` slots with correct label placement (control on the right in settings rows). Used: 1v, D:settings, Burrow auto-seal.

### Badge — UPG
Add `count` mode (numeric, max→"99+", tabular-nums) for sidebar/dock counts. Counts are informational, never alarm-colored — default neutral, `variant="accent"` opt-in. Used: D:sidebar, 2n, dock inbox dot.

### Avatar — UPG
Sizes `xs 20 / sm 28 / md 36 / lg 44 / xl 56`; auto-initials from `name`; image with graceful fallback. Presence dot deferred (sharing ships later — D-17). Used: 2k, D:people, share-later surfaces.

### Card — UPG
Padding presets `none/sm/md/lg`; `variant="flat|elevated|sunken"`; `spine` prop (4px accent left edge — the RIGHT NOW card, 2a); `interactive` (hover wash `--ornie-hover`, focus ring, renders as button/a when `onClick`/`href`). Used: everywhere.

### Modal — UPG
Sizes `sm 400 / md 540 / lg 680`; `placement="center|top"` (top = command-overlay position, 12vh from top); `initialFocus` ref; focus trap + Esc + scrim close (scrim = `--ornie-overlay`). Used: D:quick-capture, D:quick-find (via CommandOverlay), confirmations.

### Tabs — UPG
`size sm/md`; keep underline style. Segmented choices are SegmentedControl, not Tabs — document the boundary. Used: 2n hub, D:module views.

### Tooltip — UPG
`kbd` prop — renders label + Kbd caps ("Quick Find ⌘/"). Never required for understanding (a11y: same info reachable elsewhere). Used: D:top bar, D:sidebar rail.

### Icon (+ icon set) — NEW
`<Icon name size={16|20|24} />` + individual exports (`<IconCheck />`) for tree-shaking. ~44 curated glyphs (see Phase 0 decision): check, circle, plus, sparkle (Ask), inbox, sun (today), calendar (upcoming), layers (anytime), archive (someday), book (logbook), trash, folder (project), note, pen, journal, repeat (habits), person, users, gear, lock, unlock, key, shield, search, command, chevron-left/right/up/down, arrow-up-right, dots-horizontal, x, clock, bell, zap (energy), tag, link (wikilink), grid (pages), puzzle (modules), download (export), upload (import), eye-off, moon, monitor, timer, flag. Foundations gets an `Icons` gallery card.

### Kbd — NEW
Key caps for shortcuts (⌘K, ⌘/, ⌥Space, ↵, esc). 11px caps on `--ornie-surface-sunken`, border, radius-xs; `keys={['⌘','K']}` grouping. Used: D:tooltips, CommandOverlay footer, D:settings shortcuts.

### Chip — NEW
The interactive pill (Badge is static, Chip is tappable): `selected`, `onSelect`, `onRemove` (× affordance), `leading` slot (icon/dot); sizes `sm 24 / md 32`; ≥44px touch target via invisible hit-slop on mobile. Used: 2b parse chips, 2c triage chips, 1l tags, 1u Ask action chips.

### Spinner — NEW
Quiet indeterminate ring, `--ornie-text-subtle`, sizes 14/18/24. No full-page spinner exists in Ornie (D-23: local reads are instant) — docs must say so; use for Button loading + sync/cloud-Ask pending only.

### ProgressRing — NEW
Determinate conic ring, `value 0–1`, sizes 16/24/46, `trackColor` defaults `--ornie-track`, optional center slot. Base of DayRing; the 16px size is the project mini-ring (D:sidebar projects, 1r).

### Divider — NEW
Hairline `--ornie-border-subtle`; `inset` presets matching row paddings; vertical orientation. Used: list rows everywhere.

### Link — NEW
Text link: `--ornie-accent-text`, hover → river-800-equivalent semantic, visible focus; `muted` variant. (Wikilink pill is Phase 4's WikiLink, built on this.) Used: settings, docs surfaces, empty-state help lines.

**Done-when:** all 20 pass the ten-point definition of done · audits green · grids show light+dark for every variant.

---

## Phase 2 — Patterns: the task language

### TaskCheck — NEW
The 23px ø 2px-stroke completion circle (SPECS). States: empty → hover (ring tint) → done (fill `--ornie-done`, check draws in `--ornie-duration-gentle`; instant under reduced motion). Sizes: `md 23` (phone), `sm 20` (desktop density). It is a button with `role="checkbox"` semantics + label from the row title. Used: every task row in the product.

### TaskRow — NEW (the most-used component in Ornie)
Anatomy: TaskCheck · title (15/medium) · MetaLine · trailing slot (chevron / drag handle / SealBadge). Props: `task`-shaped fields or explicit props; `density="phone|desktop"` (12px vs 8px vertical padding); `state="default|done|waiting|resurfaced"` — done = title struck in `--ornie-text-subtle`, wash `--ornie-done`; waiting (person) = person chip in meta; **resurfaced** (R-3) = quiet "back for a look" chip, accent-subtle, never a warning color. **Overdue is not a state — there is no red.** Swipe/drag are app-side; the row only exposes slots + callbacks. Used: 2a/2e/2f/2g/2h, 1s, D:everywhere.

### MetaLine — NEW
The 11.5px metadata run: time · ProjectDot+name · tags · estimate · repeat glyph. Children-based (`<MetaLine>` takes fragments, inserts · separators, truncates single-line with title-first priority). Used: TaskRow, NoteRow recipes, 2e timeline.

### ProjectDot — NEW
6px round identity dot, color from a small fixed set of muted project colors (moss/clay/river/fur/rust **wash levels**, defined as semantic aliases so themes can retarget); `label` option. Used: MetaLine, D:sidebar, 1r/1s.

### ListSection — NEW
Section label (10.5 caps, +1px tracking, `--ornie-text-subtle`) + optional trailing count/action + children rows on `--ornie-surface` card or plain; hairline separators between rows (owns the Dividers so consumers don't hand-place them). Used: every list screen.

### ListRow — NEW
Generic row: `leading` / `title` / `description` / `trailing` slots, min-height 44 (phone) / 36 (desktop), optional chevron, `interactive` hover/focus states. Recipes documented in prompt.md (NOT separate components): settings row (icon + title + Switch/value + chevron), person row (Avatar + name + waiting-count), note row (title + snippet + date), module row (icon + name + toggle). Used: 1v, 2k, 1o, 2n, Burrow settings, D:settings.

### DateGroupHeader — NEW
"FRIDAY, JULY 3" (11 caps accent kicker) with relative naming rules (Today/Tomorrow/weekday/date) documented; sticky-capable. Used: 2e, 2h, 1o, D:upcoming/logbook.

### FormField — NEW
Label (13/semibold) + control + help/error line; wires `htmlFor`/`aria-describedby`; error ink `--ornie-danger-text` with plain-words message conventions (no exclamation marks — calm applies to validation too). Used: 1l fields, 1v, D:settings, Burrow setup.

### SearchField — NEW
Input + leading search icon + clear IconButton + optional trailing Kbd hint (⌘/). Used: 1t, D:quick-find trigger, D:top bar, notes list.

### SegmentedControl — NEW
2–4 exclusive options, pill track on `--ornie-surface-sunken`, thumb on `--ornie-surface`; radiogroup semantics; sizes sm/md. Used: appearance Light/Dark/System (1v, D:settings), density toggles, 2e scope.

### ChipGroup — NEW
Manages Chip selection (single/multi), wrap layout with 8px gap, roving tab index. Used: 2c triage targets, 1l tags, capture parse row.

### EmptyState — NEW
Icon slot (24px, `--ornie-text-subtle`) · title (15/semibold) · one-sentence body (`--ornie-text-muted`) · optional single Button. Copy rules in prompt.md: name what *is* ("Inbox is clear"), never scold, no illustrations-of-sadness. Used: every list's empty case; 2i, D:trash, D:logbook-empty.

### Toast — NEW
Bottom-centered quiet toast on `--ornie-surface-inverse`/`--ornie-text-inverse`; single action slot (the "Done · Undo" pattern — undo = inverse op, D-50); auto-dismiss 8s with timer pause on hover/focus; max one visible (queue, don't stack); enters/leaves with fade+4px rise in `--ornie-duration-gentle`. Includes `useToast()` + `<ToastHost>`. Used: undo everywhere, export-ready, device-added.

### DayRing — NEW
ProgressRing 46px preset + center count or otter-dot; the header ritual object (SPECS: conic fill, 37px inner disc). `value = done/planned`; **never turns red, never shows streaks** — a missed day just starts at 0 ("resumed", R-5). Used: 2a/2d headers, D:top bar, 1n summary.

**Done-when:** ten-point done ×14 · TaskRow/TaskCheck reviewed against 2a mockup pixel-for-pixel in both densities · audits green.

---

## Phase 3 — Shells: app chrome

### Sheet — NEW
Mobile overlay surface (D-68: capture is a half sheet): portal + `--ornie-overlay` scrim; heights `half|tall|content`; 36×4 grabber; header slot (title + close IconButton); keyboard-safe bottom padding (env(safe-area) + keyboard inset var the app supplies); focus trap, Esc, scrim-tap close; controlled (`open`/`onClose`). Reduced motion: fade instead of slide. Used: 2b capture, 1l task detail, 1u Ask (phone), share-sheet-adjacent flows.

### Dock — NEW
Mobile bottom nav (SPECS): 84px on `--ornie-surface-sunken`, top border, 5 slots, safe-area aware; center slot = raised capture button (54px ø, lifted −26px, 4px bg ring, `--ornie-shadow-md`); items = icon 24 + 10.5px label, active `--ornie-accent-text`, inactive `--ornie-text-subtle`; optional quiet count Badge on a slot. API: `items=[{icon,label,active,onSelect,badge?}]` + `capture={onPress}`. Used: every phone screen.

### SidebarNav — NEW
Desktop sidebar (SPECS): expanded 264 / rail 60, on `--ornie-surface-sunken`; sections: header slot (workspace/greeting) · nav groups (`SidebarItem`: icon 18 + label 13.5 + count Badge) · projects group (ProjectDot or 16px ProgressRing + name) · footer slot (settings, plan). Collapse control persists app-side; component just takes `collapsed`. Active item: `--ornie-selected` wash + accent ink. Tooltip-on-rail built in (label + kbd). Used: D:all views, 2d/1z tablet rail variant (`rail` mode).

### TopBar — NEW
52px bar: view title (17/semibold) · leading slot (collapse toggle, back) · trailing actions (IconButtons, DayRing, Ask trigger); optional bottom hairline on scroll (`scrolled` prop). Used: D:all views, tablet.

### PanelDrawer — NEW
Right side panel, 372px, own left border, header (title + close), scrollable body; `mode="inline|overlay"` — inline pushes content (desktop), overlay floats over wash (tablet, 1z). Controlled. Used: D:Ask panel, 1z, future detail panels.

### CommandOverlay — NEW
The ⌘K/⌘/ surface: Modal `placement="top"` composition — input row (Input lg, no border, leading icon) · results list slot (ListRow recipes) · footer bar of Kbd hints ("↑↓ navigate · ↵ open · esc close"). Provides roving selection + type-ahead wiring (`items`, `onSelect`, `renderItem`) but **no search logic** — the app queries SQLite (D-23). Widths: 540 capture / 560 find (props). Used: D:quick-capture, D:quick-find; phones use Sheet instead.

### PageHeader — NEW
The greeting/title block: kicker (11 caps accent — date or section) · title 25–29/bold · trailing slot (DayRing, Ask sparkle IconButton, view controls). `variant="greeting|view"`. Used: 2a, all phone list screens, D:content headers.

### TriageCard — NEW
Inbox triage unit (D-68): Card `spine` + captured text (16/medium) + source MetaLine ("via share sheet · 2h ago") + ChipGroup (Today · This week · Someday · project…) + progress footer ("3 of 7", ProgressRing 16). Swipe is app-side: component exposes `onDecide(target)` and a `swipeHint` affordance visual only. Used: 2c, D:inbox triage mode.

**Done-when:** ten-point done ×8 · Dock/Sheet verified against 2a/2b mockups · SidebarNav/TopBar/CommandOverlay against desktop mockup · PanelDrawer inline vs overlay demos in grid.

---

## Phase 4 — Content, vault, release

### Prose — NEW
Reading typography wrapper for notes/journal (1p): h1–h3, paragraphs 15/1.65, lists, quotes, code (ui-monospace), `a` styled as Link, `[[wikilink]]` rendered via WikiLink. Max-width 640 built in? **No** — width is the app's; Prose only styles content.

### WikiLink — NEW
The [[link]] pill: accent-subtle wash, accent-text ink, radius-full, hover raises wash; `unresolved` state (dashed border — target note doesn't exist yet). Used: 1p/1q, journal, D:notes.

### WeekDots — NEW
7 quiet dots for habit history (1j/2j): filled `--ornie-done`, empty `--ornie-track`, today ring. **No streak count prop exists** — the API literally cannot express a streak (R-5 enforced by design). Used: habit rows, 1n summary.

### SealBadge — NEW
Burrow chip: lock glyph 10px + "Sealed", accent-subtle; `detail` variant appends "skips Ask · webhooks · search" in `--ornie-text-subtle`. Used: Burrow entries, 1l when a task is vaulted, D:journal.

### RedactedBars — NEW
Sealed-content placeholder: 2–3 rounded bars (`--ornie-track`, 7px, varied widths via `seed` so lists look organic, deterministic per item). Used: Burrow locked list, notification previews when locked.

### StepDots — NEW
Onboarding progress: n dots, active elongates to pill; `--ornie-duration-gentle`. Used: D:onboarding, first-run mobile.

### Release 0.2.0
- Re-run `COVERAGE_MATRIX.md` top to bottom: every mockup element maps to a component or an explicit app-side note — fix gaps.
- Foundations: add `Icons` gallery + `Motion` reference cards; update `DarkMode` sampler with new tokens.
- Integrator docs pass (`INTEGRATORS.md` content into the repo README/docs site).
- Changeset → **@ornie/react 0.2.0** → publish to the public mirror (D-49).
- Hand the new `_ds` bundle back to the design project so future mockups use the real components.

---

## Deliberately NOT in this library

Focus/close-the-day/onboarding **flows** (app screens composed from shells) · Ask conversation UI logic (app; DS provides Sheet/PanelDrawer/Chip/Prose) · gesture engines (rows/cards expose callbacks only) · data hooks (`useLiveQuery` is @ornie/core's, D-23) · charts (no charts in a calm app; WeekDots and rings are the ceiling) · marketing-site components (Astro site styles itself with tokens only, D-65).
