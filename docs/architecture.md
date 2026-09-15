# Architecture Context

## Stack

| Layer        | Technology                                      | Role                                                                 |
| ------------ | ----------------------------------------------- | -------------------------------------------------------------------- |
| Framework    | Next.js 16 App Router + TypeScript              | Routes, SSR/SSG, ISR, metadata, security headers                     |
| UI           | React 19 + Tailwind CSS 4                       | Marketing and catalog UI                                             |
| Markdown     | `react-markdown` + `remark-gfm`                 | Render synced `SKILL.md` bodies                                      |
| Catalog      | npm registry (`essential-skills`, 24h revalidate) | Live skill list, version, Quick/Full counts                        |
| Documents    | GitHub tarball sync on `prebuild`               | Copy `skills/*/SKILL.md` from `PET-PROJECTING/essential-skills`      |
| Fallback     | `lib/essential-skills.snapshot.ts`              | Catalog metadata when npm is unreachable                             |
| Motion       | Lenis                                           | Homepage smooth scroll                                               |
| Analytics    | Vercel Analytics + Speed Insights               | Usage and performance                                                |
| Hosting      | Vercel                                          | Deploy, cache headers, `VERCEL_URL` / `NEXT_PUBLIC_SITE_URL`         |
| Auth         | None                                            | Public, unauthenticated site                                         |
| Database     | None                                            | Source of truth is the published CLI, not this app                   |

Keep this stack because the site is a read-only catalog that must stay aligned with the CLI, not a product with its own data model. Next.js covers SEO and ISR; npm + GitHub keep the two artifacts (metadata vs documents) on the publishers that already own them.

## System Boundaries

- `app/` — Routes and document chrome only (`/`, `/skills/[name]`, sitemap, robots, OG image, fonts, metadata, JSON-LD). JSON-LD `SoftwareApplication.softwareVersion` comes from `getPackageSkills()` (snapshot fallback inside that helper), not a hardcoded `1.0`. No business parsing here beyond calling `lib/`.
- `components/home/` — Homepage marketing sections (hero, packs, recommended-flow, explorer, CTA, chrome).
- `components/skills/` — Skill-page rendering (`SkillMarkdown`, preview chrome).
- `lib/` — Catalog fetch/parse, snapshot fallback, skill file reads, site URL, static copy (`home-data.ts`).
- `content/skills/` — Replace-only mirror of CLI `SKILL.md` files. Not a second editorial source.
- `scripts/` — `sync-skills.mjs` (download GitHub tarball, wipe and rewrite `content/skills/`).
- `public/` — Static icons and assets.
- `docs/` — Agent context and feature specs. Not runtime.

The Essential Skills CLI repository is outside this system. This site may read it (npm + GitHub); it must not implement install, pack selection, or agent-folder writes.

## Storage Model

- **No database.** There are no users, sessions, or mutable records.
- **npm registry (runtime, ISR 24h):** Package `dist-tags.latest` and the published README “Included skills” table. Parsed in `lib/essential-skills.ts`. On fetch/parse failure, use the checked-in snapshot — never an empty or invented catalog.
- **GitHub tarball (build):** `main` of `PET-PROJECTING/essential-skills`, `skills/*/SKILL.md` → `content/skills/<name>/SKILL.md`. `npm run build` runs this via `prebuild`. Sync deletes the tree first so stale skill folders cannot accumulate.
- **Checked-in snapshot:** `lib/essential-skills.snapshot.ts` — last-known catalog shape for npm outages. It does not replace GitHub sync for document bodies.
- **Filesystem (deployed app):** Synced markdown on disk, read at request/build by `lib/skill-content.ts`.
- **Env:** `NEXT_PUBLIC_SITE_URL` (canonical origin); otherwise `VERCEL_URL`; otherwise `http://localhost:3000`.

There is no blob/object store. Icons live in `public/`.

## Auth and Access Model

- No sign-in, accounts, or API keys for visitors.
- Every page is public. There is no ownership or role model.
- The only writes are maintainer/CI: deploy, `sync-skills`, and snapshot updates.
- Skill markdown is untrusted input from GitHub: render through `react-markdown` only. Never `dangerouslySetInnerHTML` on skill bodies.

## Invariants

1. This repository does not implement, package, or release the Essential Skills CLI.
2. Do not add a database, auth provider, or user-generated writes.
3. Catalog metadata is read from npm `dist-tags.latest`. If npm fails, show the snapshot. Do not fabricate skills or counts.
4. Skill document bodies come from the CLI repo’s `skills/` on `main` after sync. Do not hand-edit `content/skills/` as a source of truth; re-run `npm run sync-skills`.
5. Production builds must run `sync-skills` before `next build` (already hooked as `prebuild`).
6. Skill bodies are rendered only via `react-markdown`. No raw HTML injection from `SKILL.md`.
7. Routes stay in `app/`, UI in `components/`, data/parsing in `lib/`, sync in `scripts/`. Do not collapse those boundaries.
