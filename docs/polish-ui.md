# Polish UI

Remaining work on the shipped marketing site. Token fold, spec-driven recommended-flow, Skills Explorer height packing, and readability/metadata polish are done.

Unit specs are **not** stored next to this file. `/create-feature-spec` creates `docs/feature-specs/` and writes `NN-kebab-name.md` there.

Update this file when units are added, reordered, or specced.

| # | Unit | What it builds | Depends on | Spec |
| --- | --- | --- | --- | --- |
| 1 | Token fold | Selection, cursor glow, featured pack shadow, and symbol-rain canvas use `--accent` / `--background` (or token-derived values) instead of raw `#cf0` / `#08080a` / `rgba(204, 255, 0, …)`. Homepage and skill pages still look the same, with no leftover raw accent hex in those files. | None | `01-token-fold.md` |
| 2 | Spec-driven development | Homepage section below Packs: horizontal pipeline (`00` idea → `specify-context` → `create-feature-spec` → `review-code` → `create-commit`), enter-view stagger, files-vs-chat; Workflow nav; those skills plus `grill-me` recommended in the explorer. | None | `02-spec-driven-development.md` |
| 3 | Skills Explorer section adjustments | Search keeps the collapsed 9-card grid canvas; skill cards stay content-sized at the top (`content-start`) instead of stretching to fill that height. Empty search stays centered. Show more is unchanged. | None | `03-skills-explorer-section-adjustments.md` |
| 4 | Readability and metadata polish | Documented type scale (12px min) on homepage and skill pages; `--muted-dim` AA on `--surface-raised`; metadata / OG / JSON-LD aligned with Quick vs Full and the live npm version. Lighthouse a11y+SEO: no contrast or sub-12px failures. | None | `04-readability-and-metadata-polish.md` |

## Ordering rules

- Dependencies first — never build on something that does not exist yet
- Security and access control before the features they protect
- Backend before frontend wiring
- UI shells with placeholder data before real API calls
- Install a package in the unit that first unlocks real behavior

Token fold is shipped. Unit 2 (spec-driven recommended-flow) is shipped. Unit 3 (Skills Explorer height packing) is shipped. Unit 4 (readability and metadata polish) is shipped.

## Notes

- This file is the polish plan (`docs/polish-ui.md`), not a greenfield build plan.
- Snapshot/sync check and team-install copy are **not** on this plan.
- Token fold spec: `docs/feature-specs/01-token-fold.md`. Implemented.
- Spec-driven development spec: `docs/feature-specs/02-spec-driven-development.md`. Implemented.
- Skills Explorer section adjustments spec: `docs/feature-specs/03-skills-explorer-section-adjustments.md`. Implemented.
- Readability and metadata polish spec: `docs/feature-specs/04-readability-and-metadata-polish.md`. Implemented.
