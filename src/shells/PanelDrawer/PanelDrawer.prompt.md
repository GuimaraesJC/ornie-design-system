# PanelDrawer

> Screens: D:Ask panel (inline 372), 2d tablet base (inline), 1z tablet overlay (overlay), future detail panels. Tier: shells. Since 0.2.0.

The right side panel: 372px on `--ornie-surface` with its own 1px left hairline. Header (title + close) pins on top, the body scrolls, an optional footer pins below — the Ask input row lives there. Two modes: `inline` sits in the app's flex row and pushes content aside (desktop); `overlay` portals over the `--ornie-overlay` scrim with full dialog semantics (tablet).

**Use when** persistent side context accompanies the main column: the Ask panel, a task/note detail pane.
**Don't use for** phone flows (Sheet), blocking decisions (Modal), or navigation (SidebarNav).

## API notes

- Controlled in both modes: `open` + `onClose`. `open={false}` renders nothing — in inline mode the width collapses via the parent's layout.
- `mode="inline"` (default): no portal, no scrim, no focus trap — it's a landmark `<aside>` in normal flow. `mode="overlay"`: portal + scrim, focus trap, Esc, scrim tap, focus return to the opener, `--ornie-z-drawer`, body scroll lock.
- Header: `title` (14/semibold) + `description` (11.5 subtle) + `leading` slot (the Ask sparkle tile — decorative, `aria-hidden`) + close IconButton. `closeLabel` defaults to `'Close panel'`; `showCloseButton={false}` hides the ×.
- `footer` pins below the scrollable body — compose `Input` for the Ask prompt row.
- The panel is labelled by `title`; pass `aria-label` instead when untitled.
- Overlay extras: `initialFocus`, `dismissible={false}` (disables Esc + scrim tap), and `container` for portaling somewhere other than `document.body` — embedding/testing only; contained panels skip the scroll lock and focus management.
- `className`/`style`/rest and the forwarded ref land on the panel `<aside>` in both modes.

## Examples

```jsx
// D:Ask panel — inline in the app frame's flex row
<div className="app-frame">           {/* display:flex */}
  <main>…content column…</main>
  <PanelDrawer open={askOpen} onClose={closeAsk} title="Ask"
    description="reads your tasks, notes, projects & modules"
    leading={<SparkleTile />} footer={<AskInputRow />}>
    <AskConversation />               {/* app-side; DS ships the shell */}
  </PanelDrawer>
</div>

// 1z tablet — same panel floats as an overlay
<PanelDrawer open={detailOpen} onClose={closeDetail} mode="overlay"
  title="Task" footer={<Button fullWidth>Mark done</Button>}>
  <TaskDetailFields task={task} />
</PanelDrawer>
```

## Calm rules

- The overlay entrance is a ≤16px slide paired with a fade in `--ornie-duration-gentle`; reduced motion collapses it to an appear. Inline mode does not animate — layout changes are the app's concern.
- The panel never opens itself; it appears only in response to the user.
- Ask content stays quiet: suggestions are Chips, nudges use `--ornie-accent-subtle` — nothing in the panel pulses or counts at the user.
