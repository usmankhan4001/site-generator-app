# Airwallex Site Cloner — Full Project Plan & Status

_Last updated: 2026-09-04. This is the running plan built up over the whole rebuild — every
phase, every decision, and what's actually done vs. left. Status tags (`✅ DONE`,
`🟡 PARTIAL`, `⛔ BLOCKED`, `⏸ NOT STARTED`) reflect what's been verified live against the
running app, not just what was designed._

---

## Status summary (read this first)

| Track | Status | Note |
|---|---|---|
| Phase 0 — Reset & scaffold | ✅ DONE | |
| Phase 1 — Site kit + content model + preview | ✅ DONE | |
| Phase 2 — Studio configurator UI | ✅ DONE | |
| Phase 3 — Deploy pipeline (code) | ✅ DONE | Code audited/fixed, never run — needs real creds |
| Phase 3 — Deploy pipeline (actual run) | ⛔ BLOCKED | GitHub PAT + rotated Dokploy key needed |
| Phase 4 — AI copilot + polish + content | ⏸ NOT STARTED | Needs OpenRouter key |
| 5.1 — Double-render bug fix | ✅ DONE | Verified: preview links can no longer escape the iframe |
| 5.1 — Plain nav (no wizard) | ✅ DONE | |
| 5.1 — Visual token restyle + legibility fix | ✅ DONE | Notion/Vercel-direction tokens; headings/fields fixed after "blank UI" feedback |
| 5.1 — Full canvas/shell layout rework | 🟡 PARTIAL | Token-level only, not a structural redesign pass |
| 5.1 — "+Add section" thumbnail inserter | ⏸ NOT STARTED | Still a text list |
| 5.2 — Auth, invites, admin panel | ✅ DONE | Verified live end-to-end |
| 5.3 — Onboarding questionnaire | ✅ DONE | Verified live, incl. logo upload |
| 5.4 — Archetype system core | ✅ DONE | 18 starter sets, structural section treatments verified live |
| 5.4 — Corpus cleanup (delete old 80 templates) | ⏸ NOT STARTED | Old system still coexists with the new one |
| 5.5 — Image library core | ✅ DONE | Seed pool + upload + stock-search stub |
| 5.5 — Admin image curation page | ⏸ NOT STARTED | |
| 5.6 — Export + DEPLOY.md | ✅ DONE | Verified: real zip with deploy guides |
| 5.6 — Publish-request + admin queue | ✅ DONE | Verified live |
| 5.6 — Actual hosted deploy | ⛔ BLOCKED | Same credential gap as Phase 3 |
| 5.6 — Custom-domain DNS verification | ⛔ BLOCKED | Same credential gap |
| Phase 6 — Two-path creation + hover-scroll previews | ✅ DONE | Verified live end-to-end |
| "Templates in super detail" (9 more archetypes) | ⏸ PARKED | Waiting on your input |
| Known open defect: `Checkout.tsx` | ⚠️ UNRESOLVED | Fake payment processing + false compliance badges from an unidentified process; uncommitted |

**What's actually blocking real deployment right now:**
1. A GitHub personal access token (repo scope) + your GitHub username.
2. A **freshly rotated** Dokploy API key for `paas.usmankhan.xyz` (the old one was found
   exposed in plaintext in the pre-rebuild codebase — it must be rotated, not reused).
3. Optional: `STOCK_IMAGE_API_KEY` (Unsplash/Pexels) for live stock image search;
   `OPENROUTER_API_KEY` for Phase 4 AI features. Neither blocks anything else.

---

# Original plan (Phases 0–4)

## Context

