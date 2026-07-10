# IconButton

> Screens: 2a header Ask sparkle, sheet close ×, 2c triage skip, 1q editor toolbar, D:top bar actions. Tier: primitives. Since 0.2.0.

The icon-only circular button. Where Button carries a word, IconButton carries a single glyph and puts the word on `aria-label` instead. Ghost is the workhorse (toolbars, top-bar actions, sheet close); outline is the Ask sparkle's bordered circle; filled is the rare accent action.

**Use when** an action is universally recognizable from its glyph and space is tight (top bars, toolbars, row trailing actions).
**Don't use for** primary actions with any ambiguity — use Button with a label. Not for the dock's raised capture button (that's Dock's own anatomy), not for toggle state (`selected` chips or Switch), not for links (use Link or an `<a>`).

## API notes

- `aria-label` is **required at the type level** — TypeScript errors without it. The icon child is decorative (`aria-hidden` wrapper); the button owns the name.
- Children = exactly one `<Icon>`; the Icon default box (20px) is the intended glyph size. Pass `size={16}` for denser 32px toolbars.
- Sizes are exact px boxes, not t-shirt: `32 | 40 | 44` (default 40). Sizes 32/40 get an invisible ≥44px hit-slop on coarse pointers — never enlarge the visual to compensate.
- Variants: `ghost` (transparent, `--ornie-surface-sunken` hover wash) · `outline` (1px `--ornie-border-strong` on `--ornie-surface` — the SPECS "Ask sparkle 32px ø bordered circle") · `filled` (`--ornie-accent` + `--ornie-text-on-accent`).
- Disabled: opacity .55 + `not-allowed`, same as Button.
- Real `<button type="button">`; `forwardRef` to it; `className`/`style`/rest spread onto it.

## Examples

```jsx
// 2a header — the Ask sparkle: 32px bordered circle
<IconButton variant="outline" size={32} aria-label="Ask Ornie" onClick={openAsk}>
  <Icon name="sparkle" />
</IconButton>

// Sheet header close
<IconButton aria-label="Close" onClick={onClose}>
  <Icon name="x" />
</IconButton>

// 1q editor toolbar — dense 32px ghosts with 16px glyphs
<IconButton size={32} aria-label="Add wikilink">
  <Icon name="link" size={16} />
</IconButton>
```

## Calm rules

- No badge dots, no counts, no pulsing halo on IconButton — if an action needs attention, the surface it opens says so quietly.
- Hover is a wash or a border shift, never a lift or scale.
- No red icon buttons; destructive confirmation is a labelled `danger` Button inside a dialog, never a bare trash glyph acting instantly.
