# DateGroupHeader

> Screens: 2e Upcoming, 2h Logbook, 1o notes list, 2l Journal, D:Upcoming, D:Logbook, D:Journal. Tier: patterns. Since 0.2.0.

The date kicker that opens a group of rows: "FRIDAY, JULY 3" — 11px caps in `--ornie-accent-text`, bold, +1px tracking, with an optional muted trailing count. Optionally sticky, so the day's rows scroll under it.

**Use when** rows are grouped by date (Upcoming, Logbook, notes by day, journal entries).
**Don't use for** non-date section labels ("ON THIS PHONE" — that's `ListSection`'s label) or the screen's own date kicker inside `PageHeader` (that's PageHeader's slot).

## API notes

- `children` is the **already-formatted** label. The DS does not format dates — no locale tables, no clock. The app formats and passes a string; CSS uppercases it.
- `trailing` is a quiet run after the kicker — usually the group's count (`'4'` or a neutral `Badge`). Muted, tabular numerals.
- `sticky` pins the header to the top of the nearest scroll container on `--ornie-bg` (small z-index, below every overlay). It adds its own small vertical padding in this mode so pinned rows don't touch the text — the documented exception to parents-own-spacing. If the group sits on another ground (a card), set `style={{ background: 'var(--ornie-surface)' }}` to match.
- It renders a plain `div`, not a heading — date groups are landmarks of scale, not document structure. Pass `role="heading" aria-level={3}` via rest props if a screen's outline needs it.

## Relative naming rules (app copy — the DS does not implement these)

- Today → `Today` · Tomorrow → `Tomorrow · Saturday` (name the weekday alongside)
- Within this week → the weekday alone: `Monday`
- Beyond this week → `Friday, July 3` (this year) · `Friday, July 3, 2027` (other years)
- Logbook (past) → same ladder backwards: `Yesterday`, weekday, then full date
- Never "overdue", never elapsed-day counts — a date is a fact, not a verdict (D-01).

## Examples

```jsx
// Upcoming group (2e)
<DateGroupHeader trailing={String(rows.length)}>Tomorrow · Saturday</DateGroupHeader>

// Sticky logbook groups (2h, D:logbook)
<div className="scroll-area">
  <DateGroupHeader sticky>Friday, July 3</DateGroupHeader>
  {done.map((t) => <TaskRow key={t.id} state="done" {...t} />)}
</div>
```

## Calm rules

- The kicker is the accent's one quiet appearance per group — it never gets a wash, an icon, or a heavier weight than bold 11px.
- Counts are informational and muted; a day with many tasks looks exactly as calm as a day with one.
- No "overdue" grouping exists. Past dates in Logbook read as history, not debt.
