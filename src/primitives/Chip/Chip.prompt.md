# Chip

> Screens: 2b capture parse chips, 2c triage targets, 1l tags, 1u Ask action chips, D:quick-capture. Tier: primitives. Since 0.2.0.

The interactive pill. Badge is static information; Chip is something you tap: a parse suggestion to confirm, a triage target to pick, a tag to remove, an Ask action to run.

**Use when** the user picks, toggles, or removes a small labelled item.
**Don't use for** static status or counts (Badge), navigation (Tabs/Link), or exclusive 2–4-way choices (SegmentedControl, Phase 2).

## API notes

- Controlled: `selected` + `onSelect` (the chip becomes a toggle button with `aria-pressed`).
- `onRemove` renders the × as a **separate sibling button** (never a button inside a button), labelled via `removeLabel`.
- `leading` takes an `<Icon>` or a dot; it is decorative (`aria-hidden`).
- Sizes: `sm` 24px / `md` 32px. On coarse pointers both get an invisible ≥44px hit-slop — never enlarge the visual to compensate.
- `disabled` dims the chip and disables both the action and × buttons (since 0.2.0; ChipGroup forwards it per option).

## Examples

```jsx
// Capture parse chip — confirmed entity, removable
<Chip leading={<IconCalendar />} onRemove={() => dropEntity(id)} removeLabel="Remove date">
  tomorrow 9:00
</Chip>

// Triage target — single-select behaviour is the parent's state
<Chip selected={target === 'today'} onSelect={() => setTarget('today')}>Today</Chip>

// Static tag display (no handlers — renders inert)
<Chip size="sm" leading={<IconTag />}>errands</Chip>
```

## Calm rules

- Chips never pulse, glow, or count at the user; selection is a quiet wash change (`--ornie-accent-subtle`).
- Removal is immediate and undoable at the app layer (Toast · Undo, D-50) — no confirmation popovers on chips.
- No red chips. Danger-colored choices don't exist at this size.
