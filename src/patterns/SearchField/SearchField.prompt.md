# SearchField

> Screens: 1t browse, 2f anytime/someday filters, 1o notes list, D:quick-find trigger, D:top bar. Tier: patterns. Since 0.2.0.

Input dressed for search: leading search icon, a clear button that appears once there is a value, and an optional keyboard-shortcut hint while the field is empty. One component so every search row in Ornie looks and behaves the same.

**Use when** the user filters or looks something up in place — list filters, notes search, the top-bar/quick-find trigger.
**Don't use for** capture (that's a plain Input, `size="lg"`), command palettes with results (CommandOverlay, Phase 3, composes its own input), or anything where typing creates data rather than narrowing it.

## API notes

- Controlled with a **string payload**: `value` + `onChange(value, event)`. Note the contract difference from Input, whose `onChange` receives the raw event — SearchField hands you the query directly.
- `onClear` runs on the clear button and on Escape; it defaults to `onChange('')`. Focus stays in the input after clearing.
- The trailing slot is exclusive: `kbd` caps (e.g. `['⌘','/']`) show only while empty; the clear button (`ghost` IconButton, 32px, `aria-label` from `clearLabel`, default "Clear search") replaces them the moment there is a value. Neither shows while `disabled`.
- The kbd hint is decorative (`aria-hidden`) — the shortcut itself is the app's to register and to document elsewhere.
- `size` passes straight through to Input (`sm` 32 / `md` 40 / `lg` 48). `placeholder` defaults to "Search"; the accessible name defaults to "Search" too (override with `aria-label`/`aria-labelledby` when the context is more specific, e.g. "Search notes").
- `ref` forwards to the inner `<input>`; all native input attributes pass through. Native WebKit search cancel decorations are hidden — the DS clear button is the one affordance.

## Examples

```jsx
// Notes list filter
<SearchField
  value={query}
  onChange={setQuery}
  placeholder="Search notes"
  aria-label="Search notes"
/>

// Desktop top bar — shortcut hint while empty
<SearchField value={query} onChange={setQuery} kbd={['⌘', '/']} placeholder="Quick find" />

// Custom clear that also resets filters
<SearchField
  value={query}
  onChange={setQuery}
  onClear={() => {
    setQuery('');
    resetFilters();
  }}
/>
```

## Calm rules

- Results update quietly as the user types — no spinner in the field (local reads are instant, D-23), no result counts shouting next to it.
- An empty result set is the list's EmptyState ("Nothing matches yet"), never an alarm inside the field.
- The shortcut hint is a whisper for people who look for it; it never blinks, and clearing never animates beyond the button swap.
