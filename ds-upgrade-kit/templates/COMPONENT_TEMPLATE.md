# COMPONENT_TEMPLATE.md — file skeletons for a new component

Copy these five skeletons for every new component (example: `patterns/TaskRow/`). Adjust tier folder. All five files are required (definition of done #6–8).

## `TaskRow.jsx`

```jsx
import * as React from 'react';
import './TaskRow.css';

/**
 * TaskRow — one task in a list. See TaskRow.prompt.md.
 * Screens: 2a Today, 2e Upcoming, D:Today … (COVERAGE_MATRIX)
 */
export const TaskRow = React.forwardRef(function TaskRow(
  {
    title,
    state = 'default',        // 'default' | 'done' | 'waiting' | 'resurfaced'
    density = 'phone',        // 'phone' | 'desktop'
    meta,                     // ReactNode — usually <MetaLine>
    trailing,                 // ReactNode slot
    onToggle,                 // (next: boolean) => void
    className = '',
    ...rest
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={[
        'ornie-taskrow',
        `ornie-taskrow--${density}`,
        state !== 'default' && `ornie-taskrow--${state}`,
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {/* … */}
    </div>
  );
});
```

Rules visible above: forwardRef · className merge · rest spread · BEM modifiers · no margin.

## `TaskRow.css`

```css
/* TaskRow — semantic tokens only. Audit: no hex, no raw scales w/o comment, no theme selectors. */
.ornie-taskrow {
  display: flex;
  align-items: center;
  gap: var(--ornie-space-3);
  min-height: 44px;
  padding: var(--ornie-space-3) 0;
}
.ornie-taskrow--desktop { min-height: 36px; padding: var(--ornie-space-2) 0; }
.ornie-taskrow:hover { background: var(--ornie-hover); }
.ornie-taskrow--done .ornie-taskrow__title {
  color: var(--ornie-text-subtle);
  text-decoration: line-through;
  text-decoration-color: var(--ornie-done);
}
```

## `TaskRow.d.ts`

```ts
import * as React from 'react';

export interface TaskRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  /** Visual state. 'waiting' = blocked on a person; 'resurfaced' = gentle return (R-3). Never an "overdue" state. */
  state?: 'default' | 'done' | 'waiting' | 'resurfaced';
  density?: 'phone' | 'desktop';
  meta?: React.ReactNode;
  trailing?: React.ReactNode;
  onToggle?: (next: boolean) => void;
}
export declare const TaskRow: React.ForwardRefExoticComponent<
  TaskRowProps & React.RefAttributes<HTMLDivElement>
>;
```

## `TaskRow.prompt.md`

```md
# TaskRow

> Screens: 2a, 2e–2h, 1s, D:Today/Inbox/Upcoming/Logbook. Tier: patterns. Since 0.2.0.

One task in a list: TaskCheck + title + MetaLine + trailing slot.

**Use when** rendering any task collection.
**Don't use for** settings/people/notes rows — that's ListRow with a recipe.

## Examples
<!-- 2–3 tight JSX examples: default, done+meta, waiting with person chip -->

## Calm rules
- No red, no "overdue". Aged items use state="resurfaced".
- Completion animation ≤ --ornie-duration-gentle; instant under reduced motion.
```

## `TaskRow.html` — variant grid, both themes

```html
<!DOCTYPE html>
<html><head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../../../styles.css">
  <script src="../../../_ds_bundle.js"></script>
  <style>body{margin:0;display:grid;grid-template-columns:1fr 1fr;} .half{padding:32px;min-height:100vh;}</style>
</head><body>
  <div class="ornie-app half" id="light"></div>
  <div class="ornie-app half" data-ornie-theme="dark" id="dark"></div>
  <script>
    // Render the SAME full variant × state matrix into #light and #dark.
    // Include: densities × states × with/without meta/trailing, plus focus-visible note.
  </script>
</body></html>
```

The grid is the axe target and the both-themes proof — it must enumerate every variant × state combination, identically in both halves.
