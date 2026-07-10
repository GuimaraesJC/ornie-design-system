# Card

> Screens: 2a RIGHT NOW + close-day, 2c triage, 2l Journal, 2m/D:Pages grids, 1v/D:Settings plan, D:Today, D:Mobile companion. Tier: primitives. Since 0.1.0; upgraded 0.2.0.

The bounded surface. Anything that needs its own edge on the page — a task spotlight, a journal entry, a plan summary — sits on a Card. Cards own their surface and padding; parents own spacing (flex/grid `gap`).

**Use when** content needs a visible boundary or gentle lift from the page.
**Don't use for** list rows (TaskRow/ListRow — hairline separators, not boxes), full app chrome (Sheet/PanelDrawer, shells tier), or a wrapper that exists only to add margin — Cards have none.

## API notes

- `variant`: `flat` (surface + `--ornie-border-subtle` hairline) / `elevated` (hairline + `--ornie-shadow-md`, the default) / `sunken` (`--ornie-surface-sunken`, no shadow — grouping inside another surface). `outlined` is **deprecated** — it maps to `flat` with a dev warning; removed in 0.3.0.
- `padding`: `none` 0 / `sm` 12 / `md` 16 / `lg` 24 (px). Default `md`.
- `spine`: 4px `--ornie-accent` left edge, clipped to the card radius — the RIGHT NOW treatment (2a, D:Today). One spine card per view.
- `interactive`: hover wash (`--ornie-hover`), pointer cursor, standard focus ring. With `onClick` the card renders a full-width `<button>`; with `href` an `<a>` — real semantics, keyboard for free. `forwardRef` follows the rendered element.
- Interactive cards must not contain other interactive controls (no buttons inside a button) — if a card needs inner actions, keep it non-interactive and put a Button in it.

## Examples

```jsx
// RIGHT NOW spotlight (2a) — one per view
<Card spine padding="lg">
  <TaskRow title="Email design feedback to Sam" meta={<MetaLine …/>} />
</Card>

// Navigable page card in the Pages grid (2m)
<Card interactive href={`/pages/${page.id}`} variant="flat">
  <h3>{page.title}</h3>
  <p>{page.excerpt}</p>
</Card>

// Grouping inside a settings surface (1v plan card)
<Card variant="sunken" padding="md">
  <PlanSummary />
</Card>
```

## Calm rules

- Elevation stays low: `elevated` is the ceiling — never stack a stronger shadow on a Card.
- The spine is the only accent edge; it marks *the* current thing, never urgency. No red edges, ever.
- Hover is a quiet wash (`--ornie-hover`), no lift, no scale, no entrance animation.
