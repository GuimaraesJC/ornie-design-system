---
"@ornie/react": minor
---

Phase 1 — primitives: 8 new components, 46-glyph icon set, 12 upgrades, variant-grid infrastructure.

**New primitives.** `Icon` (+46 tree-shakeable named exports like `IconCheck` — curated from Lucide (ISC) at dev time, stroke 1.9, round caps/joins, plain Ornie nouns; `Icons` foundation gallery), `IconButton` (sizes 32/40/44, ghost/outline/filled, `aria-label` required at the type level), `Chip` (the interactive pill: `selected`/`onSelect`, `onRemove` as a sibling button, `leading` slot, ≥44px touch hit-slop), `Kbd` (`keys={['⌘','K']}` key caps, `onInverse` for tooltip use), `Spinner` (quiet ring; pauses — never strobes — under reduced motion; no full-page spinner exists in Ornie, D-23), `ProgressRing` (conic, value 0–1, sizes 16/24/46, center slot; base of DayRing), `Divider` (hairline, inset presets, both orientations), `Link` (accent/muted text link), `TextArea` (Input's multiline sibling).

**Upgrades.** Button: `leading`/`trailing` slots (`iconStart`/`iconEnd` deprecated), `loadingLabel` gives loading buttons an accessible name, spin/motion tokens, touch hit-slop. Input/Select: `leading`/`trailing` slots inside the field frame. Checkbox: `indeterminate` re-applied on every render, `description` wired to `aria-describedby`. Radio: new `RadioGroup` (fieldset semantics, controlled `value`/`onChange`, orientation). Switch: `label`/`description` slots, control-on-the-right settings-row default. Badge: `count` mode (tabular-nums, `max`→"99+", `count={0}` renders nothing; danger counts coerce to neutral — counts never shout). Avatar: **new size scale xs 20 / sm 28 / md 36 / lg 44 / xl 56** (was 24–64). Card: `variant="flat|elevated|sunken"`, **padding presets remapped to 0/12/16/24** (was 0/16/24/32), `spine` accent edge, `interactive` (renders button/a). Modal: sizes 400/**540**/680, `placement="center|top"`, `initialFocus`, full focus trap + return, fade-only entrance. Tabs: `size sm/md` (`defaultIndex` deprecated — controlled only). Tooltip: `kbd` shortcut caps, controlled `open`.

**Deprecations (removed in 0.3.0):** `Button.iconStart/iconEnd` → `leading`/`trailing` · `Card variant="outlined"` → `flat` · `Modal.closeOnOverlayClick` → `dismissible` · `Tabs.defaultIndex` → `index`+`onChange`.

**Visual changes to review:** Avatar sizes, Card paddings, Modal md 520→540, Switch labelled mode now places the control on the right, Select/Input placeholder ink `text-subtle`→`text-muted` (AA in dark).

**Tokens:** new `--ornie-accent-text-hover` (link hover ink, AA both themes), `--ornie-duration-spin` + `--ornie-spin-state` (continuous motion pauses under reduced motion).

**Infrastructure.** Every component now ships impl + CSS + stories + `.prompt.md` + a both-themes variant grid (`<Name>.html`); `pnpm build:grid` bundles the grid harness; `pnpm audit:a11y` runs axe over all 21 grids (green), waiting out entrance animations before measuring. `pnpm icons` regenerates the glyph set from the curation map.
