# Toast

> Screens: undo everywhere — complete/delete/triage (2a, 2c, 1i swipes), export-ready, device-added, 1n close-day, D:Focus/Close day. Tier: patterns. Since 0.2.0.

The undo mechanism (D-50). In Ornie, destructive and completing actions happen immediately and are *reversible*, not confirmed: the toast is the quiet receipt with the way back ("Done · Undo"). One inverse pill, bottom-centered, gone in 8 seconds.

Three pieces from this folder:

- `Toast` — the presentational pill (message + optional single action).
- `ToastProvider` + `ToastHost` — the queue: wrap the app once, render one host.
- `useToast()` — `{ toast(options), dismiss(id) }` from anywhere below the provider.

**Use when** an action just happened and the user might want it back (undo), or a background moment completed (export ready, device added).
**Don't use for** confirmations before an action (don't — undo after, D-50), errors that need reading (inline or Modal), success celebrations (nothing in Ornie celebrates at the user), or anything persistent (toasts leave on their own).

## API notes

- `toast({ message, action?, onAction?, duration? })` returns an id; `dismiss(id)` removes it (animated if visible, silently if still queued).
- **Max ONE visible.** New toasts queue behind the current one — they never stack. A stack of receipts is noise.
- Auto-dismiss after 8s (long on purpose — undo needs time). The timer **pauses while hovered and while focus is inside the toast**, so the action is reachable by keyboard before dismissal; it resumes when both leave.
- The action is a single slot: label via `action`, handler via `onAction`. Pressing it runs the handler and dismisses the toast. Undo is an inverse operation, not a confirmation dialog.
- `ToastHost` portals to `document.body` and is mounted persistently so the live region exists before the first toast. z-index: `var(--ornie-z-toast, 1200)` — the token is pending in `tokens.json`.
- Enter/leave is a fade + 4px rise in `--ornie-duration-gentle`; the token layer collapses it under reduced motion.

## Accessibility

- The host region is `aria-live="polite"`. **Nothing in Ornie is assertive.** A toast never interrupts what a screen reader is saying.
- The action button is a real `<button>` in the tab order with the standard focus ring; the pause-on-focus-within timer guarantees it cannot vanish mid-press.
- Standalone `<Toast>` (outside `ToastHost`) is inert markup — if you render one yourself, you own its live-region semantics.

## The inverse-ink exception (documented, sanctioned)

The action is `--ornie-text-inverse` semibold + underline, **not** `--ornie-accent-text`: accent ink fails AA contrast on `--ornie-surface-inverse`. On this one surface, weight and underline carry the affordance instead of color. Do not "fix" it back to accent.

## Examples

```jsx
// App shell — once
<ToastProvider>
  <App />
  <ToastHost />
</ToastProvider>

// Completing a task (undo, D-50)
const { toast } = useToast();
toast({ message: 'Done', action: 'Undo', onAction: () => restoreTask(id) });

// Background moment — no action needed
toast({ message: 'Export ready', action: 'Download', onAction: openExport });
```

## Calm rules

- No success-green toasts, no icons by default, no progress bar on the timer — the toast is a receipt, not a reward.
- Copy is plain and unexclaimed: "Done", "Let go. It rests in Trash for 30 days." — never "Deleted!" or "Great job".
- One at a time, always; the queue exists so the screen never fills with pills.
- 8 seconds, then it leaves quietly. Nothing pulses, bounces, or counts down at the user.
