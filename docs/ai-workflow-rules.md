# AI Workflow Rules

## Approach

Build this site incrementally against the context files in `docs/`. Those files define the product, architecture, UI, and code rules. Do not invent behavior that is not in them.

- **Existing surfaces** (homepage sections, skill pages, tokens, copy in `lib/home-data.ts`, catalog fetch/sync): implement polish and bugfixes directly from context. Grill only when the change has a real fork.
- **New pages, new user-visible behavior, or new data sources**: run `/create-feature-spec` first (it creates `docs/feature-specs/` and the unit spec) before writing application code.
- Implement one feature unit at a time. Update `docs/progress-tracker.md` after each meaningful change.

## Scoping Rules

- Work on one feature unit at a time
- Prefer small, verifiable increments over large speculative changes
- Do not combine unrelated system boundaries in a single implementation step
- Do not implement the Essential Skills CLI, auth, a docs hub, or a marketplace — those are out of scope

## When to Split Work

Split an implementation step if it combines:

- Homepage/marketing UI and catalog parsing or `sync-skills`
- Token/`globals.css` changes and `lib/essential-skills.ts` or snapshot updates
- Copy changes in `home-data.ts` and a new route or data source
- Behavior that is not defined in the context files or the current unit spec

If a change cannot be linted, built, and checked on one route quickly, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent product behavior not defined in the context files or the current spec
- If a requirement is ambiguous, resolve it in the relevant context file before implementing
- If a requirement is missing, add it as an open question in `docs/progress-tracker.md` before continuing
- If the work is a new page, new behavior, or new data source and no spec exists, stop and run `/create-feature-spec`

## Protected Files

Do not modify the following unless explicitly instructed:

- `content/skills/**` — replace-only mirror. Run `npm run sync-skills` instead of hand-editing
- `lib/essential-skills.snapshot.ts` — except when the published npm skill table or `dist-tags.latest` changes
- The Next.js auto-generated block in `AGENTS.md` (`<!-- BEGIN:nextjs-agent-rules -->` … `<!-- END:nextjs-agent-rules -->`)
- `node_modules/`, `.next/`, and other install/build output

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:

- System architecture or boundaries → `docs/architecture.md`
- Storage model or catalog/sync behavior → `docs/architecture.md` and `docs/code-standards.md`
- Visual tokens, type, layout, icons → `docs/ui-context.md`
- Code conventions → `docs/code-standards.md`
- Feature scope or success criteria → `docs/project-overview.md`
- Progress after each meaningful change → `docs/progress-tracker.md`

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope
2. No invariant in `docs/architecture.md` was violated
3. `docs/progress-tracker.md` reflects the completed work
4. `npm run lint` and `npm run build` pass
5. The changed route was inspected; if UI changed, the flow was clicked through in the browser
6. Do not add a test runner or spec files to “verify”
