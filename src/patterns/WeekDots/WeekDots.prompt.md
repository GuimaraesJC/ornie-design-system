# WeekDots

> Screens: 2a Today habit card, 2j habit rows, D:Habits, 1n close-day summary. Tier: patterns. Since 0.2.0.

Seven quiet dots of habit history. Done days fill in `--ornie-done`, missed days stay a quiet track dot, today wears a thin ring, and days that haven't happened yet are dashed outlines. That's the whole story it can tell.

**Use when** a habit row or summary needs this week at a glance.
**Don't use for** progress toward a goal (ProgressRing/DayRing), charts of any kind (WeekDots is the ceiling — no charts in a calm app), or anything longer than a week.

## API notes

- `values` — seven booleans, oldest first. A `false` is rendered exactly like every other quiet thing in Ornie: no color shift, no outline of shame.
- `todayIndex` — today's dot gets a 1.5px `--ornie-done` ring (with a transparent gap, so it sits on any wash); indexes after it render dashed — "the future", lifted from the 2j mockup ("today ringed, futures dashed, misses just quiet").
- `label` overrides the computed accessible name ("4 of 7 days this week"). The component is `role="img"` — one label, not seven tab stops.
- **The API cannot express a streak (R-5).** There is no `streak` prop, no count, no number anywhere in this component — by design, not omission. The streak chip in the Habits mockups is app copy, it pauses instead of resetting, and the product word is "resumed", never "broken". Do not build a streak affordance around WeekDots.

## Examples

```jsx
// Habit row trailing slot (2j, D:Habits)
<ListRow
  title="Morning pages"
  description="before anything else opens"
  trailing={<WeekDots values={week} todayIndex={4} />}
/>

// Close-day summary (1n)
<WeekDots values={[true, true, false, true, true, true, false]} todayIndex={5} />

// i18n / richer label
<WeekDots values={week} todayIndex={2} label="20-min walk, 3 of 7 days" />
```

## Calm rules

- Misses are visually identical to "not yet" — quiet track dots. Never red, never dimmed-with-meaning.
- Static by definition: nothing animates when a day completes; the dot simply is filled on the next render.
- No numbers. If a screen wants "5 of 7" as text, that is app copy next to the dots, not a component prop beyond the aria-label.
