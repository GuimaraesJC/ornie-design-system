# RedactedBars

> Screens: Burrow locked list (hub §04 "SEALED · 3 ENTRIES"), notification previews when locked. Tier: patterns. Since 0.2.0.

The stand-in for sealed content: two or three quiet rounded bars where the words would be. It says "there is something here, and you chose not to show it" — nothing more.

**Use when** a list or preview must acknowledge sealed content without revealing anything (Burrow locked list, a locked notification preview).
**Don't use for** loading. **This is not a skeleton loader.** A skeleton promises content is coming and shimmers to say "wait"; RedactedBars is deliberate concealment and never animates — no shimmer, no pulse, ever. If you need a loading placeholder, that's a different (app-side) concern.

## API notes

- `seed` — the sealed item's stable identity (id, date key). Widths and bar count are **deterministic per seed**: an FNV-1a hash of the stringified seed picks the count (2 + lowest bit) and each bar's width from a fixed set (`72 / 88 / 55 / 64 / 81 / 47 %`, indexed by shifted hash bits; a pick that would repeat the bar above it nudges one slot forward). Lists look organic yet never shuffle across renders or sessions — and the widths carry no information about the hidden text.
- `bars` forces 2 or 3 when a layout needs a fixed height (e.g. uniform notification previews); widths still come from the seed.
- `role="img"` + `label` (default "Sealed content") — screen readers get one calm sentence, not a description of decoration.
- Width is the parent's: bars are percentages of the container.

## Examples

```jsx
// Burrow locked list — one card per sealed entry
<Card>
  <SealBadge />
  <RedactedBars seed={entry.id} label="Sealed journal entry" />
</Card>

// Locked notification preview — fixed height across items
<RedactedBars seed={notification.id} bars={2} label="Sealed — unlock Burrow to read" />

// Numeric seeds work too
<RedactedBars seed={42} />
```

## Calm rules

- Never animates. No shimmer, no fade-in, no transition — concealment sits perfectly still.
- Bars are `--ornie-track`: the quietest fill in the system, not a mystery-box tease.
- Pair with `SealBadge` so the state is named in words, not implied by decoration alone.
