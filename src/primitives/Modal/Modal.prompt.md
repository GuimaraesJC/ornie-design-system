# Modal

> Screens: 2i empty-trash confirm, 1z tablet overlays, D:quick-capture, D:quick-find (via CommandOverlay, Phase 3), D:Trash confirm. Tier: primitives. Since 0.1.0; upgraded 0.2.0.

The blocking dialog: a panel on the `--ornie-overlay` scrim, portaled to `<body>`. One decision or one small form at a time — confirmations, quick capture, renames.

**Use when** the user must finish (or dismiss) one thing before returning to the page.
**Don't use for** mobile flows (Sheet — thumb-reachable, shells tier), non-blocking notices (Toast), side context (PanelDrawer), or anything with more than one screen of content — that's a page, not a dialog.

## API notes

- Controlled: `open` + `onClose`. The component never closes itself; Escape, scrim click, and the × all call `onClose`.
- `size`: `sm` 400 / `md` 540 (default) / `lg` 680 px max-width.
- `placement`: `center` (default) or `top` — pinned 12vh from the top, the quick-capture / Quick Find position (SPECS: desktop overlays are top-centered). CommandOverlay (Phase 3) composes `placement="top"`.
- `initialFocus`: ref focused on open; defaults to the panel. Focus is trapped inside while open and **returns to the opener** on close.
- `dismissible={false}` disables Escape and scrim-click closing (the × still works if shown) — reserve it for destructive-loss cases like an unsaved editor. `closeOnOverlayClick` is **deprecated** — it maps to `dismissible` with a dev warning; removed in 0.3.0.
- `title`/`description` wire `aria-labelledby`/`aria-describedby` automatically; `footer` is the right-aligned action row.
- `className`/`style`/rest and the forwarded ref land on the dialog panel.
- `flush` (since 0.2.0) removes the body padding so children run edge-to-edge — CommandOverlay composes it for its input row / results / footer bar.
- `container` (since 0.2.0) portals somewhere other than `document.body` — for embedding and the variant grid; apps normally omit it (contained modals skip the scroll lock and focus management).

## Examples

```jsx
// Confirmation (2i empty trash) — danger is for the action, never the chrome
<Modal open={confirming} onClose={cancel} size="sm"
  title="Empty trash?" description="Removes 12 items. This can't be undone."
  footer={<><Button variant="ghost" onClick={cancel}>Cancel</Button>
    <Button variant="danger" onClick={emptyTrash}>Empty trash</Button></>} />

// Quick capture (D:quick-capture) — top placement, input focused on open
<Modal open={capturing} onClose={close} placement="top" initialFocus={inputRef}
  title="Quick capture" showCloseButton={false}>
  <Input ref={inputRef} placeholder="What's on your mind?" />
</Modal>

// Small form
<Modal open={renaming} onClose={close} title="Rename project"
  footer={<Button onClick={save}>Save changes</Button>}>
  <Input label="Project name" value={name} onChange={setName} />
</Modal>
```

## Calm rules

- Entrance is a fade only (`--ornie-duration-gentle`) — no slide, no zoom, nothing under reduced motion.
- One modal at a time; never stack dialogs.
- Confirmation copy states the fact plainly — no exclamation marks, no alarm phrasing. Destructive intent lives in the `danger` Button, not in red titles or icons.
