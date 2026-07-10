# TaskCheck

> Screens: every task row — 2a/2e–2h, 1l, 1s, D:Today/Inbox/Upcoming/Logbook. Tier: patterns. Since 0.2.0.

The completion circle: 23px ø, 2px stroke, fills `--ornie-done` with a white check that draws in over `--ornie-duration-gentle` (instant under reduced motion). A button with checkbox semantics — `role="checkbox"`, `aria-checked`, required `aria-label` from the task title.

**Use when** the user completes a task — anywhere a task can be checked off.
**Don't use for** settings or form consent — that's `Checkbox`. TaskCheck is the product's completion ritual, not a form control.

## API notes

- Controlled: `checked` + `onChange(next)`.
- `aria-label` is required at the type level (the circle is icon-only; the row title names it).
- Sizes: `md` 23px (phone rows), `sm` 20px (desktop density). Both get a 44px touch hit-slop.
- Hover tints the ring toward `--ornie-done` — an approach cue, not an alarm.

## Examples

```jsx
<TaskCheck checked={task.done} onChange={complete} aria-label={task.title} />

// Desktop density inside TaskRow (TaskRow wires this for you)
<TaskRow title="Water the ferns" onToggle={complete} density="desktop" />
```

## Calm rules

- The done fill is `--ornie-done` (muted river) — never green-success, never red.
- Completion animation ≤ `--ornie-duration-gentle`; the token layer makes it instant under reduced motion.
- No confetti, no burst, no sound hooks. Completing a task is quiet.
