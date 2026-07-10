# Tabs

> Screens: 2n modules hub, D:Modules hub / GitHub / Calendar module views. Tier: primitives. Since 0.1.0; upgraded 0.2.0.

Switch between sibling content views under one heading — Overview / Activity / Settings of a module. One view visible at a time; the others keep their place.

**Use when** a surface has 2–5 peer *views* of content and switching is navigation-like.
**Don't use for** exclusive 2–4-way *choices* that set a value (appearance light/dark/system, triage targets) — that's **SegmentedControl** (Phase 2), a form control with `value`+`onChange`. The test: Tabs change what you're *looking at*; SegmentedControl changes what you've *chosen*. Also not for page-level navigation (Dock/SidebarNav) or tag filtering (ChipGroup).

## API notes

- `items`: `{ label, content?, disabled? }[]`. Panels are optional — omit `content` when the parent renders the view itself (wire the region with `aria-controls` in the app if so).
- Controlled: `index` + `onChange`. `defaultIndex` (uncontrolled) exists for static demos; app code should control.
- `variant`: `underline` (default — quiet, sits on a hairline) or `pills` (raised segmented look for toolbar-ish placements).
- `size`: `md` (default, 15px labels) / `sm` (tighter paddings, 13px labels — dense desktop chrome like module sub-views).
- Keyboard: roving tabindex — Tab lands on the active tab; ArrowLeft/ArrowRight move and select (wrapping, skipping disabled); Home/End jump to first/last. `aria-selected` + `tabpanel` wiring is automatic.
- Touch: labels keep their visual size; an invisible ≥44px hit-slop covers coarse pointers.

## Examples

```jsx
// Module hub views (2n) — controlled
<Tabs
  index={view}
  onChange={setView}
  items={[
    { label: 'Overview', content: <ModuleOverview /> },
    { label: 'Activity', content: <ModuleActivity /> },
    { label: 'Settings', content: <ModuleSettings /> },
  ]}
/>

// Dense desktop sub-views (D:GitHub module)
<Tabs size="sm" index={tab} onChange={setTab}
  items={[{ label: 'Issues' }, { label: 'Pull requests' }]} />

// NOT Tabs — a value choice belongs to SegmentedControl (Phase 2):
// <SegmentedControl value={appearance} onChange={setAppearance}
//   options={['Light', 'Dark', 'System']} />
```

## Calm rules

- Switching is instant — no panel slide or crossfade; only the tab ink transitions (`--ornie-duration-quick`).
- No badges/counts on tab labels shouting for attention; if a view needs a count, use a neutral Badge and keep it informational.
- The active marker is the accent underline — never a filled red or pulsing indicator.
