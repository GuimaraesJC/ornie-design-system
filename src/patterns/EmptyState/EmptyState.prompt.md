# EmptyState

> Screens: 2f Anytime / 2g Someday, 2h Logbook, 2i Trash, 2n Modules hub, D:Today (evening), D:Upcoming/Anytime/Someday/Logbook/Trash, D:Modules hub. Tier: patterns. Since 0.2.0.

The calm "nothing here" block. Every list in Ornie has an empty case, and in Ornie an empty list is a *good* state — inbox zero, a clear evening, an empty trash. EmptyState says so without cheering or scolding: a quiet 24px glyph, a plain statement of what is, one sentence of context, and at most one next step.

**Use when** a list, view, or section has nothing to show.
**Don't use for** loading states (Spinner), errors (the app's error surface), onboarding flows (app screens — the DS ships parts, not flows), or celebratory moments (nothing in Ornie celebrates at the user).

## API notes

- `title` (required) is the statement; `children` is the one-sentence body; both are ReactNode.
- `icon` takes an `<Icon>`; it is decorative (`aria-hidden`) and forced to 24px in `--ornie-text-subtle` — a graphic, so subtle is fine here (text stays muted-or-stronger).
- `action` is a single slot for one `<Button>` — typically `secondary` or `ghost`, never `primary` (an empty state is not the page's main call to action) and never more than one.
- Centered column, 24px padding, no outer margins — the parent list owns placement and vertical rhythm.

## Copy rules (binding — every empty state in the app follows these)

- **Name what IS, not what's missing**: "Inbox is clear", "Nothing waiting on anyone", "Trash is empty" — never "You have no tasks" framed as a lack, never "Nothing to see here".
- **Never scold, never guilt**: no "You haven't…", no streak language (R-5: things are "resumed", never "broken").
- **No exclamation marks**, no emoji, no illustrations-of-sadness (empty boxes with faces, wilting plants). The icon is a plain glyph.
- Body is one sentence, factual and kind: "Items rest for 30 days, then leave on their own."

## Examples

```jsx
// Inbox zero — the good kind of empty
<EmptyState
  icon={<Icon name="inbox" />}
  title="Inbox is clear"
  action={<Button variant="secondary" size="sm">Capture something</Button>}
>
  New captures land here first — sort them whenever you’re ready.
</EmptyState>

// Trash (2i / D:trash) — no action; leaving it alone is the point
<EmptyState icon={<Icon name="trash" />} title="Trash is empty">
  Nothing here screams. Items rest for 30 days, then leave on their own.
</EmptyState>

// Minimal — title only
<EmptyState title="Nothing waiting on anyone" />
```

## Calm rules

- An empty list is a resting state, not a problem to fix — no urgency color, no motion, nothing pulses.
- At most one action, and it is an offer, not a prompt ("Capture something", not "Add your first task now").
- The whole block stays quiet: subtle icon, muted body, no borders or washes — it should read as breathing room, not a card.
