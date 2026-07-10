# Checkbox

> Screens: D:settings, 1l checklist fields. Tier: primitives. Since 0.2.0.

The square yes/no field. A setting you opt into, a checklist item inside a task's detail sheet, a "select all" over a partial selection.

**Use when** a form or settings surface needs an independent on/off choice, or a list of them.
**Don't use for** task completion — that is **TaskCheck** (Phase 2), the 23px circle with its own calm draw-in; a task is not a form field. Also not for exclusive choices (Radio/RadioGroup), or instant-effect toggles like "Dark mode" (Switch — Checkbox is for things a form submits, Switch flips state now).

## API notes

- Native `<input type="checkbox">` under the skin — controlled via `checked` + `onChange`; keyboard and screen-reader behaviour come free.
- `indeterminate` sets the native mixed flag (assistive tech announces `aria-checked="mixed"`), draws the dash instead of the check, and is re-applied after every render so a controlled "select all" never gets stuck cleared by a click. It is presentational: `checked` remains the submitted value.
- `description` renders a muted 13px line under the label and is wired to the input via `aria-describedby` (merged with any `aria-describedby` you pass).
- The whole label is the click target; on coarse pointers the 18px box also gets an invisible ≥44px hit-slop.
- Bare box (no `label`) is allowed but must carry `aria-label`.

## Examples

```jsx
// Settings option with helper text
<Checkbox
  label="Usage analytics"
  description="Share anonymous usage data to help us improve Ornie."
  checked={analytics}
  onChange={(e) => setAnalytics(e.target.checked)}
/>

// Select-all over a partial selection
<Checkbox
  label="Select all"
  checked={all}
  indeterminate={!all && !none}
  onChange={() => setItems(items.map(() => !all))}
/>

// Checklist field in the task detail sheet (1l)
<Checkbox label="Order compost" checked={done} onChange={(e) => setDone(e.target.checked)} />
```

## Calm rules

- Checking is a quiet fill (`--ornie-accent`) — nothing pops, springs, or celebrates.
- Descriptions inform, they never warn: no exclamation marks, no urgency copy.
- No red states. A checkbox is never the place to alarm someone.
- Indeterminate is information ("some of these"), not a nag to finish the rest.
