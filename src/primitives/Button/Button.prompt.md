# Button

> Screens: everywhere — 2b capture, 1l task detail, 1n close the day, D:capture, D:settings. Tier: primitives. Since 0.2.0.

The labelled action. Anything the user commits to by name — save, capture, seal, delete — is a Button. Icon-only actions are IconButton, not a Button with no children.

**Use when** an action has a text label.
**Don't use for** icon-only actions (IconButton), navigation that just goes somewhere (Link), or toggling state (Switch, Chip with `onSelect`).

## API notes

- Variants: `primary / secondary / ghost / danger`. **One primary per view** — everything else steps down to secondary or ghost. **`danger` only for destructive confirmation** (the red button inside the confirm Modal, 2i trash), never as a first-touch action on a screen.
- Sizes: `sm` 32 / `md` 40 / `lg` 48. **lg is the mobile sheet primary** (2b capture "Add task"). On coarse pointers sm/md get an invisible ≥44px hit-slop.
- Slots: `leading` / `trailing` take an `<Icon>`; they are decorative (`aria-hidden`) — the label names the action. `iconStart`/`iconEnd` are deprecated aliases (warn once in dev, removed in 0.3.0).
- `loading` overlays a spinner, locks the current width (label goes invisible, not removed), disables interaction, and sets `aria-busy="true"`. The spinner uses the sanctioned continuous-motion tokens (`--ornie-duration-spin` + `--ornie-spin-state`) — it pauses, not races, under reduced motion.
- `fullWidth` stretches to the container; the parent still owns spacing (no outer margins).
- Real `<button type="button">`; `forwardRef`, `className`/`style`/rest pass through.

## Examples

```jsx
// Mobile capture sheet primary (2b)
<Button size="lg" fullWidth loading={saving} onClick={save}>
  Add task
</Button>

// Quiet secondary with a leading glyph
<Button variant="secondary" leading={<Icon name="plus" />} onClick={newProject}>
  New project
</Button>

// Destructive confirmation — only ever inside the confirm step (2i)
<Button variant="danger" onClick={confirmDelete}>Delete forever</Button>
```

## Calm rules

- One primary per view; a screen of shouting buttons is a screen with none.
- Danger red exists solely for destructive confirmation — never for urgency, never for "overdue".
- Loading is a quiet spinner in place; the button never pulses, grows, or animates its label. Width stays locked so nothing shifts.
- Labels are plain verbs, no exclamation marks: "Add task", not "Add task!".
