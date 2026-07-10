# Ornie — Locked Technical Decisions

**Version 1.3 — 2026-07-07** (v1.0 frozen 2026-07-06; N/O appended that day. v1.3: sections P/Q appended from the confirmed Database turn-2 + Strategy turn-1 canvases; supersede entries D-29.1 and D-38.1 written beneath their originals; section R formalizes two previously footnote/canvas-only decisions as D-67/D-68.)
This ledger is append-only. A decision is changed by adding a superseding entry (`D-nn.1`), never by editing history. Do not relitigate locked decisions in code reviews, AI sessions, or refactors — link here instead.

Legend: every entry is **LOCKED** unless marked otherwise.

---

## A · Product & mission

- **D-01 — Mission.** Ornie is a calm, A(u)DHD-first *personal* productivity platform: capture → triage → today → focus → close-the-day, plus notes with [[wikilinks]] and a journal. Nothing on screen shouts.
- **D-02 — Personal only, forever.** Personal workspaces + "share this object with one person" (read/edit). Company/org features (roles, admin consoles, SSO, seats) are permanently out of scope. One mission.
- **D-03 — One design everywhere.** A single iOS-style design ships on both mobile platforms; Android honors system seams only (predictive back, widgets, share targets). Tablet = rail + top bar + panes; overlays float desktop-style.
- **D-04 — Solo dev + AI tooling.** The codebase is optimized for one human directing AI agents: strict types, small packages, explicit contracts, heavy tests on the core.
- **D-05 — Closed app, open edges.** App source is closed. Public repos: `ornie-design-system` (@ornie/react), `ornie-sdk`, `ornie-docs`.

## B · Architecture

- **D-06 — Headless core (hexagonal).** All business rules live in `@ornie/core` (TypeScript). Storage, network, clock, notifications are **ports**; each platform shell implements them. A shell is UI + adapters, nothing more.
- **D-07 — Non-negotiable rule.** If a feature can't be expressed as a core **command + query**, it doesn't ship. UI never writes to the database directly.
- **D-08 — One schema package.** `@ornie/schema` (Zod) is the single source of shapes → TS types, runtime validation at every boundary, OpenAPI for /v1, JSON Schema for MCP tools, migrations kept adjacent.

## C · Data & sync

- **D-09 — Local-first.** Every device holds the full workspace in SQLite (wasm/OPFS on web, native on desktop/mobile, file on CLI). Reads and writes are always local; offline is the normal case.
- **D-10 — Op-log sync.** Don't sync state; sync changes. Every command emits an immutable operation. The server assigns each op a per-workspace monotonic `seq`, stores it forever, broadcasts it. State = replay(log).
- **D-11 — Master copy.** Postgres (on Supabase) is the single master: op log + materialized snapshot + PITR backups. Device SQLite files are disposable replicas.
- **D-12 — Conflict policy.** Last-writer-wins per field (by server seq) for tasks/rows. Note bodies are Yjs CRDT updates (character-wise merge). `apply()` is deterministic — no clock reads, no randomness inside it.
- **D-13 — Op shape.** `{ op_id (ULID), workspace_id, device_id, session_id, actor_id, seq, type, entity_id, patch, schema_v }`.
- **D-14 — Snapshots are caches.** Cut mechanically at head, per workspace: every ~10k ops or weekly, whichever first. Keep newest + one prior. New devices bootstrap snapshot + tail; devices lagging > ~50k ops re-bootstrap instead of replaying.
- **D-15 — Retention.** Op log kept in full at v1 — no compaction (personal-scale ops are tiny; retention bounds nudges/undo/history). Yjs note docs self-compact. Revisit only if scale changes the math.
- **D-16 — ACL from day one.** Every op carries `workspace_id` + per-object grants are modeled from v1. Every op is authorized server-side; Postgres RLS is the backstop. The client is never trusted.
- **D-17 — Presence-ready protocol from day one.** Session identity on every op; channels named per workspace *and* per object; a sessions table. Supabase Realtime Presence + Yjs awareness. **No presence UI until sharing ships.** Presence is avatar-level on any shareable object; cursor-level only in Yjs text; no global online status; own-device presence hidden; agents get op-log attribution (live agent presence deferred).

## D · Backend & infra

