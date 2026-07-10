# Badge

> Screens: D:sidebar counts, 2n modules hub, dock inbox count (2a), 1t browse, 2k people. Tier: primitives. Since 0.2.0.

Static status at a glance: a state word ("Draft", "Active"), a status dot, or a quiet count next to a nav item. Badge never handles input — if it's tappable, it's a Chip.

**Use when** a row or nav item needs a small piece of ambient status or an informational count.
**Don't use for** anything interactive (Chip), long text (MetaLine/Prose), or alerting the user — Ornie has no alarm badges.

## API notes

- Variants: `neutral / accent / success / warning / danger` — muted subtle-wash pairs (`--ornie-*-subtle` + `--ornie-*-text`), never saturated fills.
- `dot` renders a 6px leading status dot in `currentColor`.
- `count` switches to count mode: renders the number (children are ignored), `tabular-nums` so widths don't dance, min-width so one digit is a round pill. `max` (default 99) caps display at "99+".
- **Counts never shout (D-01/R-5):** count badges default `neutral`; `accent` is opt-in for the one place attention is earned (e.g. inbox in the dock). There is no danger count — `variant="danger"` with `count` renders as neutral and warns once in dev (fallback removed in 0.3.0).
- `count={0}` renders nothing. An empty badge is silence, not a gray zero.
- Plain `<span>`; `forwardRef`, `className`/`style`/rest pass through. No outer margins — the parent row owns spacing.

## Examples

```jsx
// Sidebar nav count (D:sidebar) — quiet by default
<Badge count={inboxItems.length} />

// Dock inbox — accent opt-in, the one earned emphasis
<Badge count={inboxItems.length} variant="accent" size="sm" />

// Module status (2n)
<Badge variant="success" dot>Connected</Badge>
```

## Calm rules

- Counts are information, not pressure: no red counts, no pulsing, nothing that grows or blinks when the number changes.
- Zero is rendered as nothing. Never show "0" — silence is the reward.
- Copy inside badges is a single plain word, no exclamation marks ("Pending", not "Action needed!").
