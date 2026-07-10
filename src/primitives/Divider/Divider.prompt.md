# Divider

> Screens: 1l task detail, list rows everywhere (2c, 1o–1q, D:settings — usually via ListSection, which owns its separators). Tier: primitives. Since 0.2.0.

The 1px hairline rule on `--ornie-border-subtle` — the quietest line the token set can draw. It separates without boxing.

**Use when** two stacked regions need a visible seam: settings groups, a task-detail section break, columns in a meta line.
**Don't use for** row separators inside ListSection (Phase 2 — it places its own Dividers so consumers don't hand-space them), spacing (parents own spacing via `gap`), or borders around a region (Card).

## API notes

- `orientation`: `horizontal` (default, renders a real `<hr>`) or `vertical` (renders `<div role="separator" aria-orientation="vertical">`).
- Vertical dividers get their height from a flex parent (`align-self: stretch`). Outside flex, give the divider an explicit `height` via `style`.
- `inset` shifts the line's **start edge** so it aligns with row content, without margins:
  - `none` — full-bleed (default).
  - `md` — 16px (`--ornie-space-4`): matches list-row horizontal padding; the standard row separator.
  - `lg` — 24px (`--ornie-space-6`): matches card and sheet content padding.
  - Horizontal insets from the left; vertical insets from the top.
- The root spans the full track and has zero outer margin; the hairline is an inner layer. Spacing above/below belongs to the parent.

## Examples

```jsx
// Settings card — hairlines aligned with 16px row padding
<Card>
  <Row>Appearance</Row>
  <Divider inset="md" />
  <Row>Notifications</Row>
  <Divider inset="md" />
  <Row>Shortcuts</Row>
</Card>

// Task detail (1l) — full-bleed seam between sections
<Divider />

// Vertical seam in a meta line
<div style={{ display: 'flex', gap: 'var(--ornie-space-3)' }}>
  <span>3 tasks</span>
  <Divider orientation="vertical" />
  <span>Garden project</span>
</div>
```

## Calm rules

- One weight, one color. There is no "strong" divider — if a seam needs more voice, the layout is too dense.
- Never stack two Dividers for emphasis; use whitespace.
- Dividers carry no text, no icons, no labels.
