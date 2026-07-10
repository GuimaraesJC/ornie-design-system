# Input

> Screens: 2b capture, 1v settings, 1u Ask sheet, D:quick-capture, Burrow passphrase (Locked). Tier: primitives. Since 0.1.0; `leading`/`trailing` slots since 0.2.0.

The single-line labelled text field on the shared field skin (`styles/field.css`): capture bars, passphrase entry, settings values, search rows.

**Use when** the user types one line of text (or a password, email, number…).
**Don't use for** multi-line text (TextArea), picking from a fixed list (Select), commands with results (CommandOverlay composes an Input, Phase 3), or labelled groups of several fields (FormField, Phase 2, owns shared label/message wiring).

## API notes

- Sizes: `sm` 32 / `md` 40 / `lg` 48 (px). `lg` is the capture size — 16px text so iOS never zooms.
- `leading` is decorative (`aria-hidden`, never intercepts clicks): an `<Icon>` at the field's 16px glyph measure.
- `trailing` sits inside the frame on the right. Clicks fall through to the input except on interactive children — a clear `<IconButton size={32}>` works, a Kbd hint span stays inert. It is not hidden from assistive tech; label interactive children (`aria-label="Clear"`). Sized for one compact control; don't stack several.
- `error` takes the message itself (ReactNode) — it replaces `hint`, sets `aria-invalid`, and wires `aria-describedby`. FormField (Phase 2) will orchestrate messages across grouped fields; the prop stays.
- Everything native passes through to the `<input>`: `inputMode`, `enterKeyHint`, `type`, `autoComplete`, `data-*`… `ref` forwards to the `<input>` too. Mobile sheets should set `inputMode`/`enterKeyHint` (e.g. capture: `enterKeyHint="done"`).
- Deprecated: `iconStart` → `leading`, `iconEnd` → `trailing` (dev warning; removed in 0.3.0).

## Examples

```jsx
// 2b capture — the big friendly line
<Input size="lg" label="Capture" placeholder="What needs doing?" enterKeyHint="done" autoComplete="off" />

// Quick-find style — leading icon, trailing clear button when there is text
<Input
  leading={<Icon name="search" />}
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  trailing={query ? (
    <IconButton aria-label="Clear" size={32} onClick={() => setQuery('')}>
      <Icon name="x" size={16} />
    </IconButton>
  ) : undefined}
/>

// Burrow passphrase — plain words, no drama
<Input type="password" label="Passphrase" hint="Lost passphrase means lost entries. Keep the recovery code safe." leading={<Icon name="lock" />} />
```

## Calm rules

- Error state is a quiet border change plus a plain sentence — no shake, no red flood, no exclamation marks.
- Placeholders invite, never nag: "What needs doing?", not "Add a task now!".
- The trailing slot is for one quiet affordance (clear, shortcut hint) — never a badge, spinner-by-default, or anything that pulses while the user types.
