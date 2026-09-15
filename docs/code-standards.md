# Code Standards

## General

- Keep modules single-purpose. Routes render; `lib/` fetches and parses; components present.
- Fix the source of a bug. Do not paper over npm/GitHub failures with invented catalog data.
- Do not mix marketing copy, registry parsing, and UI in one file.
- Match existing naming: kebab-case files (`skill-markdown.tsx`), PascalCase components, camelCase functions.
- No test suite. Do not add a runner, spec folder, or “drive-by” tests. Verify with `npm run lint`, `npm run build`, and the affected page.

## TypeScript

- `strict` is required (`tsconfig.json`). Do not add `any`.
- Prefer named exports for components and helpers. App Router pages/layouts keep default exports.
- Type exported data shapes in `lib/` (`Skill`, `Pack`, `PackageSkillsData`).
- Treat npm JSON as unknown at the boundary: parse into `NpmPackageDocument` / `Skill[]`. Throw on missing `dist-tags.latest`, missing readme, or an empty skills table — then `getPackageSkills()` falls back to the snapshot.
- `scripts/sync-skills.mjs` may stay plain Node ESM. New application code is TypeScript.

## Next.js

- Default to Server Components. Pages, layouts, `sitemap.ts`, `robots.ts`, and all of `lib/` stay server-side.
- Add `"use client"` only when the browser is required (events, observers, clipboard, canvas, Lenis, `window`). Do not mark a tree client for convenience.
- Fetch the catalog in server code (`getPackageSkills`), not in effects.
- Do not add `app/api` route handlers. This site has no public API and no mutations.
- Keep `generateStaticParams` / `generateMetadata` on the skill page. Missing skill or markdown → `notFound()`.
- Leave `prebuild` hooked to `sync-skills`. Do not remove it from `npm run build`.

## Styling

- Reusable UI uses the tokens and Tailwind classes in `docs/ui-context.md`. No raw hex / `rgb()` / `rgba()` in buttons, cards, text, borders, badges, or inputs.
- Hex belongs in `:root` when defining a token. `themeColor` and `opengraph-image.tsx` keep hex as documented exceptions.
- Follow the radius scale: `rounded-sm` / `rounded` (chips), `rounded-md` (controls), `rounded-lg` (cards), `rounded-full` (pills).
- Dark only. Do not add a light theme or a third font.
- Honor `prefers-reduced-motion` for decorative motion.

## API Routes

- There are none. Do not create them unless a filled feature spec explicitly says to — and that would still have to beat the architecture rule that this app is read-only.

## Data and Storage

- No database, no blob store, no user writes.
- Catalog metadata: npm `essential-skills` via `fetch` with 24h revalidate in `lib/essential-skills.ts`. On failure, `lib/essential-skills.snapshot.ts`.
- Update the snapshot when the published skill table or `dist-tags.latest` changes. Keep it compatible with `getPackageSkills()`. Do not invent skills in the snapshot.
- Skill bodies: `content/skills/<name>/SKILL.md` from `npm run sync-skills`. Do not hand-edit that tree; re-sync.
- Static marketing copy and icon paths: `lib/home-data.ts` only. Components render those values; they do not own product strings. Site description is `hero.description`; OG subtitle is `ogSubtitle`. `app/layout.tsx` and `app/opengraph-image.tsx` import those strings — do not duplicate them.
- Canonical origin: `NEXT_PUBLIC_SITE_URL`, else `VERCEL_URL`, else localhost (`lib/site-url.ts`).

## File Organization

- `app/` — Routes, metadata, `globals.css`, icons. No registry parsing beyond calling `lib/`.
- `components/home/` — Homepage sections.
- `components/skills/` — Skill-page markdown UI.
- `lib/` — Catalog, snapshot, skill file reads, site URL, `home-data.ts`.
- `content/skills/` — Synced CLI markdown (replace-only).
- `scripts/` — `sync-skills.mjs`.
- `public/icons/` — SVG assets; map new ones in `home-data.ts` `icons` and render via `components/home/icon.tsx`.
- `docs/` — Context and feature specs, not runtime.