- **D-18 — Deliberately small server.** Jobs: auth · sync relay + storage · webhook ingress/egress · AI proxy · push wake-ups. No page rendering, no per-view endpoints.
- **D-19 — Infra.** Supabase = Auth + Postgres + Realtime. One Node service (Hono + Drizzle + pg-boss, single container on a VPS) for /v1, MCP remote, webhooks, AI proxy. **No AWS.** The sync protocol is ours; Supabase Realtime is a swappable transport.
- **D-20 — Runtimes.** Node **24 LTS** ("Krypton", Active LTS) for server, CLI, MCP. Bun dropped (stability). React **19**. TypeScript strict everywhere.
- **D-21 — No self-hosting.** Sync is hosted-only. The exit is data: full export (Markdown with [[wikilinks]] + JSON), documented formats, public SDK.

## E · Frontend

- **D-22 — Stacks.** Shared: React 19 + Vite + @ornie/react. Web: installable PWA. Desktop: Tauri 2 (global capture hotkey, tray, autostart, auto-update). Mobile: Capacitor + native slivers in Swift/Kotlin (widgets, share extension, lock-screen capture, Live Activity). CLI: Node 24 + commander, same core + same SQLite file as desktop.
- **D-23 — Data access idiom.** **No GraphQL. No React Query.** UI renders from local SQLite live queries — the DB *is* the cache. Zustand for ephemeral UI state only. The public REST /v1 is for builders; the app never renders from it.
- **D-24 — Capture surfaces.** Desktop: OS-global hotkey (default ⌥Space, configurable) via Tauri — works over any app while Ornie runs in tray. In-app ⌘K = command bar (needs focus). Web/PWA: in-app only (browsers can't grant global hotkeys). Phones: widgets, share sheet, lock-screen action.

## F · Security & privacy

- **D-25 — Identity.** Supabase Auth: passkeys + email magic link. httpOnly sessions, rotation, 2FA. Never hand-rolled.
- **D-26 — Encryption stance.** TLS + encryption at rest for everything. **E2EE = opt-in vault** (journal first), stated plainly in UI. Vault items are ciphertext to the server: they never fire webhooks and Ask can't read them. Vault flag modeled in schema from day one; crypto ships phase 4.
- **D-27 — Boundaries.** Zod at every entry. CSP. No LLM/provider keys on devices. Module OAuth tokens encrypted (KMS). Webhooks HMAC-signed + replay-protected. Lockfile + dependency audit in CI. OWASP ASVS L2 checklist. LGPD/GDPR: full export + real delete.
- **D-28 — Rate limits point inward.** Per-key caps on inbound API calls (~60 rpm, burst-friendly). Outbound webhooks: signed, exponential backoff (1m → 5m → 30m → give up ~24h), auto-pause on persistent failure + builder notice.

## G · Business

- **D-29 — Pricing.** Free local-only core (single device). One personal paid plan: sync + cloud AI. No seats, no tiers. Billing (Stripe, single plan) arrives with public beta (phase 4); entitlements checked server-side.
- **D-29.1 — Billing rail (supersedes D-29's "Stripe, single plan" clause; the plan shape stands).** Paddle as merchant of record for web checkout + RevenueCat wrapping StoreKit/Play Billing for store IAP, with region-gated link-outs where storefront rules allow. One server-side `entitlements` table fed by signed idempotent webhooks from both rails; the app reads entitlements via sync, never a store SDK. Full detail in D-64. Timing unchanged: billing arrives with public beta (phase 4).

## H · Ecosystem

- **D-30 — Ornie is an MCP server.** Tools mirror core commands (capture, list_today, complete_task, search_notes, file_inbox_item, close_day, …). Local stdio via CLI (`ornie mcp serve`); hosted remote with OAuth.
- **D-31 — Modules.** A module = manifest (permissions, rules, block schemas) + external MCP/webhook endpoint. Modules never run code inside Ornie. Distribution: curated directory at launch.
- **D-32 — Public API.** REST `/v1` + webhooks, OpenAPI generated from @ornie/schema. OAuth for user-facing apps; scoped API keys for scripts (incl. capture-only scope). Dogfood rule: hosted MCP and CLI remote mode are clients of this same API.
- **D-33 — Browser extension.** One WebExtension (Chrome/Edge/Firefox/Arc; Safari deferred): captures URL + title + selection via `/v1` capture endpoint + capture-scoped key; offline queue in extension storage; capture-only (no reads). Phase 4.
- **D-34 — Importers.** Things, Todoist, Obsidian, Apple Reminders — the adoption path, alongside full export.

## I · AI

- **D-35 — Ask is hybrid.** Local: deterministic NL capture parser + on-device embeddings (offline, private). Cloud: Claude with tool-use over the same MCP tools third parties get. Server-side proxy (keys never on device), visible local/cloud switch, BYO-key option. Ask ships late (phase 4); nudges are core rules over the op log — deterministic, free, private, no AI.

## J · Notifications

- **D-36 — Local by default.** The single 20:00 nudge is a local notification scheduled on-device. Push (APNs/FCM) exists only as silent sync wake-up and future shared-item events. Widgets refresh from the local store on OS budgets. Focus timer Live Activity (iOS) / ongoing notification (Android) in phase-3 scope.

## K · Ops & QA

- **D-37 — Testing bar.** Core = pure functions, unit-tested to death. Sync gets property-based tests (op interleavings converge; snapshot+tail ≡ full replay; re-apply is idempotent). Playwright smoke per shell.
- **D-38 — Observability.** Sentry client+server with PII scrubbing. No analytics beyond counts you'd publish.
- **D-38.1 — Observability re-sequenced (supersedes D-38's tooling and "no analytics" clauses).** Errors: PostHog error tracking from day one; Sentry added when phase-3 native slivers ship (Swift/Kotlin crash symbolication), PII-scrubbed; crash diagnostics are a separate toggle from analytics. Product analytics now exist but are opt-in, default off: ~20 allowlisted count-level typed events (detail in D-59). The spirit of "no analytics beyond counts you'd publish" survives as the allowlist bar.
- **D-39 — Releases.** GitHub Actions. Web continuous; Tauri auto-update channel; TestFlight / Play internal; CLI + SDK on npm. Versioned SQLite migrations ship with the app (old devices upgrade data offline).

## L · Roadmap (each phase ships something usable)

- **Phase 0** — core + schema + local web app (no backend; fully usable on one device)
- **Phase 1** — sync server + auth (multi-device; protocol hardens)
- **Phase 2** — Tauri desktop + CLI + MCP (global capture lands; agents arrive)
- **Phase 3** — Capacitor mobile + native slivers + Live Activity + local nudge + importers
- **Phase 4** — public API + SDK + module directory + browser extension + Ask (hybrid) + E2EE vault + billing

## M · Naming & copy

- **D-40 — Naming lexicon.** Binding lexicon in `NAMING.md`. Daily nouns stay plain (Capture, Inbox, Today, Done, Snooze, Ask, Workspace); **Burrow** (PT-BR **Toca**) is the single themed product noun = the E2EE vault — schema/API keep `vault` (D-26). "Dive" reserved for a future focus timer; "surface" is an Ask/nudge copy verb; "Bill" and all other platypus-anatomy labels rejected. Theme density belongs to ambient copy (empty states, release names, mascot moments), never to information architecture.

## N · Code architecture (canvas "Ornie Code Architecture", 1k confirmed in full)

- **D-41 — Hexagon enforced, ceremony skipped.** `packages/core` imports nothing from React, Tauri, Capacitor, Supabase or Express — lint-enforced; all I/O crosses typed ports (`StoragePort`, `SyncPort`, `AIPort`, `NotifyPort`, `PlatformPort`, `ClockPort`). Event sourcing + CQRS in their lite form (the op log + SQLite read views). No use-case factories, no command buses, no upcasters, no mediator libraries.
- **D-42 — Frontend shape.** Vite + React 19 static SPA (no SSR framework, ever — the data lives in the user's SQLite). Feature slices (`features/today`, `features/capture`, …) that import only `packages/core` + `@ornie/ds`. Marketing site = separate static pages.
- **D-43 — Backend shape.** One modular monolith on the VPS: vertical slices (`sync`, `hooks`, `api`, `ask`, `billing`, `directory`, `export`) over a small `kernel/` (auth, ACL, rate limits) that runs the same `packages/core` validation clients run. Outbox pattern for webhooks (written in the op's transaction, drained async); idempotency keys on every /v1 write. Scaling ladder: bigger box → split sync fanout → read replicas. No microservices, no serverless, no k8s.
- **D-44 — DS is a token pipeline.** One `tokens.json` compiles (Style Dictionary or small script) → CSS variables (web + shells) + `Tokens.swift` (WidgetKit/Live Activity/share) + `Tokens.kt` (Glance/share). Components stay React-only (`@ornie/ds`, public): headless primitives + Riverbed skin, plain CSS (no runtime CSS-in-JS), Ladle workshop doubles as public gallery + Playwright visual snapshots. Tokens cross platforms; components never do.
- **D-45 — Native slivers bridge.** Slivers (widgets, share, lock screen, Live Activity) never run JS: App-Group/shared storage holds a **sliver cache** (tiny read model the app refreshes on sync/close) + an **intent queue** (sliver writes as pending intents); the app drains intents into real ops on next wake. The React app talks to shells only via `PlatformPort`.
- **D-46 — CLI is a full device.** Embeds `packages/core` + a SQLite replica (shares the desktop file when Ornie desktop is present, per D-22; standalone replica otherwise). Registers via device-code auth, syncs, works offline. Bare `ornie "…"` = capture; every read takes `--json`. Never a thin REST wrapper.
- **D-47 — One surface registry.** A typed registry of commands + queries (schemas from @ornie/schema) renders all three text surfaces: CLI argv, MCP tools, REST /v1 routes. A capability added to the registry appears on every surface; none may define private verbs.
- **D-48 — Module lanes.** 1st-party modules = ModuleKit vertical slices in-repo: declared object kinds map onto core items (so sync, undo, history, export, sharing, Ask context are inherited free), standard surfaces only (list, card renderer, settings pane, nudge hooks), declared fetch schedule (server cron for paid sync; on-open fetch local-only). 3rd-party = manifest + external endpoint only (D-31 stands; no in-process plugin API, ever). The rule: **modules add content types, never architecture** — anything needing a new port, new sync semantics, or a new UI paradigm is a platform feature, not a module.
- **D-49 — Monorepo.** pnpm + Turborepo: `apps/{web,desktop,mobile,server,cli}`, `packages/{core,schema,data,surface,ds,sdk}`, `modules/*` (1st-party slices), `ornie-dev-kit/`. Changesets publishes `ds` + `sdk`; CI mirrors those two to the public repos; the closed core never leaves.

## O · Data layer (canvas "Ornie Database", 1g confirmed in full)

- **D-50 — Op anatomy (finalizes D-13).** `op_id` ULID client-minted; the server-assigned per-workspace `seq` is the sole order authority. Four op types: `create` (initial fields), `set` (changed fields only), `del` (tombstone — rows are never physically removed), `yjs` (binary CRDT update for note bodies). Patches are field-level, never whole objects; undo = inverse patch as a new op; history is immutable. Patches are opaque to the server except the mechanical `vault.*` filter and manifest validation.
- **D-51 — Postgres master layout.** Facts-only multi-tenant schema (~14 tables): workspaces / members / devices; **ops** (pk `(ws_id, seq)`, `unique(ws_id, op_id)` = idempotent ingest); snapshots (D-14); object_acl; api_keys / idempotency / webhook_endpoints / webhook_outbox; modules / module_installs; entitlements / ask_usage; vault_keys. No server-side task state — devices fold; the snapshot cutter is the only server-side patch reader (same `@ornie/core` fold). The gateway (service role) is the single writer; Realtime broadcasts head pointers only; no partitioning, sharding, or GIN on patch at v1.
- **D-52 — Edge security pack.** RLS select-only policies as the read backstop (no write policies for `authenticated`); BEFORE UPDATE/DELETE trigger keeps `ops` append-only even against gateway bugs; API keys random 256-bit, SHA-256-hashed, scoped (capture-only exists day one), ~60 rpm in-process buckets; `Idempotency-Key` on every /v1 write with responses cached 24 h; webhooks HMAC-SHA256 + timestamp with 5-min replay window, 1m/5m/30m backoff → ~24 h auto-pause; TLS 1.3 + AES-256 at rest + PITR; devices revocable at pull; LGPD/GDPR export + purge jobs (30-day grace).
- **D-53 — Burrow envelope.** Vault patches are sealed envelopes `{v, n, ct}` (XChaCha20-Poly1305). Passphrase → Argon2id → unlock key → decrypts the workspace vault key; the vault key is wrapped per device public key (`vault_keys`); plaintext keys exist only in OS keychains. Kernel filter: `vault.*` ops never fire webhooks, never reach Ask, never enter search indexes. Lost passphrase = data gone, stated plainly in UI.
- **D-54 — SQLite replica layout.** `meta` / `objects` (`fields` JSON + `field_seqs` for the per-field LWW test, tombstones) / `task_index` / generic `module_index` (k0, k1, n0 slots) / FTS5 (vault excluded) / `yjs_docs` / `outbox`. Write path: validate → fold + outbox in one tx (~1 ms, zero network) → live queries re-run → sync assigns seq → pending swapped, lost LWW races re-folded per field. Live queries = invalidate-by-kind and re-run, no reactive framework. Drivers: better-sqlite3 (desktop + CLI), wa-sqlite/OPFS (web), capacitor-sqlite (mobile). Device identity (device_id + keypair) lives in the OS keychain, never in the file.
- **D-55 — Module data contract.** Namespaced kinds (core bare: `task`, `note`; 1st-party short prefix: `rss.item`; 3rd-party `m.{moduleId}.{type}`). The manifest declares a JSON Schema per kind (gateway-validated — bad shape → 422, never a poisoned log), index-slot mapping, surfaces, fetch schedule, commands. Patch ≤ 64 KB; binaries go to Storage via signed URLs, ops store pointers. Uninstall = keep data or tombstone (undoable). Modules get rows, never tables.
- **D-56 — Free-plan stance.** No local DRM, ever. Device count is enforced only at sync registration (`devices` table, revocable). A detected copied file (meta.device_id ≠ keychain identity) is treated as a backup restore — one calm upsell, never a lock.

## P · Tenancy & free tier (canvas "Ornie Database" turn 2, confirmed 2026-07-07)

- **D-57 — One multi-tenant Postgres.** Isolation is a predicate, not a building: every row carries `workspace_id`, every read passes RLS (D-52), every write passes the gateway ACL (D-16). Never per-tenant databases or schemas. Environments (prod/staging) are separate Supabase projects. Per-tenant restore = op-log replay (`where workspace_id = …`) — finer-grained than any DB backup. Scaling ladder unchanged (D-43).
- **D-58 — Serverless free tier.** Free = local-only, literally: no account until checkout; a NullSync adapter behind `SyncPort` (the code path doesn't exist rather than being switched off); zero rows in Postgres. Devices keep a full local `oplog` table (powers undo/history offline; D-15 retention applies), rotating local SQLite backups (daily, keep ~7), and one-tap full export (D-21). Upgrade day: register device → replay the entire local log → server assigns seq 1…N → Postgres becomes master with history intact. Cancel is symmetric: the replica keeps working local-only forever; the server copy is exported on request, then purged (D-52 grace). The privacy sentence is literal: on the free plan, data never leaves the device.

## Q · Strategy & frontier (canvas "Ornie Strategy" turn 1, confirmed 2026-07-07)

- **D-59 — Telemetry = PostHog Cloud EU.** Product analytics opt-in (default off, asked once in plain words); ~20 allowlisted typed events — never content or titles, no autocapture, no session replay in-app, no fingerprinting; vault screens emit nothing. Feature flags = staged rollouts + kill switches (sync-protocol ramps, cloud-Ask off switch). Error tracking here until Sentry arrives (D-38.1). Exit survey at cancel only. Marketing site: anonymous cookieless stats. Self-hosted PostHog rejected (ops burden, D-19 spirit). One anti-metric tracked to minimize: notifications per user per day.
- **D-60 — Styling split.** DS repo stays vanilla token BEM (D-44 pipeline untouched; consumers inherit no build tooling). App repo adopts Tailwind v4: `@theme` maps `--ornie-*` tokens into the utility namespace with the **default palette disabled** (off-system values are inexpressible) and a lint ban on arbitrary values. `tokens.json` remains the single source of truth; Tailwind is an input method for it, never a second design system.
- **D-61 — Themes are token-overlay packages.** JSON only (Layer-1 scale swaps + Layer-2 semantic overrides + fonts from a vetted list) — never CSS/JS. Compiled through the D-44 pipeline so widgets and native slivers re-theme too. Hard gate: WCAG AA contrast audit at submit + install. Soft gate: loudness lint (warns). Curated directory (module posture). Free: Riverbed light/dark + the accessibility set (high-contrast, dyslexia-friendly type, reduced transparency) — accessibility is never paywalled. Plus: community gallery, theme editor, theme sync. Print/export always renders Riverbed light.
- **D-62 — Pages ladder.** L1 saved views (filter + group + sort, pinned to sidebar) = free, core. L2 composed pages (block grid: list · board · note · counter · module block) = Plus. L3 module pages (manifest declares a page from the same block schema, bound to the surface registry (D-47) + the module's external endpoint; no in-process code — D-31/D-48 stand) = Plus, curated. L4 arbitrary-code plugins = **rejected** (E2EE promises, store review, solo support surface). Pages are op-log objects (`page.*` ops) — they sync, export, and can be shared later; the block schema is versioned in `@ornie/core`. Calm rule: a page holds a handful of blocks, max.
- **D-63 — Attachments.** An attachment = a content-addressed blob (sha-256) stored out of band; the op carries metadata only ({hash, size, mime, name} — D-55's 64 KB patch rule holds). Local blobs free. Synced blobs = Plus, on Cloudflare R2 via presigned URLs (the gateway never proxies bytes), 10 GB starting quota. Vault attachments are encrypted client-side before upload (blob key wrapped by the vault key, D-53; thumbnails generated on-device). Dedup per workspace by hash; refcount GC after tombstone retention. Export gains a `files/` folder keyed by hash (extends D-21).
- **D-64 — Money rails.** Paddle = merchant of record for web checkout (global tax/invoicing outsourced; localized pricing; dunning). RevenueCat wraps StoreKit/Play Billing for store IAP (small-business tier). Region-gated link-outs to web checkout where storefront rules allow — a config-driven purchase surface, never hardcoded UI. One `entitlements` table (D-51) is the only truth, fed by signed idempotent webhooks from both rails; the app reads entitlements via sync, never a store SDK. Watch: Stripe Managed Payments at GA — migrating would be a checkout swap, not a re-architecture. (See D-29.1.)
- **D-65 — Boring-ops kit.** Every tool adoptable in a day, abandonable in a week: PostHog error tracking now → **Sentry when phase-3 native slivers ship** (crash symbolication; PII-scrubbed; diagnostics toggle separate from analytics) · BetterStack uptime + public status page · Resend transactional email (a marketing list, if ever, is separate consent) · Astro marketing site + Starlight docs (the devlog lives there) · pg-boss scheduled jobs (D-19 stands) · Supabase PITR **plus** a nightly logical dump shipped offsite to R2 (a different provider than the DB) · quarterly restore drill.
- **D-66 — Local semantic search.** sqlite-vec inside each device replica + the local embedding model Ask already runs (D-35). Hybrid retrieval: FTS5 candidates, vector re-rank. Vectors are computed and stored **per device and never sync** (recomputed on bootstrap) — the op log stays lean, the privacy story stays one sentence, offline search works. Vault content excluded (D-53/D-54).

## R · Formalized retro-locks (previously footnote/canvas-only, numbered 2026-07-07)

- **D-67 — Dark mode.** Shipped 2026-07-06: `data-ornie-theme="dark"` flips semantic tokens only (raw palette scales are constants); the attribute is the only component-level trigger; works on any subtree; all pairs contrast-verified; `color-scheme` carries native controls. App behavior: follow the OS setting with a manual override in Settings. Never hand-remap raw palette scales per theme.
- **D-68 — Mobile/tablet design locks (by reference).** The shipped UI decisions in canvas "Ornie Mobile" (turn 2) bind like ledger entries: nav = dock + raised capture button; header = greeting | day ring | Ask sparkle; Today = focused density; capture = half sheet; triage = card + chips with swipe shortcut; one iOS-style design on both platforms honoring Android system seams (D-03); tablet = rail + top bar + panes with overlays floating desktop-style. Changing any of these requires a superseding canvas turn plus a D-68.x entry.

---
*Pending (explicitly not locked): exact paid-plan price point (standing advisory: $6/mo · $60/yr annual-first, founder cohort keeps launch price, no lifetime plan — Strategy canvas 1i); module directory review process details (suggested posture: automated checks first, human curation second, mirroring D-61's gates).*
