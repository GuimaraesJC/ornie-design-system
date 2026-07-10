# ListSection

> Screens: 2a Today, 2d tablet, 2e Upcoming, 2f/2g Anytime/Someday, 1r/1s projects, 1t Browse, 1v Settings, 2m Pages, Burrow (locked "SEALED · 3 ENTRIES", open settings), D:Today, D:Projects, D:Settings. Tier: patterns. Since 0.2.0.

A labelled run of rows. It draws the 10.5px caps section label, an optional quiet trailing slot (count Badge or a small ghost action), and — most importantly — **owns the hairline separators between its child rows** (1px `--ornie-track`). Consumers never hand-place `Divider`s inside a ListSection.

**Use when** a screen groups rows under a small caps label: settings groups, "THIS WEEKEND", "WAITING", project task groups.
**Don't use for** a single standalone row (just render the row), date-keyed groups in Upcoming/Logbook (that label is a `DateGroupHeader`), or card content that isn't rows (plain `Card`).

## API notes

- `label` is the section title (ReactNode). CSS uppercases it — pass plain words. It renders 10.5px caps in `--ornie-text-muted`: the mockups use `--ornie-text-subtle` here, but that fails the AA audit below 15px, and the roadmap sanctions the adjustment.
- `as` picks the label element: plain `div` by default (most list screens already have a real heading); pass `'h2' | 'h3' | 'h4'` when the section label is the heading for that stretch of page. The root `<section>` is `aria-labelledby` the label either way.
- `trailing` sits at the end of the header line — a count `Badge`, or a quiet `Button variant="ghost" size="sm"` action ("Empty").
- `surface="card"` puts the rows on `--ornie-surface` with a `--ornie-border-subtle` hairline and radius-lg (the 1v settings-group look). Give rows inside it `padded` so content insets 16px; separators stay full-bleed like the mockups. `plain` (default) is transparent — the page owns the ground and the inset.
- Separators are applied to the anonymous children slot (`.ornie-listsection__rows > * + *` border-top). Any child works — `ListRow`, `TaskRow`, or app rows. This is the one sanctioned "slot children" selector; it never reaches into another component's internals.
- No outer margins: stack sections with the parent's `gap` (mockups use 18–32px between sections).

## Examples

```jsx
// Settings group (1v) — card surface, padded rows
<ListSection label="On this phone" surface="card">
  <ListRow padded interactive onClick={openAppearance} title="Appearance" trailing="Riverbed · Light" chevron />
  <ListRow padded title="Quiet hours" trailing={<Switch checked={quiet} onChange={setQuiet} aria-label="Quiet hours" />} />
</ListSection>

// Plain list with a quiet count (2k people, D:sidebar groups)
<ListSection label="Waiting" trailing={<Badge count={3} />}>
  {people.map((p) => <PersonRow key={p.id} {...p} />)}
</ListSection>

// Label as the real heading for the block (Burrow locked)
<ListSection as="h3" label="Sealed · 3 entries">…</ListSection>
```

## Calm rules

- The trailing count is informational — neutral Badge by default, never `danger`, never a red dot.
- The label never carries urgency words or exclamation marks ("WAITING", not "OVERDUE!").
- Separators are `--ornie-track` hairlines — structure, not decoration; nothing heavier.
