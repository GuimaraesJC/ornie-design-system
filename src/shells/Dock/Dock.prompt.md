# Dock

> Screens: every phone screen (2a/2e–2n); tablet uses SidebarNav rail instead. Tier: shells. Since 0.2.0.

The phone bottom navigation: an 84px bar on `--ornie-surface-sunken` with up to five slots — four nav items around the raised 54px capture button (lifted −26px with a 4px page-background ring, SPECS).

**Use when** building the phone frame. One per app.
**Don't use for** desktop/tablet (SidebarNav), or as a toolbar — dock items navigate, they don't act (capture is the one action, and it's structural).

## API notes

- `items` (≤4): `{ icon, label, active, onSelect, badge? }` — the label is both visible (10.5px) and the accessible name; `active` gets `aria-current="page"` and `--ornie-accent-text` ink.
- `capture={{ onPress, label? }}` renders the raised center button (`aria-label` defaults to "Capture").
- `badge` is a quiet neutral count (Badge count mode: `0` renders nothing, never alarm-colored).
- The Dock is the bar only — the app fixes it to the viewport bottom. Safe-area padding is built in; z sits at `--ornie-z-dock` so every overlay covers it.

## Examples

```jsx
<Dock
  items={[
    { icon: 'sun', label: 'Today', active: view === 'today', onSelect: () => go('today') },
    { icon: 'inbox', label: 'Inbox', badge: inboxCount, onSelect: () => go('inbox') },
    { icon: 'calendar', label: 'Upcoming', onSelect: () => go('upcoming') },
    { icon: 'grid', label: 'Browse', onSelect: () => go('browse') },
  ]}
  capture={{ onPress: openCapture }}
/>
```

## Calm rules

- Badges are informational counts, never red dots; inactive items rest in `--ornie-text-subtle`.
- Nothing in the dock animates, bounces, or pulses — the capture button is prominent by geometry, not by motion.
