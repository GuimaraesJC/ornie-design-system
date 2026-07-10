# Tooltip

> Screens: D:top bar, D:sidebar rail (label + shortcut on rail icons). Tier: primitives. Since 0.2.0 (`kbd` and `open` added in 0.2.0).

The hover/focus label bubble on the inverse surface. It names icon-only controls for pointer users and, on desktop, carries the keyboard shortcut alongside the name.

**Use when** an icon-only control (IconButton, rail item) needs its name surfaced on hover/focus, optionally with its shortcut.
**Don't use for** anything required for understanding — a tooltip is never the only place information lives (a11y: hover is unreachable on touch; the same info must be readable elsewhere). Not for rich content, actions, or forms (Modal / PanelDrawer), and not for errors (FormField).

## API notes

- Uncontrolled by default: the bubble shows on hover and keyboard focus of the wrapped trigger, and wires `aria-describedby` while visible.
- `open` (controlled) pins visibility for docs, grids, and app-driven cases; when set, hover/focus no longer toggle the bubble. There is no `onOpenChange` — Tooltip stays presentation-only.
- `kbd={['⌘','/']}` renders the label plus a Kbd group inside the bubble, slightly dimmed via Kbd's `onInverse` look. It is `aria-hidden` — decorative by design; every shortcut shown here is also listed in D:settings shortcuts.
- `placement`: `top` (default) / `bottom` / `left` / `right`. Positioning is CSS-relative to the trigger wrapper; there is no collision-flipping at 0.2.0.
- The root `<span>` forwards its ref, merges `className`/`style`, and passes rest props through. Your own `onMouseEnter`/`onFocus` handlers on the Tooltip still fire.
- The bubble is `pointer-events: none` and lives on `--ornie-z-tooltip`.

## Examples

```jsx
// Sidebar rail item — name + shortcut
<Tooltip content="Quick Find" kbd={['⌘', '/']} placement="right">
  <IconButton aria-label="Quick Find" icon={<Icon name="search" />} />
</Tooltip>

// Top-bar sync affordance
<Tooltip content="Sync status" placement="bottom">
  <IconButton aria-label="Sync status" icon={<Icon name="clock" />} />
</Tooltip>

// Pinned open (docs and variant grids only)
<Tooltip content="Appears above" open>
  <Button variant="secondary">Trigger</Button>
</Tooltip>
```

## Calm rules

- **Never required for understanding.** The trigger keeps its own `aria-label`; the tooltip is reinforcement, and its shortcut caps are decorative — the same info is reachable in settings.
- One quiet fade in (`--ornie-duration-quick`), no scale, no bounce, no arrowing motion.
- Bubble copy is a name or one plain sentence — no headings, no calls to action, no exclamation marks.
