# TextArea

> Screens: 1l task notes field, 1p/1q note editing adjacents, journal entry. Tier: primitives. Since 0.2.0.

The multi-line sibling of Input, on the same field skin: task notes, journal entries, feedback boxes. It is a separate component by decision (roadmap Phase 1) — not a `multiline` prop on Input — so each keeps a small, honest API.

**Use when** the user writes more than one line of plain text.
**Don't use for** single lines (Input), rich or linked text (Prose + the app's editor own 1p/1q note *reading and editing* surfaces — TextArea is the plain-text field, not the editor), or code.

## API notes

- Same field anatomy as Input: `label` above, `hint` below, `error` (ReactNode message) replaces the hint, sets `aria-invalid`, and wires `aria-describedby`. FormField (Phase 2) will orchestrate grouped messages; the props stay.
- `size` matches Input's paddings/type scale (`sm` 13px / `md` 15px / `lg` 16px — iOS never zooms at lg). Height is content-driven: pass the native `rows` (and `maxLength`, `enterKeyHint`, etc. — everything native reaches the `<textarea>`). No auto-grow at 0.2.0; wire that in the app if a screen needs it.
- Users may drag the resize handle vertically; horizontal resize is off (the parent owns width). Disabled fields don't resize.
- `ref` forwards to the `<textarea>`. No `leading`/`trailing` slots — icons floating over flowing text help nobody.

## Examples

```jsx
// 1l task notes
<TextArea label="Notes" placeholder="Anything worth remembering…" rows={3} hint="Saved as you type." />

// Journal entry (lg = comfortable 16px writing size)
<TextArea size="lg" label="Today" rows={8} value={entry} onChange={(e) => setEntry(e.target.value)} />

// Quiet failure — plain words, content never lost
<TextArea label="Journal entry" error="This entry could not be saved. It is kept locally." defaultValue={draft} />
```

## Calm rules

- No character-count tickers counting at the user; if a limit matters, state it once in `hint`.
- Errors are a border change plus one plain sentence — never clear the user's text, never exclaim.
- Placeholders invite ("Anything worth remembering…"), never assign homework.
