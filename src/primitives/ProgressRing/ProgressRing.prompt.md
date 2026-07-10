# ProgressRing

> Screens: D:sidebar projects mini-ring, 1r/1s projects, 2c triage footer, 2a header (as DayRing base), 1m focus. Tier: primitives. Since 0.2.0.

The determinate ring: an accent conic fill over a quiet track, with a surface disc masking the center. It is the **base of DayRing** (Phase 2 — the 46px header ritual object with a center count); the **16px size is the project mini-ring** (D:sidebar projects, 1r) and the 2c triage footer counter.

**Use when** showing "how much of a known whole is done" — project completion, triage progress, day progress.
**Don't use for** indeterminate waiting (Spinner), for time pressure or deadlines of any kind, or as a chart (a ring per list row is the ceiling — never a dashboard of rings).

## API notes

- `value` is 0–1, clamped; exposed as `role="progressbar"` with `aria-valuemin={0}` / `aria-valuemax={1}` / `aria-valuenow`. `label` → `aria-label` (default "Progress") — give it a real name ("Garden project progress", "3 of 7 done today").
- Sizes are exact px boxes: `16 | 24 | 46` (default 24). Ring stroke scales: 2.5px / 3.5px / 4.5px (inner discs 11 / 17 / 37px — the 46/37 pair is from SPECS).
- `trackColor` accepts any CSS color string for the unfilled track (default `var(--ornie-track)`); the fill is always `--ornie-accent`.
- `children` = center slot rendered inside the inner disc — a count or an otter-dot. Only sensible at size 46; at 16/24 the disc is too small for text.
- **Value changes are instant, on purpose.** Conic-gradient stops can't transition, and progress ticking is not motion the user should watch. Non-interactive: no focus, no hit-target concerns.
- The inner disc is `--ornie-surface`. On a sunken background (D:sidebar) the disc reads as a small surface dot; if that ever looks wrong, the fix is a semantic token conversation, not a prop hack.

## Examples

```jsx
// D:sidebar project mini-ring
<ProgressRing size={16} value={done / total} label={`${name} progress`} />

// 2c triage footer — "3 of 7"
<ProgressRing size={16} value={3 / 7} label="3 of 7 triaged" />

// DayRing base (Phase 2 wraps this): 46px with center count
<ProgressRing size={46} value={done / planned} label={`${done} of ${planned} done today`}>
  {done}/{planned}
</ProgressRing>
```

## Calm rules

- **Never turns red, never shows streaks (R-5).** A missed day just starts at 0 — the language is "resumed", never "broken". Full is quiet accent, empty is a quiet track; there is no alarm state at any value.
- No pulse at completion, no ticking animation while filling — value changes land instantly and silently.
- The ring informs; it does not count at the user. Pair it with plain copy ("3 of 7"), never percentages shouting in bold.