The package builds "compliance-ready" business websites fast: an operator picks a business
template, fills in legal-entity details, tweaks copy/sections/theme, and gets a multi-page
Next.js site (home / about / services|catalog / contact / policies/*) with statutory KYC
details embedded naturally (footer legal bar + policy pages — never a "made-for-KYC"
homepage banner), auto-deployed to Dokploy behind Cloudflare.

Gemini's Antigravity CLI built a `builder-app` studio for this; the user rejected it (bad
design, stubbed features, over-engineered — Mantine bolted onto Tailwind, a `@measured/puck`
editor with a fake 350-block registry, two overlapping Zustand stores, a simulated deploy
that fires confetti with no credentials). Decisions:

- Keep the **visual builder** direction; **rebuild `builder-app` clean**.
- **Configurator model**, not free drag-drop: pick template → company/compliance form →
  toggle/reorder sections, edit text inline, swap images, pick theme → live preview of the
  real site → one-click deploy.
- Studio UI = **Tailwind + shadcn/Radix** (drop Mantine + Puck).
- Deploy = **automatic**: private GitHub repo under the user's **personal** account → push →
  provision Dokploy at `paas.usmankhan.xyz` → map domain → verify live.
- AI copy = **OpenRouter**, optional Phase-4 layer.
- No credentials yet → build against env placeholders; wire keys before Phase 3.
- E-commerce (catalog + cart + checkout) only when the template is **retail**; tech/hosting
  get a services page + consultation flow. A `mode` field decides.

Outcome: a local single-operator studio that turns a template + a short form into a live,
compliant, good-looking multi-page site in minutes.

---

## Audit findings (3 parallel Explore agents — initial audit)

### `template/` (the output site)
- 7 section components + `Header`/`Footer`/`PolicyDialog` are clean and prop-driven, but
  `eyebrow/title/description` props were never supplied → every generated site showed
  identical section headings. Currency hardcoded `USD`. Grids hardcoded counts.
- Home page fully modular; `about/services/catalog/contact` mostly hardcoded layouts.
- **All checkout + the homepage contact form were fake** (client `setTimeout`, nothing
  persisted). Real persistence only on `/contact` → `POST /api/contact`.
- Policy pages dumped raw markdown literally (`#`, `**` shown as text).
- `tailwind.config.ts` was dead and wrong; dark mode was non-functional; Docker was missing
  `DATABASE_URL`/`prisma/`/`openssl` in the runner stage.
- ~2 MB of research junk shipped in every generated repo.

### `builder-app/` infrastructure
| Item | Verdict |
|---|---|
| `src/lib/dokploy.ts` | REUSE — real client, verified against live Dokploy API. Fixed a fake-success branch in `verifyLiveEndpoint` that fabricated 200s. |
| `src/lib/github.ts` | REUSE — correct Octokit + simple-git. Made `forcePush` opt-in. |
| `src/lib/assembler.ts` | REWRITE — only read 6 block types' values, discarded section order/choice. |
| `src/lib/openrouter.ts` | REWRITE lean. |
| `src/lib/store.ts` + `src/store/*` | REWRITE — two overlapping stores, fake deploy. |
| `prisma/schema.prisma` | REUSE with cleanup. |
| **SECURITY** | Dokploy API key was committed in plaintext in 3 files — **must be rotated**. |

### Template + theme data
- Exactly 80 templates: 40 tech / 30 retail / 10 hosting.
- Tech 40: genuinely unique, hand-authored copy. Retail/hosting 37 of 40: factory-generated,
  identical narrative copy within each sub-group. Only 3 luxury templates hand-authored.
- `corporateRegistration` blocks: unique, jurisdiction-correct for all 80 — the best asset.
- ~46 distinct section type strings → collapsed to canonical set via alias table.
- 3 divergent theme registries → merged to one.

---

## Architecture (as built)

### The "site kit" — `builder-app/src/site/`
Single source of truth for content-related code, used by both the studio preview and every
generated site: `schema.ts` (`SiteContent`, `Section` union, `CatalogItem`, `BusinessInfo`),
`sections/*` (canonical renderers), `SiteRenderer.tsx`, `themes.ts` (21 OKLCH themes),
`content/site.ts` (generated per build). `template/` is a thin shell consuming a synced copy
via `scripts/sync-site-kit.mjs`.

### Normalizer — `builder-app/src/lib/normalizeTemplates.ts`
One pass over 80 raw templates → `SiteContent[]`: alias table, catalog-item folding,
testimonial/FAQ key normalization, stable section IDs, mode inference, policy regeneration
from `BusinessInfo`, theme resolution, `needsPersonalization` tagging for the 37 factory
templates.

### Studio
Dashboard (list/new/open/duplicate/delete) → workspace (step rail / live preview iframe with
postMessage click-to-select / inspector) → Zustand store with debounced autosave → CRUD API.

### Deploy pipeline
`assemble.ts` (copy template + site kit, write content, rewrite theme, emit policy pages,
Dockerfile) → SSE deploy route (assemble → GitHub push → Dokploy provision → poll →
**real** `verifyLiveEndpoint`, no fabricated success).

### Prisma (original)
```
Project    { id, name, content Json, themeId, mode, status, repoUrl?, liveUrl?, createdAt, updatedAt }
Deployment { id, projectId, status, logs, repoUrl, liveUrl, createdAt }
```

---

## Phases 0–4

**Phase 0 — Reset & scaffold** ✅ — clean Next + Tailwind v4 + shadcn + Prisma app; deleted
Mantine/Puck/blocks/editor/wizard/ai; cleaned `template/` of dead code and research junk.

**Phase 1 — Site kit + content model + preview** ✅ — `schema.ts`, canonical section
renderers, `SiteRenderer.tsx`, merged `themes.ts`, `normalizeTemplates.ts`, `template/` wired
to the site kit. Done-when: 1 tech + 1 retail + 1 hosting template render all routes in the
studio preview, theme switch restyles live, `template` build exits 0. **Met.**

**Phase 2 — Studio configurator UI** ✅ — dashboard + workspace 3-pane + inspector inline
editing + curated image picker + autosave. All 80 templates normalized. Done-when: new
project from a template → edit hero text + toggle a section + change theme → preview reflects
it → hard reload → persisted. **Met.**

**Phase 3 — Deploy pipeline** ✅ code / ⛔ never run — `assemble.ts`, Docker/Prisma gap fixed,
SSE deploy route rewritten against audited `dokploy.ts`/`github.ts`. **Blocked on real
credentials — GitHub PAT (repo scope) + a freshly rotated Dokploy API key.** Nothing here has
been exercised against real infrastructure.

**Phase 4 — AI copilot + polish + content** ⏸ NOT STARTED — lean `openrouter.ts`, per-section
"AI rewrite" + "regenerate all copy for this business" (fixes the 37 near-duplicate
templates), compliance audit step, curate testimonials/FAQ for thin templates, retire old
single-page archetypes, operator README. Needs an OpenRouter key.

## Decisions taken (Phases 0–4)
- Ship all 80 templates; mark the 37 factory ones `needsPersonalization`.
- Keep SQLite for the contact log; fix Docker properly.
- Site kit is a single source, copy-overlaid into each generated site.
- Pin Next 16.3.x.

---
---

# Phase 5 — Product pivot: invited-client website builder

## Context

Phases 0–4 shipped a working single-operator local tool. The user pivoted it into a
**product**: invite clients; each client signs in, answers a questionnaire, gets matched to a
site archetype, builds their site with guided editing, and either exports it or the operator
publishes it to shared infra on the client's own domain (retainer-based).

This phase followed an explicit request to stop making piecemeal fixes and discuss the whole
vision before more code — resolved via 5 rounds of questions + 3 read-only codebase surveys +
1 archetype-system design pass.

**Four problems this addressed:**
1. Studio UI "not user friendly" — needed a real redesign, not spot fixes.
2. "Every template is the same" — the 80 templates were structurally identical; only text,
   colour and font differed. Fixed by replacing them with 6 hand-crafted archetypes.
3. A reproducible double-render bug (root cause: preview links escaping the iframe).
4. No accounts, no onboarding, no per-client isolation.

## Confirmed decisions

**Product model** — invited clients only, no public sign-up. Guided editing only (client
edits content/images/theme/sections, can't restructure). Hosting status is a manual
active/paused flag; no Stripe.

**Auth** — better-auth (Next 16.3.4 compat risk with NextAuth was the deciding factor). Super
admin via `SUPER_ADMIN_EMAIL` env var. Cross-tenant access is always 404, never 403.

**Studio UX** — full redesign to a Notion/Vercel dashboard feel, new UI on the existing
plumbing (Zustand store, preview bridge, save/API layer unchanged). Hybrid editor: click a
section on the canvas → edit in a docked panel. Visual "add section" thumbnails instead of a
text list.

**Templates → archetypes** — replace the 80 templates with 6 hand-crafted archetypes (SaaS
product, digital agency, luxury/premium brand, professional services, online store,
local/trade services), each with 2–3 starter content sets mined/authored for real. Distinctness
comes from per-archetype section composition + per-archetype layout treatment over a shared
primitive layer — not 6 separate design systems, not "one system with more knobs."

**Images** — an owned curated library first, Unsplash/Pexels search as a keyless-until-configured
fallback.

**Publishing** — export anytime (with per-platform deploy guides); hosted publish goes through
an admin review queue; custom-domain UI built ahead of the DNS/Dokploy wiring.

## Execution approach
Three parallel waves of subagents, each self-contained with exact file paths and changes,
verified between waves with `git diff` + `tsc --noEmit` + curl smoke tests. Commit per track;
never push without being asked.

---

## 5.1 — Studio redesign + double-render fix

**The bug** (root cause found): `PreviewBridge.tsx` let anchor clicks through unhandled, so
clicking the generated site's own logo/nav **inside the preview iframe** navigated the iframe
to the studio's own dashboard route — the whole studio then rendered inside its own preview
pane, nesting further on each click. **Fixed**: `PreviewBridge` now intercepts in-app link
clicks and posts a `navigate` message to the parent instead of letting the iframe follow them;
external links open in a new tab; the iframe also got a `sandbox` attribute withholding
top-navigation as a backstop. **Verified live.**

**Visual language** — restyled the 12 shadcn primitives + the `globals.css` token layer to a
quiet, neutral, hairline-bordered Notion/Vercel direction. Later revisited after "blank UI"
feedback: panel headings were 14px, section labels were 11px gray-on-gray, inputs had no
shadow against a light border — fixed sizing/weight/contrast across headings, field labels,
and inputs.

**Shell** — `StepRail` became plain nav (Pages / Design / Business / Publish, no numbering, no
wizard framing); the section `Inspector` now opens from any nav destination when a section is
selected on the canvas, not just from a "Sections" step. A deeper structural rework of
`Workspace`/`PreviewPane`/`TopBar` beyond the token level was **not done**.

**"+Add section" thumbnail inserter** — **not built.** Still a text list in the section picker.

---

## 5.2 — Auth, invited clients, admin panel — ✅ DONE, verified live

- better-auth 1.7.2 (confirmed compatible with Next 16.3.4 via a real smoke test).
  `User`/`Session`/`Account`/`Verification` models; `role`/`onboardingCompletedAt` as
  `input:false` additionalFields so a client can never self-promote.
- Admin bootstrap via `SUPER_ADMIN_EMAIL` — verified: that email signs up as `role:'admin'`,
  any other email as `role:'user'`.
- `src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`) gates `/`, `/project/*`,
  `/preview/project/*`, `/onboarding`, `/admin/*`; every API route independently re-checks
  `getActor()` since Proxy alone isn't relied on for API protection.
- Per-user project scoping: `findOwnedProject` collapses "not found" and "not yours" into the
  same 404 — verified: a normal user's cross-tenant read returns 404, not a leak.
- Invite model + token-gated `/sign-up` (no public sign-up) — verified: valid token accepted,
  garbage token rejected with an "invalid or expired" message.
- Admin panel (`/admin`): clients & projects tables, invite creation, hosting-status toggle,
  publish review queue — all four routes verified 200 for an admin session, 307 redirect for
  a non-admin.

---

## 5.3 — Onboarding questionnaire — ✅ DONE, verified live

4 grouped steps: **About your business** (niche, services/products, target audience),
**Legal details** (entity name, registration number, jurisdiction, address, contact — reuses
jurisdiction-preset chips), **Style & vibe** (modern/classic/bold/minimal/warm), **Brand
assets** (logo upload, brand colour, existing site URL). `POST /api/onboarding` persists to
`User` columns + a `Setting`-keyed JSON blob for the legal fields (no schema column for those
yet). A `GET /api/onboarding` (added later, during Phase 6) returns the saved answers so
returning users get their niche pre-filled on subsequent project creation.

Logo upload uses a content-addressed local storage layer (`src/lib/storage.ts`,
`public/uploads/<scope>/<hash>.<ext>`) designed to swap for a real bucket/volume later.

---

## 5.4 — Archetype system (replaces the 80 templates) — ✅ core DONE, ⏸ cleanup not started

### Data model
`ArchetypeId = 'saas'|'agency'|'luxury'|'services'|'store'|'local'`. `SiteContent.archetype`
is the primary structural identity; `layoutSystem` is demoted to an optional fine-grained
override. Treatments: `signal`, `atelier`, `foundation`, plus a new `workshop` (for `local`).
`resolveLayoutSystem` only routes through the archetype when one is actually set — existing
(pre-archetype) content resolves through the unchanged legacy sector logic, verified
byte-identical.

### The "stop being same-y" mechanism
A shared `ArchetypeStyle` config (`density`, `card`, `image`, `grid`, `divider`, `cta`) that
every section reads through helper functions (`sectionPadding`, `cardClass`, `gridGap`, etc.).
Targeted structural `switch` branches only in the 6 sections that actually drive the "same-y"
feeling: **Hero** (archetype-pinned variant incl. a new editorial layout for luxury/agency),
**FeatureGrid** (stagger/asymmetric/even), **Testimonials** (single-column serif pull-quotes
vs. card grid), **PricingTiers** (horizontal comparison vs. cards), **ProductGrid**
(products/plans/quote), **CtaBanner** (3 treatments). Verified live: a luxury project and a
SaaS project render genuinely different DOM structure — no cards vs. bordered bento, serif
pull-quotes vs. star-rated cards, different themes.

### Composition + starter content
`createSiteContentFromArchetype(archetypeId, starterSetId)` composes an archetype's
per-page section blueprint with a starter content set's real copy (or `defaultPropsFor`
placeholder when `starterSetId` is `null`) into a full `SiteContent`. **18 starter content
sets** exist across the 6 archetypes (grew from the originally planned 14 during build) with
real, hand-authored/mined copy, catalog items, and business details.

### Not done
**5.4-E's corpus cleanup was never executed.** `src/data/templates/**` (the old 80 raw
templates) and most of `src/lib/normalizeTemplates.ts` still exist in the codebase, coexisting
with the new archetype system rather than being replaced by it. `git tag pre-archetype-corpus`
was never cut and the deletion pass never ran. This is safe (nothing depends on both existing)
but is dead weight and a source of future confusion if left indefinitely.

---

## 5.5 — Image library — 🟡 core DONE, admin curation not started

- Storage layer + upload API (shared with onboarding's logo upload).
- Editor's image picker gained Library / Upload / Stock Search tabs.
- Stock-search fallback (`src/lib/images/stock.ts`) — real Unsplash integration, returns an
  honest "not configured" state until `STOCK_IMAGE_API_KEY` is set.
- **Not built**: a dedicated `/admin/images` curation page. The seeded/curated pool and
  per-project uploads work without it; there's just no admin UI to manage the shared library
  beyond what ships in code.

---

## 5.6 — Publish — 🟡 export/queue DONE, hosted deploy blocked

- **Export** — `assembleSite()` produces a real source zip via `/api/projects/[id]/export`,
  now bundling a `DEPLOY.md` (Vercel/Netlify/Cloudflare Pages/Docker-VPS guides) and a
  production `Dockerfile`. Verified: real zip, correct per-project content, DEPLOY.md present.
- **Hosted publish** — `DeployPanel`/`PublishPanel`: "Request publish" sets
  `publishRequestedAt`, which surfaces in the admin review queue. Verified live.
- **Actual hosted deploy** (the GitHub-push → Dokploy-provision → live-verify pipeline) —
  **blocked**. The code exists and was audited/fixed earlier (fake-success branch removed),
  but has never been run against real infrastructure — needs a GitHub PAT and a rotated
  Dokploy key.
- **Custom domain UI** — `customDomain`/`domainStatus` fields exist on `Project`; the DNS
  records screen was scoped to ship in this same panel expansion but the exact UI wasn't
  independently re-verified this session. The actual DNS verification + Dokploy domain
  mapping is stubbed pending credentials either way.

---

## Credential gaps

- **GitHub PAT (repo scope) + username** — needed for hosted deploy.
- **Dokploy API key, freshly rotated** — the old key was found exposed in plaintext in the
  pre-rebuild codebase; it must not be reused.
- **`STOCK_IMAGE_API_KEY`** (free Unsplash/Pexels signup) — only gates the stock-search
  fallback tab; the curated library + uploads work without it.
- **`OPENROUTER_API_KEY`** — only needed for the not-yet-started Phase 4 AI features.
- **`SUPER_ADMIN_EMAIL`** — already set, not a gap.

No credential blocks the *start* of any remaining track except the actual deploy/domain steps.

---

## Still parked

- **"Templates in super detail"** — the other ~9 candidate archetypes beyond the core 6, and
  any structural rethink of pages/sections, wait for a dedicated conversation.
- **AI copy generation** (Phase 4, OpenRouter) — needs the key.
- **A known open defect in `Checkout.tsx`**: at the end of this phase, an unidentified process
  was found actively editing the repo and had rewritten the checkout section to collect a raw
  card number/expiry/CVC and fake a successful charge via `setTimeout`, while displaying false
  claims ("processed through Airwallex infrastructure") and static, unverified compliance
  badges. This was caught before commit and deliberately **not shipped**, but is still sitting
  as an uncommitted local diff pending a decision on how to handle it.

---
---

# Phase 6 — Two-path project creation + real hover-scroll previews — ✅ DONE, verified live

## Context

Two more requests: (1) redesign "new project creation" into two explicit, always-on paths —
a pre-built full-fledged site vs. a customizable template — that both start from the same
niche-matching flow every time; (2) real visual template previews instead of name/tag cards,
raised twice.

## Confirmed decisions

- **The two paths differ only in starting-content fullness, not editing capability.** Both
  land in the identical guided editor. This needed almost no new backend work —
  `createSiteContentFromArchetype(archetypeId, null)` (already built in 5.4) already *is*
  the "customize" path; the "pre-built" path is the same call with a real `starterSetId`.
- **Fork order: niche first, then path.** One niche question → the recommender matches a
  specific (archetype, starterSet) pair → exactly two options are shown for that match.
- **Triggers on every new project, every time** — replaces the dashboard's archetype-grid
  dialog as the entry point for *every* project creation, not just first sign-up. Returning
  users get the niche question pre-filled from their saved profile but it's still asked and
  editable each time.
- **Template previews: full Framer/Webflow-style hover-scroll**, not a static screenshot.

## What shipped

- **Step 1** — "What's this site for?" (niche + services/products), pre-filled via the new
  `GET /api/onboarding` for returning users, still editable. The very first project right
  after onboarding skips this step entirely (reuses the answers just given).
- **Step 2** — two real, hover-scroll-preview cards for the matched niche only: the real
  starter set ("ready to launch") vs. the same archetype blank ("build it your way"). A
  "browse all templates" link falls back to the full gallery grid for a bad match.
- **Step 3** — name it, unchanged, creates via the existing `POST /api/projects`.
- **`scripts/capture-template-previews.ts`** (Playwright) — renders every starter set + each
  archetype's blank version through the real `/preview/project/[id]` route and captures a
  full-page screenshot. **24 real screenshots captured and committed** (18 starter sets + 6
  blank archetypes — grew from the planned 14/20 during build).
- **`TemplatePreviewCard`** — pans the captured image on hover over several seconds
  (Framer/Webflow-style), eases back on mouse-leave.

## Verified live (this session, not just designed)
Sign-up → onboarding → `GET /api/onboarding` returns saved answers → create a project via a
real starter set (genuine copy) and via the blank path (`defaultPropsFor` placeholder text,
literally "New headline") for the same archetype → both succeed with 201, content differs
exactly as designed, identical structure/editor either way. Preview images confirmed served at
their real URLs. All test accounts/projects created for verification were deleted afterward.
