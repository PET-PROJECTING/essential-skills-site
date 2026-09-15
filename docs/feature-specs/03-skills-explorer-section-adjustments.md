# Unit 03: Skills Explorer section adjustments

## Goal

Skills Explorer search keeps the collapsed 9-card grid canvas height, but skill cards stay content-sized at the top of that canvas. Searching for a single skill (for example `grill-me`) must not stretch that card to fill the reserved height.

## Design

Homepage `#skills` only. No new tokens, fonts, radius values, or icons. Cards stay `rounded-lg border border-border bg-surface` as in `docs/ui-context.md`.

The explorer already measures the collapsed 9-card grid (`INITIAL_VISIBLE = 9`) and applies that as `minHeight` while searching. Keep that reserved canvas. The bug is CSS Grid stretching the leftover row (and thus a single card) to fill `minHeight`.

**Sparse results (1–8 matches, collapsed).** Grid canvas height matches the unfiltered 9-card layout at the current breakpoint. Cards pack to the start of the grid (`align-content: start` / Tailwind `content-start`). Extra space is empty — no placeholder cells, no stretched cards. Cards in the same row still stretch to the tallest sibling (`align-items` stays the default stretch). Do not use `items-start`; that would break equal-height cards in a row.

**Empty search.** Keep **No skills match** centered in the reserved canvas (`flex items-center justify-center` plus the same `minHeight`). Zero results is not laid out like a card.

**Show more.** Unchanged. It sits outside the grid and may appear or disappear. Do not reserve a button slot or add a spacer. Only the grid canvas stays constant.

**Default 9-card view.** Unchanged density and “Show more” behavior. `content-start` on the result grid is fine here; nine cards still fill the canvas.

`prefers-reduced-motion` and reveal animation are unchanged.

## Implementation

### Grid packing

In `components/home/skills-explorer.tsx`, keep `stableGridHeight`, the `ResizeObserver` measure (when not searching and not expanded), and `minHeight` when `isSearching && !expanded`.

On the result grid (the non-empty `grid gap-6 sm:grid-cols-2 lg:grid-cols-3` class), add `content-start`. Leave the empty-state class as `flex items-center justify-center`.

Do not switch `minHeight` to `height`. Do not apply `items-start` on the grid.

### Leave alone

Search filter, `INITIAL_VISIBLE`, expand / show-more exit, recommended badges, copy in `lib/home-data.ts`, skill links, and Lenis resize on expand. No `globals.css` change unless `content-start` is unavailable and a one-class `align-content: start` is required — prefer the Tailwind class on the grid.

### Context files (when implementing)

- `docs/ui-context.md` — one sentence on Skills Explorer: collapsed grid height is reserved while searching; cards pack to the start and do not stretch to fill that canvas; empty search stays centered.
- `docs/progress-tracker.md` — after the change.
- `docs/polish-ui.md` and `docs/feature-specs/00-build-plan.md` already list this unit.

Do not change `content/skills/`. Do not add `app/api`. Do not add a test runner.

## Dependencies

- None

## Out of scope

- Placeholder / ghost cells to fake a 3×3 grid
- Dropping the reserved `minHeight` (section jumping as you type)
- Reserving space for Show more
- Search, sort, recommended badges, card copy, or explorer density changes
- Skill pages, catalog fetch, snapshot / `sync-skills`
- New tokens, icons, or routes

## Decisions

- New polish unit 03; Token fold and Spec-driven development stay as shipped.
- Reserved 9-card canvas stays; cards pack to the start (`content-start`), leftover space empty.
- This unit is only the height behavior (search, empty state, default 9-card view).
- Empty search stays centered in the reserved canvas.
- Show more may appear or disappear; only the grid canvas is constant.

## Open questions

- None

## Verify when done

- [ ] Unfiltered explorer still shows 9 cards and Show more; card size looks the same as today
- [ ] Search that returns one skill (e.g. `grill-me`): card is content-sized at the top, not stretched to the section height
- [ ] Search that returns a few skills (e.g. 2–5): cards stay compact; grid canvas height matches the collapsed 9-card view
- [ ] Cards in the same row still share one row height (not `items-start` uneven cards)
- [ ] Query with no matches: **No skills match** is centered in the reserved canvas
- [ ] Show more still works; it is allowed to hide while searching
- [ ] Skill card links still go to `/skills/[name]`
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Responsive at mobile and desktop
- [ ] Project build passes
