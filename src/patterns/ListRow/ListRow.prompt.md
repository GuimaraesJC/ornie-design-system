# ListRow

> Screens: 1l subtasks, 1o notes list, 1t Browse, 1v Settings, 2i Trash, 2j Habits, 2k People, 2n Modules hub, Burrow settings, D:Settings, D:Notes, D:People, D:Habits, D:Modules, D:Quick Find results. Tier: patterns. Since 0.2.0.

The generic row — anything listed that is not a task (tasks are `TaskRow`, which owns the completion circle and task states). One anatomy, four slots: `leading` / `title` / `description` / `trailing`, plus an optional chevron. Arrangements are **recipes documented here, not separate components** (API_CONVENTIONS §1).

**Use when** a screen lists settings, people, notes, modules, projects, nav destinations, or search results.
**Don't use for** tasks (`TaskRow` — completion, meta line, waiting/resurfaced states), section labels (`ListSection`/`DateGroupHeader`), or one-off compositions that need a different anatomy (compose primitives in the app).

## API notes

- `title` is 15px `--ornie-text` medium; `description` is 13px `--ornie-text-muted`, single-line truncated. Both are ReactNode slots (this is a slot component, like Switch's `label`).
- `density`: `phone` (default) min-height 44 — the row is its own hit target; `desktop` min-height 36. Use `phone` on any touch surface.
- `chevron` renders a trailing chevron-right (16px, `--ornie-text-muted`) after any `trailing` content. Chevron = "this row navigates"; pair it with `interactive`.
- `interactive` adds the `--ornie-hover` wash + standard focus ring, and renders a real `<button>` (with `onClick`) or `<a>` (with `href`) — the same pattern as Card. **Don't** make a row interactive when its `trailing` is itself a control (Switch): a button cannot contain a button — the Switch is the row's interaction (see module recipe).
- `padded`: horizontal padding is 0 by default — the parent owns the inset. Inside `ListSection surface="card"` pass `padded` for 16px. (The 1v mockup uses 15px; we snap to the 4px grid at 16px, matching `Divider inset="md"`.)
- Separators between rows belong to `ListSection` — never add borders to rows yourself.

## Recipes

```jsx
// Settings row (1v, D:settings) — icon + title + value + chevron, or a Switch
<ListRow padded interactive onClick={openAppearance}
  leading={<Icon name="moon" size={20} />} title="Appearance"
  trailing="Riverbed · Light" chevron />
<ListRow padded title="Quiet hours" description="No nudges 21:00–08:00. Capture always works."
  trailing={<Switch checked={quiet} onChange={setQuiet} aria-label="Quiet hours" />} />

// Person row (2k, D:people) — Avatar + name + waiting count
<ListRow interactive onClick={() => openPerson(p.id)}
  leading={<Avatar name={p.name} size="sm" />} title={p.name}
  description={`${p.waiting} waiting`} trailing={<Badge count={p.waiting} />} chevron />

// Note row (1o, D:notes) — title + snippet + date
<ListRow interactive onClick={() => openNote(n.id)}
  title={n.title} description={n.snippet} trailing={n.editedLabel} />

// Module row (2n, D:modules) — icon + name + Switch (row itself not interactive)
<ListRow padded leading={<Icon name="puzzle" size={20} />} title="Calendar"
  description="Today's shape on the Upcoming view"
  trailing={<Switch checked={enabled} onChange={setEnabled} aria-label="Calendar module" />} />
```

## Calm rules

- Hover is the quiet `--ornie-hover` wash; no lift, no shadow, no motion beyond the color transition.
- `trailing` text and counts are muted and informational — never red, never a badge that shouts.
- Descriptions truncate rather than wrap: rows stay one calm height; the detail view has the room.
