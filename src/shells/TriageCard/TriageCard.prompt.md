# TriageCard

> Screens: 2c Triage, D:Inbox triage mode. Tier: shells. Since 0.2.0.

The inbox triage unit (D-68): one captured thing, where it came from, a single row of homes to file it into, and a quiet "3 of 7" footer. Composes `Card` (spine, elevated) + `MetaLine` + `ChipGroup` + `ProgressRing` — one decision per card, then the app advances the queue.

**Use when** the user is sorting Inbox one item at a time (2c, D:Inbox triage mode).
**Don't use for** task display (TaskRow), capture parsing (Sheet + Chip parse row), multi-select of anything (triage is one pick), or confirmations.

## API notes

- `text` is the captured thing, verbatim — never truncate it; multi-line wraps at 16px/medium.
- `source` renders inside a `MetaLine`; pass fragments and the separators appear between them: `source={['via share sheet', '2h ago']}`.
- `targets` + `onDecide(value)`: the ChipGroup runs `mode="single"` with `value={null}` — nothing is ever shown selected; each pick calls `onDecide` immediately. Undo is the app's Toast (D-50), never UI on this card. Give project targets a `leading` `<ProjectDot>`.
- `progress={{ current, total }}` renders the footer: a 16px `ProgressRing` (value `current/total`) plus "3 of 7" in 11.5px `--ornie-text-subtle`. Omit it (rare) and the footer collapses.
- `swipeHint` shows the quiet "or swipe the card →" legend from 2c. **Visual affordance only** — this component handles no gestures; the swipe shortcut is wired app-side around the card. It is `aria-hidden`: chips are the keyboard/screen-reader path.
- `targetsLabel` names the chip group for assistive tech (default "File to").
- Keyboard story: Tab reaches the chip row (roving tabindex — arrows move between targets, Enter/Space decides). The footer holds nothing focusable.

## Examples

```jsx
// 2c — full anatomy
<TriageCard
  text="Book dentist appointment"
  source={['via share sheet', '2h ago']}
  targets={[
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'someday', label: 'Someday' },
    { value: 'porto', label: 'Porto trip', leading: <ProjectDot color="clay" /> },
  ]}
  onDecide={(value) => fileItem(item.id, value)}
  progress={{ current: 3, total: 7 }}
  swipeHint
/>

// App-side queue advance + undo (the card itself never shows undo UI)
<TriageCard
  text={item.text}
  targets={targets}
  onDecide={(value) => {
    fileItem(item.id, value);
    toast({ children: 'Filed to Today', action: <Button variant="ghost" onClick={undo}>Undo</Button> });
    next();
  }}
  progress={{ current: sorted, total: queue.length }}
/>
```

## Calm rules

- Triage chips are **choices, not warnings** — neutral pills with a quiet accent wash on hover; no urgency colors, no "overdue" targets.
- "3 of 7" is informational, never a guilt bar: the ring is 16px, `--ornie-accent` on `--ornie-track`, and never turns red or celebrates.
- One decision per card, no multi-select, no confirmation step. Wrong homes are cheap — everything can move later; undo lives in the Toast.
- The card sits still: no entrance animation, no swipe preview wiggle. The swipe hint is static 11px text.
