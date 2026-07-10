# DayRing

> Screens: 2a/2d headers, D:top bar, 1n close-day summary. Tier: patterns. Since 0.2.0.

The header ritual object: a 46px `ProgressRing` filled to `done/planned`, with the remaining count in the center — or a quiet otter-dot on days with nothing planned.

**Use when** showing today's gentle progress in a header or the close-day summary.
**Don't use for** arbitrary progress (use ProgressRing), goals, or anything resembling a score.

## API notes

- `done` + `planned` — the component computes the fill; `planned === 0` renders the resting state (empty ring, otter-dot).
- Center count is what's *left* (`planned - done`), tabular-nums — the day winds down to zero, it doesn't score up.
- `label` overrides the default accessible name ("2 of 5 done today").
- **The API cannot express streaks or overdue.** A missed day just starts at 0 — the product word is "resumed" (R-5).

## Examples

```jsx
<PageHeader variant="greeting" trailing={<DayRing done={2} planned={5} />} />

// Close the day (1n)
<DayRing done={4} planned={5} label="4 of 5 done — close the day" />

// Resting day
<DayRing done={0} planned={0} />
```

## Calm rules

- Never red, never a streak, never a percentage badge.
- Fill changes are instant (conic geometry) — no sweeping animations at the day's end.
