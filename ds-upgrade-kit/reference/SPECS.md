# Ornie — Final Layout Spec

Same content as the in-file spec layer. All numbers measured from the bound designs; decision refs point at DECISIONS.md v1.3.

## Foundations (everywhere)

- **Type.** Manrope (`--ornie-font-sans`). Task rows 15px/medium · metadata 11.5px · section labels 10.5px caps +1px tracking · screen titles 25–29px/bold −0.5px.
- **Color.** Semantic tokens only — never hex, never raw scales unless no semantic token fits (D-44/D-60). Muted status colors; one primary button per view.
- **Space & shape.** 4px grid (`--ornie-space-*`). Radius: 12px controls (`md`), 16px cards/sheets (`lg`). Borders over shadows; warm, low elevation.
- **Touch & motion.** Hit targets ≥44px. No entrance animations; `prefers-reduced-motion` respected by the DS. Nothing on screen shouts (D-01).
- **Theming.** `data-ornie-theme="dark"` flips semantic tokens only (D-67). App follows OS + manual override. Print/export always Riverbed light (D-61).
- **Copy.** Quiet, zero urgency — "3 things for today", never "7 overdue!" (D-40).

## Phone + tablet (D-68)

- **Nav dock.** 84px tall on `surface-sunken` with top border; 5 slots. Raised capture button 54px ø, lifted −26px, 4px background ring, `shadow-md`. Active item `accent-text`, inactive `text-subtle`.
- **Header.** One line: greeting 25px/bold · day ring 46px ø (conic fill, 37px inner disc) · Ask sparkle 32px ø bordered circle. Date kicker 11px caps `accent-text`.
- **Task rows.** 23px ø circle with 2px stroke · title 15px/medium · metadata 11.5px subtle with 6px project dot · 12px vertical padding · hairline separators.
- **Capture.** Half sheet: grabber, input, parse chips, keyboard-safe. Widgets / lock screen / share sheet write through the sliver intent queue (D-45).
- **Triage.** Card + chips with swipe shortcut — swipe right → Today; chips: Today · This week · Someday · project. One decision per card.
- **Tablet.** Rail + desktop top bar + panes; capture and Ask float as desktop-style overlays. Android: predictive back, share target, Glance widgets (D-03).

## Desktop (web PWA + Tauri)

- **Frame.** Sidebar 264px expanded / 60px rail on `surface-sunken` · top bar 52px · content column max 640px centered (680–720px module views) · Ask panel 372px right.
- **Overlays.** Quick capture 540px, Quick Find 560px, top-centered on the overlay wash. Focus, close-the-day, onboarding take the full canvas on `--ornie-bg`.
- **Keyboard.** ⌘K capture (in-app) · ⌘/ Quick Find · ⌥Space global capture via Tauri (configurable, works over any app, D-24).
- **Data.** Views render from local SQLite live queries — no spinners for local data (D-23). The 20:00 nudge is a local notification (D-36).

## CLI

- Bare `ornie "…"` = capture; local parser handles dates, #tags, @projects, [[links]].
- Full device: own SQLite replica (shares the desktop file when present), device-code auth, offline-first, never a REST wrapper (D-46).
- Every read takes `--json`. `ornie mcp serve` = MCP tools over stdio against the local replica (D-30).
- One surface registry: the same verbs render as CLI commands, MCP tools, and /v1 routes (D-47).

## Burrow (E2EE vault)

- Envelopes `{v, n, ct}` — XChaCha20-Poly1305. Passphrase → Argon2id → unlock key → workspace vault key, wrapped per device public key. Plaintext keys only in OS keychains (D-53).
- `vault.*` ops never fire webhooks, never reach Ask, never enter FTS/vector indexes — enforced in kernel + query layer (D-53/D-54/D-66).
- Vault attachments encrypt client-side before upload; server stores ciphertext; thumbnails on-device (D-63).
- Lost passphrase = lost entries; one-time recovery code; stated plainly at setup. UI: Burrow/Toca; schema/API: `vault` (D-40).
