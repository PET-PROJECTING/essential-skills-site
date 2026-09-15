# Unit 02: Spec-driven development

## Goal

Homepage section **below Packs** that teaches the recommended flow as a horizontal pipeline: **your idea** → `/specify-context` → `/create-feature-spec` → `/review-code` → `/create-commit`. A visitor can read a plain-language job for each step, open each skill’s `/skills/[name]` page, and find those skills (plus `/grill-me`) badged as recommended in the explorer. Context and specs are framed as files in the repo — documentation as you go, still there when the chat is gone.

## Design

One homepage `<section id="workflow">`. Two blocks: the pipeline, then files-vs-chat. Pattern reference for the rail: [JS Mastery skills](https://jsmastery.com/skills) “The loop” (horizontal steps, number, dot on a hairline, command, short job, artifact). **Original copy only** — do not reuse their sentences, skill names, “THE LOOP” label, or todo-app story.

Reuse tokens from `docs/ui-context.md`. Dark-only. Same horizontal gutter and `border-b border-border` as Packs. Files-vs-chat cards `rounded-lg border border-border bg-surface`. Commands and paths `font-mono`; headings `font-display`. Path chips in files-vs-chat match Integration (`rounded-sm bg-accent-soft` + `text-accent`). No new tokens, fonts, radius values, or icon files. CSS circles for rail dots (not new SVG glyphs).

**Header nav.** Fourth in-page item after Packs: **Workflow** → `#workflow`. Order: How it works, Packs, Workflow, Skills. Existing `ScrollSectionButton`.

**Section header.** Heading **Recommended flow**. One subtitle, no second column, no pack-note about Spec-driven context installing two commands. Subtitle idea (original wording in `home-data.ts`): specs and context are written into the repo as you work — auto documentation, and it persists when the session ends.

**Block 1 — Pipeline.** Horizontal row, overflow-x-auto on small screens. Five nodes in this order. **Command (or “Your idea”) on top**, then number, then rail dot, then a meaningful one-line job, then artifact. Type must be readable: command about `text-base` (16px) accent mono; job about `text-sm` (14px) muted; number and artifact about `text-xs` (12px). Do not use 10px labels.

| # | Top line | Job (plain language) | Artifact |
| --- | --- | --- | --- |
| 00 | Your idea | The next feature you want built — still only in your head | not in the repo yet |
| 01 | `/specify-context` | Set up the agent’s environment so it stops guessing about this project | `docs/` · `AGENTS.md` |
| 02 | `/create-feature-spec` | Turn that idea into a unit spec and put it on the build plan | `docs/feature-specs/` |
| 03 | `/review-code` | Check the change against the spec and this project’s coding standards | session report |
| 04 | `/create-commit` | Record the work as conventional commits in git | git history |

- `00` is not a skill: no slash command, no link.
- `01`–`04` skill names are `Link`s to `/skills/[name]`, accent with hover/focus to foreground (or keep accent; hover must be visible).
- Do not add `/grill-me` or `/develop-with-tdd` on the rail.
- No implement sentence under the rail. No “Your next feature” / worked-example block.
- Job copy must say what the visitor *does*, not jargon (“standards vs spec” is banned).

**Animation.** When the pipeline enters the viewport, steps reveal left to right (fade/slide, staggered), matching How it works / Packs (intersection observer, then CSS animation). `prefers-reduced-motion`: show the final layout, no reveal. No looping pulse along the rail.

**Block 2 — Why files, not chat.** Intro plus two columns of tinted pills (not a bordered table). Chat column: `--danger` / `--danger-soft`. Repo column: `--accent` / `--accent-soft`. Lines are `from → to` in mono. Artifacts: `docs/`, `docs/feature-specs/`, `AGENTS.md`, git history. No tests, `docs/scope/`, `design.md`, or `/clear`.

**Explorer recommended.** Exactly: `specify-context`, `create-feature-spec`, `review-code`, `create-commit`, `grill-me`. Not `find-skills`. `/grill-me` is badged only.

No new route. Skill pages stay as they are.

## Implementation

### Copy and nav

In `lib/home-data.ts`:

- Keep Workflow in `navLinks` after Packs.
- `recommendedFlow`: title, subtitle (persistence / auto-docs), `loop` array with `number`, optional `name` (skill id), `title` (command or “Your idea”), `job`, `artifact`. No `packNote`. No implement sentence. No example steps.
- `recommendedSkillNames` stays the five names above.

### Pipeline UI

`components/home/recommended-flow.tsx` (or a small child) may use `"use client"` **only** for the intersection observer on the rail. Do not mark the whole homepage client. Reuse the How it works observer pattern (`threshold`, disconnect after first intersect, reduced-motion short-circuit). Stagger delay via a CSS variable, one class on `globals.css` (like `.how-step` / `.how-step-visible`). Include that class in the existing `prefers-reduced-motion` block.

Wire remains in `app/page.tsx` immediately after `<Packs />`.

### Context files (when implementing)

- `docs/ui-context.md` — pipeline: command on top, `00`–`04`, enter-view stagger, no pack-note column.
- `docs/progress-tracker.md` — after the change.
- Do not add extra plan units; this is still unit 02.

Do not change `content/skills/`. Do not add `app/api`. Do not add a test runner.

## Dependencies

- None

## Out of scope

- New routes, docs hub, blog
- JS Mastery prose, “THE LOOP” eyebrow, nine-skill / todo walkthrough
- `/grill-me` or `/develop-with-tdd` on the rail
- Pack-note / “Spec-driven context provides …” line
- Implement sentence under the rail
- Worked-example (“Your next feature”) block
- Looping/infinite rail pulse
- New icons, tokens, or a third font
- CLI / `sync-skills` / snapshot check / team-install copy

## Decisions

- Surface stays a homepage section below Packs.
- Heading **Recommended flow**. Subtitle is persistence / auto-docs, not the Spec-driven context install note.
- Five pipeline nodes: `00` Your idea, then specify-context, create-feature-spec, review-code, create-commit.
- `00` is copy-only; skills `01`–`04` link to skill pages.
- Step jobs are plain-language; no “standards vs spec”.
- Command (or Your idea) on top of each node; then number, rail dot, job, artifact. Larger type than 10px captions.
- Enter-view stagger (How it works pattern), not a continuous pulse.
- Files-vs-chat stays. Worked example and implement sentence stay gone.
- grill-me recommended in explorer only. find-skills not recommended.
- review-code artifact remains a session report, not a new markdown file.

## Open questions

- None

## Verify when done

- [ ] Pack-note “Spec-driven context provides …” is gone
- [ ] Pipeline is `00` Your idea, then the four skills in order; idea is not a link
- [ ] Each skill command links to `/skills/[name]`
- [ ] Jobs are readable one-liners (not “standards vs spec” / “living context” fragments)
- [ ] Command sits above number/dot/job/artifact; type is clearly larger than 10px captions
- [ ] Rail animates once on enter; reduced-motion shows the finished row
- [ ] No implement sentence; no Your next feature block
- [ ] Files-vs-chat still two columns on desktop, stacked on mobile
- [ ] Explorer recommended badges are exactly those five skills; `find-skills` has none
- [ ] `/grill-me` and `/develop-with-tdd` are not on the rail
- [ ] Skill pages and the rest of the homepage funnel still work
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Responsive at mobile and desktop
- [ ] Project build passes
