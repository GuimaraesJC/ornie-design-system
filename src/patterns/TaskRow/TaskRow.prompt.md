# TaskRow

> Screens: 2a Today, 2e–2h, 1s, D:Today/Inbox/Upcoming/Logbook. Tier: patterns. Since 0.2.0.

One task in a list: TaskCheck · title (15/medium) · MetaLine · trailing slot. The most-used component in Ornie.

**Use when** rendering any task collection.
**Don't use for** settings/people/notes rows — that's `ListRow` with a recipe. Don't hand-place separators between TaskRows — `ListSection` owns them.

## API notes

- `onToggle(next)` renders the TaskCheck (checked when `state="done"`); `checkLabel` names it (defaults to a string `title`).
- `onOpen` makes the content area a button — tapping the row opens the detail sheet/panel (1l). Swipe/drag are app-side; the row only exposes slots and callbacks.
- `meta` is usually a `<MetaLine>`; the waiting-person chip goes there.
- `density="phone"` (12px vertical padding, 23px check) / `"desktop"` (8px, 20px).
- `state`: `default` · `done` (struck title in `--ornie-done`) · `waiting` (neutral row; person in meta) · `resurfaced` (quiet accent chip, R-3).

## Examples

```jsx
<TaskRow
  title="Email design feedback to Sam"
  onToggle={complete}
  onOpen={openDetail}
  meta={<MetaLine><span>9:00</span><ProjectDot color="moss" label="Garden" /></MetaLine>}
  trailing={<IconChevronRight size={16} />}
/>

// Logbook
<TaskRow title="Water the ferns" state="done" onToggle={uncomplete} density="desktop" />

// Gentle return (R-3)
<TaskRow title="Renew passport" state="resurfaced" onToggle={complete} />
```

## Calm rules

- **Overdue is not a state — there is no red.** Aged items come back as `resurfaced` ("back for a look"), never as warnings.
- Done rows stay readable: struck title in `--ornie-text-muted`, decoration in `--ornie-done`.
- Hover is a `--ornie-hover` wash; nothing moves on hover.
