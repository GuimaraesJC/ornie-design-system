# Icon

> Screens: all — dock, sidebar, rows, buttons, empty states. Tier: primitives. Since 0.2.0.

46 curated glyphs (from Lucide, ISC) rendered at stroke 1.9 with round caps/joins, named in plain Ornie nouns: `gear` not "settings-2", `person` not "user-circle", `dots-horizontal` not "ellipsis".

**Use when** a control or row needs a pictogram. Color always inherits (`currentColor`) — set it on the parent with a text token.
**Don't use for** logos, illustrations, or one-off artwork; and never as the only carrier of meaning (pair with text or an `aria-label` on the *control*).

## API notes

- `<Icon name="inbox" size={20} />` — sizes 16 / 20 / 24 only.
- Tree-shakeable individual exports: `<IconCheck />`, `<IconChevronRight />`, ….
- Decorative by default (`aria-hidden`). Pass `label` only when the icon itself is the information — inside icon-only buttons, label the button instead.
- Adding a glyph = edit the `GLYPHS` map in `scripts/build-icons.mjs`, run `pnpm icons`. Never hand-edit the generated files.

## Examples

```jsx
<Button leading={<IconPlus />}>New task</Button>

<span style={{ color: 'var(--ornie-text-subtle)' }}>
  <Icon name="repeat" size={16} /> weekly
</span>

// Standalone informative icon (rare) — label it
<Icon name="lock" size={16} label="Sealed" />
```

## Calm rules

- Icons are quiet furniture: `--ornie-text-subtle`/`--ornie-text-muted` at rest, never accent-colored unless the state is active.
- No filled/duotone variants, no badges layered onto glyphs, no animated icons.
