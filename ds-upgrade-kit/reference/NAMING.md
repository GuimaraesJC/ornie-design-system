# Ornie — Naming & Copy Lexicon

**Version 1.0 — 2026-07-06.** Binding for UI labels, marketing, docs, and public API/SDK names. Locked as D-40 in `DECISIONS.md`; change via superseding entry there.

---

## The test

A themed word ships only if it reads correctly to someone who has never thought about a platypus. Theme is a bonus layer, never a requirement. For A(u)DHD users, every "decode the metaphor" moment is friction — so **the more frequent the touchpoint, the plainer the word.**

## Canonical lexicon

| Concept | EN (ship this) | PT-BR | Notes |
|---|---|---|---|
| Quick add | **Capture** | Capturar | Never "Bill" (reads as *invoice*; PT-BR "bico" = side-gig slang) |
| Unsorted items | **Inbox** | Caixa de entrada | |
| Day view | **Today** | Hoje | |
| Focus session | **Focus** | Foco | "Dive" is reserved, not used yet — see below |
| End-of-day ritual | **Close the day** | Fechar o dia | |
| Defer | **Snooze** | Adiar | |
| Complete | **Done** | Feito | |
| AI assistant | **Ask** | Ask | Product name — never translated |
| Container | **Workspace** | Workspace | Shareable → must never be "Burrow" |
| E2EE space | **Burrow** | **Toca** | The ONE themed product noun. See rules. |
| Notes | **Notes** | Notas | |
| Journal | **Journal** | Diário | |
| Rule-based prompts | **Nudges** | Lembretes suaves | Deterministic, not AI — copy must never imply AI |

### Burrow (the signature noun)

- Guessable without the mascot: hidden, safe, yours. Distinct from every password manager's "Vault."
- Teach it once: lock icon + subtitle **"your end-to-end encrypted space"** at first touch; after that, "Burrow" stands alone.
- **Code, schema, and API stay plain:** the flag is `vault` (D-26), MCP/REST/SDK say `vault`. Burrow is presentation-layer skin only — builders never need the metaphor.

### Reserved (approved, not yet used)

- **Dive** — future focus-timer branding only (platypus dives = short bursts with surface breaks; the most ADHD-true metaphor the animal offers). Until that ships, the feature is "Focus."
- **surface** (verb) — Ask/nudge copy: "Ornie surfaces what needs you today." Copy verb, never a label.
- **Stream** — idiomatic software English that happens to be river vocabulary. Free; use anywhere.

### Rejected (do not use, do not relitigate)

- **Bill** for capture — collides with invoices (which will literally sit in the inbox); anatomically the bill is a *sensor*, not a mouth.
- **Burrow** for workspace — burrows read private-by-definition; workspaces are shareable. One themed word never carries two meanings.
- **Spur, Egg, Hatch, Tail, Puggle, Pouch** as labels — invisible platypus facts; pure decode tax. (Cheek-pouch trivia may inform the capture *icon*, nothing more.)

## Rules

1. **Daily nouns and verbs stay plain.** Capture, Inbox, Today, Done, Snooze, Ask, Workspace, Notes, Journal.
2. **One signature themed noun in the product: Burrow.** Adding a second requires a superseding decision entry.
3. **Never two themed words in one sentence.** "Bill it into your Burrow" is the failure mode.
4. **Theme density lives in the free layer,** where misreading costs nothing: empty states, loading lines, release names, achievements, mascot moments. Go dense there; keep the IA plain.
5. **Ornie + the Ask persona carry the brand.** The information architecture doesn't have to.

## Internal/ambient layer (already themed, stays internal)

Riverbed token vocabulary — `river`, `sand`, `fur`, `moss`, `clay`, `rust` — and codenames are internal names users never decode. Release names may draw on river/platypus vocabulary freely.
