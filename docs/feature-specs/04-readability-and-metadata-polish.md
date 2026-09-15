# Unit 04: Readability and metadata polish

## Goal

Homepage and skill pages use one documented type scale (nothing smaller than 12px) and `--muted-dim` that passes WCAG AA on `--surface-raised`. Root metadata, OG subtitle, and JSON-LD match the current product (install the CLI, Quick vs Full, inspect `SKILL.md`) and the live npm version. Lighthouse Accessibility and SEO on `/` and one skill page report no contrast failures and no “legible font sizes” failures.

## Design

Dark-only. Existing tokens, fonts, and radius from `docs/ui-context.md`. No new color tokens, no third font, no new icon files. Hex still belongs only in `:root` (plus the documented `themeColor` and OG `ImageResponse` exceptions).

**Type scale** (Tailwind defaults only — no `text-[Npx]`):

| Role | Classes | Used for |
| --- | --- | --- |
| Hero | `text-4xl sm:text-5xl lg:text-6xl` | Homepage `h1` |
| Page title | `text-2xl sm:text-3xl` | Skill page `h1` |
| Section title | `text-xl` | Section `h2`s, CTA heading, install-scopes heading, files-vs-chat headline |
| Card title | `text-lg font-semibold` | Pack names, how-it-works step titles |
| Body | `text-sm` | Section subtitles, card descriptions, skill descriptions, files-vs-chat intro and pills, explorer subtitles, CTA body, skill markdown body |
| Hero subtitle | `text-base` | Hero description only (no `sm:text-lg`) |
| Chrome | `text-xs` (12px) | Badges, labels, eyebrows, terminal, footer, pipeline numbers/artifacts, code in markdown, table headers, agent-strip label |

Leave as they are (not a fourth display size): header wordmark `text-base`, header nav `text-sm`, explorer skill-card names `text-sm`, pipeline job lines `text-sm`, agent names `text-sm`, primary/secondary buttons `text-sm`.

Pipeline **commands** (and “Your idea”) become `text-sm`. That supersedes unit 02’s `text-base` command size. Update `docs/ui-context.md` to match when implementing.

Delete one-offs: `text-[10px]`, `text-[11px]`, `text-[12px]`, `text-[13px]`, `text-[15px]`, `sm:text-[28px]`, `sm:text-[32px]`, `lg:text-[64px]`.

Skill markdown: wrapper `text-sm`; `h2` `text-base`; `h3` / `h4` `text-sm`; inline/code and `th` `text-xs`.

**Contrast.** Change `--muted-dim` in `:root` from `#7a7a82` to `#808088` (4.56:1 on `--surface-raised`, 5.11:1 on `--background`). No other token hex changes. `--muted-dim` is captions, placeholders, terminal chrome, pipeline numbers/artifacts, footer, and decorative labels only — not primary body. Body stays `--muted` or `--foreground`.

**Copy (same pitch, three strings).** Put them in `lib/home-data.ts` and import them. Do not leave a second description literal in `layout.tsx`.

- Default document title stays `Essential Skills`. Skill pages stay `{skill.name} | Essential Skills`.
- Description (hero + `metadata.description` + JSON-LD WebSite): `Install curated skill protocols for AI coding agents. Choose Quick or Full, then read the exact SKILL.md that gets copied onto your machine.`
- OG image subtitle: `Curated skill protocols. Quick or Full. The exact SKILL.md your agent will use.`

How-it-works, packs, and CTA section copy stay as they are (including the existing Full/TDD mention in how-it-works).

Keywords drop TDD/SOLID as the lead. Use catalog/install terms (`essential-skills`, `npx essential-skills`, Quick pack, Full pack, AI coding agents, Cursor skills).

JSON-LD `SoftwareApplication.softwareVersion` is `getPackageSkills().version` (snapshot fallback already inside that helper). Stop hardcoding `"1.0"`. SoftwareApplication description may stay a one-line CLI blurb as long as it does not pitch TDD/SOLID.

OG artwork hex stays the documented exception. Only the subtitle string changes.

## Implementation

### 1. Token and type table

In `app/globals.css` `:root`, set `--muted-dim: #808088`. Keep the `@theme` mapping so `text-muted-dim` / `placeholder:text-muted-dim` follow it.

When implementing, add the type-scale table and the muted-dim usage rule to `docs/ui-context.md` (Typography + Colors). Note pipeline commands as `text-sm`.

### 2. Map UI to the scale

Replace arbitrary `text-[…px]` and the oversized section titles:

