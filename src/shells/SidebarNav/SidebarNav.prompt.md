# SidebarNav

> Screens: D:all views (Frame), 2d tablet base (rail), 1z tablet overlay (rail). Tier: shells. Since 0.2.0.

The desktop frame's left sidebar: 264px expanded / 60px rail, full height on `--ornie-surface-sunken` with a right hairline. It owns the chrome (ground, widths, item look); the app owns the content, the routing, and the collapse control + persistence — `collapsed` is just state you pass in.

Composed from two exported sub-components:

- **`SidebarGroup`** — one column of items with an optional 10.5px caps caption (`--ornie-text-subtle`). Groups are real lists (`<ul role="list">`, one `<li>` per item; the role is restated because `list-style: none` drops list semantics in some engines), labelled by the caption via `aria-labelledby`. In rail mode the caption stays for assistive tech (visually hidden) and a short 24px hairline keeps the group rhythm.
- **`SidebarItem`** — one nav row: 18px `leading` slot + 13.5px label (`children`) + optional trailing. Renders a `<button>` (with `onSelect`) or an `<a>` (with `href`). `active` = `--ornie-selected` wash + `--ornie-accent-text` ink + `aria-current`.

**Use when** building the desktop/tablet frame (the one left nav per window).
**Don't use for** mobile bottom navigation (Dock), in-content section nav (Tabs), grouped content lists (ListSection), or menus/pickers.

## API notes

- `SidebarNav`: `header` slot (workspace/greeting) · `children` (groups) · `footer` slot (settings, plan card — pinned above a top hairline) · `collapsed` · `aria-label` (defaults to "Main"; pass a distinct one if a page ever has two nav landmarks). Renders `<nav>`; the body scrolls, header/footer stay put.
- `SidebarItem.leading` takes an `<Icon>` (CSS sizes the glyph to the spec's 18px), a `<ProjectDot>`, or a 16px `<ProgressRing>` — the leading wrapper sets `--ornie-progress-ring-disc: var(--ornie-surface-sunken)` so the mini-ring's center disc blends into the sidebar ground. The slot is decorative (`aria-hidden`).
- `count` renders a quiet neutral count Badge (informational, never alarm-colored — D-01). `trailing` takes anything else ("8/12") and wins over `count`.
- **Rail mode (`collapsed`)** is built in per item: labels and trailing content aren't rendered, items center to 36px squares (44px on touch), and each item wraps itself in a right-placed `Tooltip` carrying the label (+ "· count" when set) and the optional `kbd` caps (`kbd={['⌘','1']}`, decorative). The control gets an `aria-label` from its string `children` — keep item labels plain strings.
- Header/footer slots render unchanged in rail mode — pass rail-safe content (icon-sized) when collapsed; the app already knows the state.
- Keyboard: items are native buttons/links — Tab reaches every item in order, Enter/Space activates, standard 2px `--ornie-focus-ring` outline. No roving tabindex: a sidebar is a plain list of links, not a composite widget.

## Examples

```jsx
// Desktop frame — expanded, app-controlled collapse
<SidebarNav header={<WorkspaceSwitcher />} footer={settingsGroup} collapsed={railPref}>
  <SidebarGroup>
    <SidebarItem leading={<Icon name="sun" />} active={view === 'today'} onSelect={() => go('today')} kbd={['⌘','1']}>
      Today
    </SidebarItem>
    <SidebarItem leading={<Icon name="inbox" />} count={inboxCount} onSelect={() => go('inbox')}>
      Inbox
    </SidebarItem>
  </SidebarGroup>
</SidebarNav>

// Project rows — identity dot or mini progress ring in the leading slot
<SidebarGroup label="Projects">
  <SidebarItem leading={<ProjectDot color="river" />} onSelect={openProject}>Website redesign</SidebarItem>
  <SidebarItem leading={<ProgressRing size={16} value={8/12} label="Q3 finances progress" />} trailing="8/12" onSelect={openProject}>
    Q3 finances
  </SidebarItem>
</SidebarGroup>

// Router links instead of buttons
<SidebarItem leading={<Icon name="book" />} href="/journal" active={path === '/journal'}>Journal</SidebarItem>
```

## Calm rules

- Counts are quiet neutral pills — informational, never red, never pulsing (D-01). `count={0}` renders nothing (Badge's silence rule).
- Active is a wash (`--ornie-selected`), hover is a lighter wash (`--ornie-hover`); nothing slides, glows, or animates on navigation.
- Labels are plain daily nouns ("Today", "Inbox", "Journal") — no jargon, no emoji (D-40).
- Overdue/behind state never colors the sidebar; a project mini-ring just shows progress and never turns red (R-5).
