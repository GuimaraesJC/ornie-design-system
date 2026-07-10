# Avatar

> Screens: 2k people, D:people, share-later surfaces. Tier: primitives. Since 0.2.0.

A person, rendered calmly: their photo if there is one, otherwise auto-initials on a deterministic pastel tint, otherwise a quiet person glyph. Ornie's people views (2k, D:people) lean on initials — most contacts never have a photo.

**Use when** a row, card, or header refers to a person.
**Don't use for** projects or modules (ProjectDot, Icon), status (Badge), or as a button — wrap it in the interactive parent instead.

## API notes

- Sizes: `xs` 20 / `sm` 28 / `md` 36 / `lg` 44 / `xl` 56 px (changed in 0.2.0 from 24/32/40/48/64 — visual change, see changeset). Initials scale with the box (9/11/14/17/21px).
- `name` drives both the initials (first letter of first + last word, 1–2 chars) and a deterministic tone tint — the same person always gets the same color. Tones come from the semantic `--ornie-tone-*` pairs; rust is deliberately excluded (no alarm-adjacent colors on people).
- `src` renders the image; a broken or failed load falls back to initials automatically (a new `src` gets a fresh attempt). No `name` and no image renders the person glyph.
- Accessibility: with an image, the `<img>` carries `alt` (defaults to `name`); without, the root is `role="img"` labelled by `alt ?? name`.
- `shape`: `circle` (default) or `square` (radius steps down at xs/sm).
- **No presence dot.** Presence/online state is deferred with sharing (D-17) — do not bolt one on; it will arrive as a designed addition when sharing ships.
- Non-interactive `<span>`; `forwardRef`, `className`/`style`/rest pass through; no outer margins.

## Examples

```jsx
// Person row (2k) — initials with deterministic tint
<Avatar name="Ada Lovelace" size="md" />

// With a photo, falling back to initials if the URL dies
<Avatar src={person.photoUrl} name={person.name} size="lg" />

// Unknown collaborator — quiet glyph, labelled for AT
<Avatar alt="Unknown user" size="sm" />
```

## Calm rules

- Tints are muted tone pairs, never saturated; the same name is always the same color — nothing shuffles between visits.
- No presence pulsing, no status rings, no notification dots on people.
- Broken images fail silently into initials — no broken-image glyph, no error state.
