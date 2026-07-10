# TopBar

> Screens: D:all views (Frame), 2d tablet base, 1z tablet overlay. Tier: shells. Since 0.2.0.

The desktop frame's 52px view bar, transparent over `--ornie-bg`: a quiet view label between two action slots. It sits above the content column, next to SidebarNav.

**Use when** building the desktop/tablet frame — one TopBar per window.
**Don't use for** the in-content greeting/title block (PageHeader owns the 25–29px title, kicker, and DayRing ritual), mobile screens (phones have no top bar — Dock + PageHeader instead), or toolbars inside content (compose IconButtons directly).

## API notes

- Renders a `<header>`. `title` is **not** a heading element — the page's real `<h1>` lives in the content (PageHeader); this is the frame's 17px/semibold view label, truncating with an ellipsis.
- `leading` slot: sidebar collapse toggle IconButton, back button. `trailing` slot: IconButtons, DayRing, the Ask trigger, a sync Spinner when a rare cloud op runs (never a page blocker, D-23). Both slots lay out with an 8px gap; pass fragments.
- `scrolled` fades in the bottom hairline (`--ornie-border-subtle`, `--ornie-duration-quick`) as an overlay line — the bar stays exactly 52px. **The app wires the scroll listener**: the content scroll container is a sibling, so pass `scrolled={scrollTop > 0}` from it.
- Positioning: in the frame the bar is a static flex-column sibling of the scroll container (content scrolls beneath it, as in the desktop mockup), so it ships with no `position` or `z-index`. If your layout makes it sticky instead, set `background: var(--ornie-bg)` and `z-index: var(--ornie-z-dock)` yourself.
- The bar itself has no interactive parts — keyboard behavior belongs to whatever you slot in (IconButtons are fully keyboard-operable on their own).

## Examples

```jsx
// Frame wiring — app owns the scroll state
const [scrolled, setScrolled] = useState(false);
<div className="frame-main">
  <TopBar
    title={viewTitle}
    leading={
      <IconButton aria-label={railOpen ? 'Collapse sidebar' : 'Expand sidebar'} size={32} onClick={toggleRail}>
        <Icon name={railOpen ? 'chevron-left' : 'chevron-right'} size={16} />
      </IconButton>
    }
    trailing={
      <>
        <DayRing done={done} planned={planned} />
        <IconButton aria-label="Ask Ornie" variant="outline" size={32} onClick={openAsk}>
          <Icon name="sparkle" size={16} />
        </IconButton>
      </>
    }
    scrolled={scrolled}
  />
  <main onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}>…</main>
</div>

// Minimal — title only
<TopBar title="Settings" />
```

## Calm rules

- The bar never carries alerts: no badge dots, no red, no counts that shout — a quiet count belongs in the SidebarNav item, not up here (D-01).
- The scroll hairline is the only state change, and it is a fade of a subtle border — nothing slides or bounces.
- Titles are plain view nouns ("Today", "Inbox", "Settings") — never "Dashboard" (D-40).
