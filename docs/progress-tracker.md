# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Feature specs. Units 1–4 shipped.

## Current Goal

- None on the polish plan. Units 1–4 are implemented.

## Completed

- Essential Skills homepage funnel (hero, how-it-works, packs, explorer, agents, install scopes, CTA)
- Skill detail pages at `/skills/[name]` rendering synced `SKILL.md`
- npm catalog fetch with snapshot fallback; GitHub `sync-skills` on `prebuild`
- SEO (sitemap, robots, OG image, JSON-LD, cache headers)
- Accessibility, UX, and security-header polish
- Vercel Analytics and Speed Insights
- Context files: `project-overview.md`, `architecture.md`, `ui-context.md`, `code-standards.md`, `ai-workflow-rules.md`, `progress-tracker.md`, `polish-ui.md`
- Token fold (`01-token-fold.md`): selection, cursor glow, featured pack shadow, and symbol-rain canvas use `--accent` / `--background` (or `color-mix` / computed-style derivatives)
- Spec-driven development (`02-spec-driven-development.md`): homepage `#workflow` pipeline `00` Your idea → four skills, persistence subtitle, enter-view stagger, files-vs-chat; pack-note removed; explorer recommended stays those four plus grill-me
- Skills Explorer section adjustments (`03-skills-explorer-section-adjustments.md`): search keeps the collapsed 9-card `minHeight`; result grid uses `content-start` so cards stay content-sized at the top; empty search stays centered; Show more is unchanged
- Readability and metadata polish (`04-readability-and-metadata-polish.md`): documented type scale (12px min), `--muted-dim` `#808088`, product-aligned description/OG subtitle in `home-data.ts`, JSON-LD `softwareVersion` from `getPackageSkills()`

## In Progress

- None

## Next Up

- None on the plan with Spec `missing`.
- Deferred (not on `docs/polish-ui.md`): catalog snapshot / sync check; project vs global install copy

## Open Questions

- None

## Architecture Decisions

- No database and no auth. Catalog metadata from npm (24h ISR + snapshot fallback); skill bodies from GitHub tarball at build.
- Folders stay `app/` / `components/` / `lib/` / `content/skills/` / `scripts/`.
- Skill markdown via `react-markdown` only — no raw HTML injection.
- Dark-only theme; reusable UI uses existing CSS tokens, not raw hex.
- Server Components by default; `"use client"` only when the browser is required.
- No test suite; verify with lint, build, and a page check.
- Token fold: selection owned by `globals.css` only; no new tokens; translucent accent via `color-mix(in srgb, var(--accent) …%, transparent)`; canvas reads `--accent` once with `getComputedStyle`; featured pack shadow is a CSS class beside `.cursor-glow`. `themeColor` and OG image hex stay out of this unit.
- Recommended-flow section: homepage-only marketing. Horizontal pipeline: `00` Your idea (not a link) → specify-context → create-feature-spec → review-code → create-commit. Command on top of each node; enter-view stagger (How it works pattern). No pack-note, no implement sentence, no worked example. Files-vs-chat: headline + intro, then red/green tinted pills (danger vs accent), not a table. Artifacts: `docs/`, `docs/feature-specs/`, `AGENTS.md`, git history. Explorer recommended: those four plus grill-me; find-skills not recommended. Nav label Workflow → `#workflow`.
- Files-vs-chat contrast tokens: `--danger` / `--danger-soft` live in `:root` next to accent. Only used for the chat-failure column.
- Skills Explorer search: keep the measured collapsed 9-card canvas (`minHeight`); pack cards with `align-content: start` so a single result does not stretch. Empty “No skills match” stays centered. Show more is not reserved.
- Unit 4 readability: one type scale (hero `4xl/5xl/6xl`, page title `2xl/3xl`, section `xl`, card `lg`, body `sm`, hero subtitle `base`, chrome `xs` / 12px min). Pipeline commands `text-sm` (overrides unit 02 `text-base`). `--muted-dim` `#808088` for AA on `--surface-raised`; not for body. Metadata description is Quick/Full + inspect `SKILL.md`; JSON-LD version from `getPackageSkills()`. Lighthouse a11y+SEO only (no Performance target).

## Session Notes

- Context root: `docs/`. Polish plan: `docs/polish-ui.md`. Feature specs: `docs/feature-specs/`.
- Token fold implemented from `docs/feature-specs/01-token-fold.md`. Hex remaining only in `:root`, `viewport.themeColor`, and `opengraph-image.tsx`.
- Spec-driven development implemented from `docs/feature-specs/02-spec-driven-development.md`. Rail copy and stagger live in `lib/home-data.ts`, `components/home/recommended-flow.tsx`, and `.flow-step` in `globals.css`. Files-vs-chat uses JS Mastery-style tinted pills: `--danger` / `--danger-soft` for chat, `--accent` / `--accent-soft` for repo.
- Unit 3 implemented: `content-start` on the Skills Explorer result grid in `components/home/skills-explorer.tsx`. Reserved `minHeight` unchanged; empty state still `flex items-center justify-center`.
- Files-vs-chat columns use the same `rounded-lg border border-border bg-surface` cards as Packs/Explorer instead of opaque `bg-background` slabs with a 1px divider.
- Recommended-flow title and pipeline share one padded block (Packs pattern); the hairline between them is gone. Hairline remains only above files-vs-chat.
- Files-vs-chat pills stagger top-to-bottom on enter-view (`.flow-pill` in `globals.css`, observer in `recommended-flow-contrast.tsx`). Reduced motion shows the final stack.
- Unit 4 implemented from `docs/feature-specs/04-readability-and-metadata-polish.md`. No `text-[Npx]` in app/components UI. Site description and OG subtitle live in `lib/home-data.ts`; layout imports `hero.description`; JSON-LD `softwareVersion` is `getPackageSkills().version`.
- Do not hand-edit `content/skills/`.
