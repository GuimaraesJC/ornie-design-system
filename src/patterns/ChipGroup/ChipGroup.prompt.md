# ChipGroup

> Screens: 2c triage targets, 1l tags, 2b capture parse row, 2f/2g filters, D:Upcoming/Anytime/Someday filters. Tier: patterns. Since 0.2.0.

A wrapping row of Chips with the selection state managed for you: exclusive pick (`single`) or independent toggles (`multi`), plus one-tab-stop keyboard navigation. It composes the Chip primitive — same pill, same sizes, same calm.

**Use when** the user picks from a small labelled set: a triage target, a tag filter, a set of active filters.
**Don't use for** removable tag lists — `onRemove` is deliberately not ChipGroup's job. A list of removable tags is just Chips with `onRemove` in a flex parent (`display: flex; flex-wrap: wrap; gap: 8px`); there is no selection to manage. Also not for exclusive 2–4-way mode switches that must always show every option in one pill (SegmentedControl), or navigation (Tabs).

## API notes

- Controlled only, discriminated on `mode`:
  - `mode="single"` — `value: string | null` + `onChange(value)`. Re-tapping the selected chip deselects to `null` unless `required` is set.
  - `mode="multi"` — `value: string[]` + `onChange(values)`. Each tap toggles that value (new picks append).
- `options: Array<{ value, label, leading?, disabled? }>` — the group renders the Chips itself; don't pass Chip children. `leading` is decorative (icon or dot). Disabled options render inert and dimmed, and keyboard skips them.
- `size` (`sm`/`md`) is passed to every chip — filter rows read best at `sm`.
- Semantics: container is `role="group"`; always give it a name via `aria-label`. Selection state lives on each chip as `aria-pressed` (from Chip).
- Keyboard: roving tabindex — the group is one tab stop. All four arrow keys move focus between chips (wrapping); Home/End jump; Space/Enter toggles the focused chip (Chip's own button handles activation). Arrows move focus only — they never change selection (unlike SegmentedControl's radio pattern, where multi-select makes arrow-selects wrong).
- Layout: flex wrap with an 8px gap; width belongs to the parent.

## Examples

```jsx
// Triage target — single, deselectable (2c: "not yet decided" is a valid state)
<ChipGroup
  mode="single"
  aria-label="Send to"
  options={[
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'someday', label: 'Someday' },
  ]}
  value={target}
  onChange={setTarget}
/>

// Tag picker — multi (1l)
<ChipGroup
  mode="multi"
  aria-label="Tags"
  options={tags.map((tag) => ({ value: tag.id, label: tag.name, leading: <Icon name="tag" /> }))}
  value={selectedTags}
  onChange={setSelectedTags}
/>

// Filter row — single, required so one filter is always active (2f)
<ChipGroup
  mode="single"
  size="sm"
  required
  aria-label="Show"
  options={[
    { value: 'all', label: 'All' },
    { value: 'scheduled', label: 'Scheduled', leading: <Icon name="calendar" /> },
    { value: 'waiting', label: 'Waiting', leading: <Icon name="person" /> },
  ]}
  value={filter}
  onChange={setFilter}
/>
```

## Calm rules

- Selection is Chip's quiet `--ornie-accent-subtle` wash — the group adds no animation of its own.
- Deselection in `single` mode is allowed by default: "no decision yet" is a legitimate, unshamed state. Use `required` only where the app genuinely needs an answer.
- Options are plain words; no counts inside chips, no red, no urgency ordering tricks.
