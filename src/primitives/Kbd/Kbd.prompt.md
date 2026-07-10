# Kbd

> Screens: D:top-bar tooltips, D:Quick capture / Quick Find footer (CommandOverlay), D:settings shortcut list, D:mobile companion / SDK view. Tier: primitives. Since 0.2.0.

Key caps for keyboard shortcuts: ⌘K, ⌘/, ⌥Space, ↵, esc. 11px caps on `--ornie-surface-sunken` with a hairline border — quiet chrome that reads as hardware, not as a control.

**Use when** the UI names a keyboard shortcut: tooltip suffixes, CommandOverlay footer hints, the settings shortcut list, docs surfaces.
**Don't use for** anything interactive (it is inert display), badges or counts (Badge), or inline code (Prose, Phase 4).

## API notes

- `keys={['⌘','K']}` renders one cap per entry, grouped with a tight 3px gap. `keys` wins over `children` when both are given.
- `children` renders a single cap: `<Kbd>esc</Kbd>`.
- Semantics: the group wrapper is a `<kbd>` containing one nested `<kbd>` per key — the HTML pattern for "keys pressed together".
- **Decorative by default in tooltips.** When the caps repeat information available elsewhere (a tooltip label, a menu item), the parent wraps them in `aria-hidden` — Tooltip's `kbd` prop already does this. Only the settings shortcut list exposes them to assistive tech, paired with a text description of the action.
- `onInverse` restyles caps for inverse surfaces (the Tooltip bubble): transparent ground, `--ornie-text-inverse` ink dimmed by element opacity. Tooltip passes it for you; you rarely set it by hand.
- min-width keeps single glyphs square-ish; multi-character caps (`esc`, `Space`) grow naturally. Never fix a width.

## Examples

```jsx
// CommandOverlay footer hints
<span>
  <Kbd keys={['↑', '↓']} /> navigate · <Kbd>↵</Kbd> open · <Kbd>esc</Kbd> close
</span>

// Settings shortcut row (exposed to assistive tech — no aria-hidden here)
<ListRow trailing={<Kbd keys={['⌥', 'Space']} />}>Global capture</ListRow>

// Inside a Tooltip — use the kbd prop instead of composing by hand
<Tooltip content="Quick Find" kbd={['⌘', '/']}>
  <IconButton aria-label="Search" icon={<Icon name="search" />} />
</Tooltip>
```

## Calm rules

- Caps never light up, animate, or react to key presses on screen. They are reference, not feedback.
- Shortcuts are always optional information — every action a Kbd describes is reachable by pointer or menu (a11y floor).
- Muted ink (`--ornie-text-muted`) on sunken ground; a Kbd is never the loudest thing in its row.