- `components/home/hero.tsx` / `hero-typing.tsx` — badge `text-xs`; `h1` `text-4xl sm:text-5xl lg:text-6xl`; subtitle `text-base`; stats `text-xs`.
- `components/home/how-it-works.tsx` — step titles `text-lg`; terminal chrome `text-xs` (drop `11px` / `12px` / `13px`).
- `components/home/packs.tsx` — pack `h3` `text-lg`; badges `text-xs`; feature lines `text-sm`.
- `components/home/recommended-flow.tsx` — files-vs-chat headline `text-xl` (no `sm:text-2xl`); pills `text-sm` (drop `13px` / `leading-[19px]`).
- `components/home/recommended-flow-pipeline.tsx` — command / “Your idea” `text-sm`.
- `components/home/skills-explorer.tsx` — section subtitle, search input, card descriptions `text-sm`; badges and Show more `text-xs`.
- `components/home/cta.tsx` — heading `text-xl`; description `text-sm`.
- `components/home/integration.tsx` — heading `text-xl`; `13px` body `text-sm`; inline code `text-xs`.
- `components/home/agents-strip.tsx` — label `text-xs`.
- `app/skills/[name]/page.tsx` — description `text-sm`; badges `text-xs`.
- `components/skills/skill-markdown.tsx` and `skill-doc-preview.tsx` — scale as in Design.

Do not restyle layout, spacing, or motion except where a type class change requires dropping a one-off `leading-[Npx]`.

### 3. Metadata and copy

In `lib/home-data.ts`, set `hero.description` to the description string above and export the OG subtitle (same file as other marketing copy).

In `app/layout.tsx`, import that description. Keep the title default/template. Update `keywords`. Make the root layout async and call `getPackageSkills()` for JSON-LD `softwareVersion`. WebSite `description` uses the same string. Do not add `app/api`.

In `app/opengraph-image.tsx`, replace the TDD/SOLID subtitle with the OG subtitle string. Leave background/accent/muted hex as they are.

Skill `generateMetadata` already uses catalog `skill.description` — leave that behavior. No change required unless a title/description field still hardcodes TDD/SOLID.

### 4. Context files (when implementing)

- `docs/ui-context.md` — type scale table; `--muted-dim` `#808088`; muted-dim not for body; pipeline commands `text-sm`.
- `docs/architecture.md` — JSON-LD `softwareVersion` comes from `getPackageSkills()`, not a hardcoded `1.0`.
- `docs/code-standards.md` — site description / OG subtitle live in `home-data.ts`; layout imports them.
- `docs/progress-tracker.md` — after the change.
- `docs/polish-ui.md` and `docs/feature-specs/00-build-plan.md` already list this unit once specced.

Do not change `content/skills/`. Do not add a test runner.

## Dependencies

- None

## Out of scope

- Lighthouse Performance (Lenis, analytics, motion, bundle)
- Tap-target / other a11y failures beyond contrast and sub-12px text
- WCAG AAA palette restyle
- Rewriting how-it-works, packs, or CTA copy
- New routes, sections, tokens, fonts, or icons
- Catalog snapshot / sync check; project vs global install copy
- CLI, auth, `app/api`

## Decisions

- New polish unit 04. Units 01–03 stay shipped.
- One unit: type scale + contrast + metadata; verify with Lighthouse a11y/SEO.
- Both `/` and `/skills/[name]` (including skill markdown).
- Type scale as in Design; 12px minimum; CTA and install-scopes headings drop to `text-xl`.
- Pipeline commands `text-sm`, superseding unit 02’s `text-base`.
- Explorer skill-card titles stay `text-sm` (dense catalog, not pack cards).
- `--muted-dim` → `#808088`; no new tokens; muted-dim is not body text.
- Title stays `Essential Skills`. Description and OG subtitle as in Design. Hero uses the same description.
- JSON-LD version from `getPackageSkills()`. OG hex exception unchanged.
- Lighthouse bar: no contrast failures and no “Document doesn’t use legible font sizes” on `/` and one skill page. Performance not a target.

## Open questions

- None

## Verify when done

- [ ] No `text-[10px]` / `text-[11px]` (or other sub-12px) in app or components UI
- [ ] Section titles (including CTA and install scopes) are `text-xl`; hero is `4xl/5xl/6xl`; skill `h1` is `2xl/3xl`
- [ ] Pack titles and how-it-works steps are `text-lg`; files-vs-chat headline is `text-xl`
- [ ] Pipeline commands are `text-sm`; job lines still readable
- [ ] `--muted-dim` is `#808088`; body copy is not `text-muted-dim`
- [ ] Homepage hero and `<meta name="description">` use the Quick/Full + `SKILL.md` sentence (no TDD/SOLID lead)
- [ ] OG image subtitle matches the spec string
- [ ] JSON-LD `softwareVersion` equals the catalog package version (not `1.0`)
- [ ] Lighthouse Accessibility + SEO on `/`: no contrast issues, no “legible font sizes” failure
- [ ] Same Lighthouse checks on one skill page (e.g. `/skills/specify-context`)
- [ ] How-it-works / packs / CTA copy unchanged aside from type classes
- [ ] Skill detail still renders synced markdown; catalog links still work
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Responsive at mobile and desktop
- [ ] Project build passes
