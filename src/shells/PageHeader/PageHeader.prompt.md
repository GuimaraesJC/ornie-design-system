# PageHeader

> Screens: 2a Today header, all phone list screens (2c Inbox, 1r Projects, 1t…), 1n close-day, D:Today, D:content headers. Tier: shells. Since 0.2.0.

The block that opens every screen: an optional caps kicker (a date or section name), one heading, an optional trailing cluster (DayRing, the Ask sparkle, view controls), and an optional quiet subtitle. It is plain chrome, not an overlay — render it at the top of the content column and let the parent own the spacing below it.

**Use when** a screen or content pane needs its title row — greeting or section.
**Don't use for** card headings (Card owns its content), modal/sheet titles (Sheet and Modal have header slots), or list group labels (ListSection, DateGroupHeader).

## API notes

- `variant="greeting"` is the warm Today voice (2a "Good afternoon, Alex"); `variant="view"` (default) is a plain section title. Both use the mockups' screen-title scale — 25px/bold/−0.5px — greeting just sits a touch tighter (line-height 1.15 vs 1.2).
- `kicker` renders 11px caps `--ornie-accent-text` above the title. Pass sentence case ("Friday, July 3"); the CSS uppercases it.
- `subtitle` renders 13px `--ornie-text-subtle` below the title row — the "3 things for today" line. Informational copy only.
- `trailing` is a right-aligned flex row (12px gap). Typical residents: `DayRing`, the Ask sparkle (`IconButton variant="outline" size={32}`), view IconButtons.
- Semantics: the root is a `<header>`; the title is an `<h1>` by default — pick the level with `as` when the header is not the page's top heading.
- Recipe — count suffix (2c "Inbox · 3 to sort"): put it inside the title, e.g. `<PageHeader>Inbox <span style={{fontSize:'12.5px',color:'var(--ornie-text-subtle)'}}>· 3 to sort</span></PageHeader>`. No dedicated prop; it's title content.
- Long titles wrap; the trailing cluster keeps its box (`flex: none`).

## Examples

```jsx
// 2a — the Today greeting
<PageHeader
  variant="greeting"
  kicker="Friday, July 3"
  subtitle="3 things for today"
  trailing={
    <>
      <DayRing done={2} planned={5} />
      <IconButton variant="outline" size={32} aria-label="Ask Ornie">
        <Icon name="sparkle" size={16} />
      </IconButton>
    </>
  }
>
  Good morning, Jean
</PageHeader>

// A phone list screen
<PageHeader subtitle="23 things this week. Quietly impressive.">Logbook</PageHeader>

// A pane that already has an h1 above it
<PageHeader as="h2" kicker="This week">Weekly review</PageHeader>
```

## Calm rules

- The kicker never shouts: accent-text at 11px is its ceiling — no warning colors, no counts-as-alarm ("7 OVERDUE" does not exist here).
- Subtitles are informational, never scolding — "3 things for today", never "7 overdue!". No exclamation marks.
- The trailing cluster holds quiet objects (DayRing never reddens, the sparkle never pulses). Nothing in the header animates on entry.
