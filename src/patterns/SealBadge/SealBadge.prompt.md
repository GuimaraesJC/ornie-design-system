# SealBadge

> Screens: Burrow entries (hub §04 Locked/Open), 1l task detail when vaulted, 2l/D:Journal. Tier: patterns. Since 0.2.0.

The Burrow chip: a 10px lock and "Sealed" in a quiet accent wash. It marks content the user chose to seal — the one themed noun in the product is Burrow, and this badge is how sealed things say so everywhere else.

**Use when** a task, journal entry, or note is vaulted and a list or detail view needs to say so.
**Don't use for** habits or anything the user never sealed — the 2j Habits screen deliberately has no SealBadge; privacy there is the default, not a state. Also not for interactive locking (that's the app's Burrow flow) or generic "private" markers.

## API notes

- Static, non-interactive: renders a `<span>`. No `onClick`, no hover state — it states a fact, it doesn't guard one. Sealing/unsealing lives in the Burrow flow.
- `detail` appends "skips Ask · webhooks · search" in `--ornie-text-subtle` after the pill — the plain-words promise of what sealed means. One line; use where there's room (Burrow open view, 1l detail).
- `label` overrides "Sealed" (i18n). The lock glyph is decorative (`aria-hidden` via Icon's default); the pill text is the accessible content.
- Pairs with `RedactedBars` — the badge names the state, the bars stand in for the content.

## Examples

```jsx
// Vaulted task in a list (1l)
<TaskRow title="Therapy notes — Tuesday" trailing={<SealBadge />} onToggle={toggle} />

// Burrow open view — full promise
<SealBadge detail />

// Journal entry header (2l, D:Journal)
<MetaLine>Fri, Jul 3<SealBadge /></MetaLine>
```

## Calm rules

- Accent wash, never a warning color: sealing is a calm choice, not an alert.
- No pulsing, no badge counts of sealed items — Burrow never advertises how much it holds.
- Copy stays plain: "Sealed", not "Encrypted", "Locked down", or any jargon.
