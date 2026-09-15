# Unit 01: Token fold

## Goal

Fold the leftover raw accent colors on selection, cursor glow, the featured pack shadow, and symbol-rain canvas into `--accent` / `--background` (or values derived from them). Homepage and skill pages look the same; those four surfaces no longer contain `#cf0`, `#08080a`, or `rgba(204, 255, 0, …)`.

## Design

No visual redesign. Keep current look: acid-green selection on near-black text, 12% accent cursor glow, 5% accent featured-pack shadow, rain glyphs at the existing per-drop alphas.

Reuse tokens from `docs/ui-context.md`. Do not add new CSS variables. Derive translucent accent with `color-mix(in srgb, var(--accent) …%, transparent)` so the mix matches today’s sRGB `rgba(204, 255, 0, …)`.

Selection is global (homepage and skill pages). Glow, featured shadow, and rain stay homepage-only. `prefers-reduced-motion` behavior is unchanged (glow and rain already hide).

## Implementation

### Selection

In `app/globals.css`, set `::selection` and `::-moz-selection` to `background-color: var(--accent)` and `color: var(--background)` — the same pairing as `.skip-link`.

In `app/layout.tsx`, remove `selection:bg-[#cf0] selection:text-[#08080a]` from the `<html>` `className`. Leave font variables and `antialiased`. Do not replace them with Tailwind `selection:*` utilities.

### Cursor glow

In `.cursor-glow` (`app/globals.css`), replace `rgba(204, 255, 0, 0.12)` with `color-mix(in srgb, var(--accent) 12%, transparent)`. Keep the radial size, position custom properties, and reduced-motion rules. Do not change `components/home/cursor-glow.tsx` unless a class rename is required (it should not be).

### Featured pack shadow

Add a CSS class in `app/globals.css` next to `.cursor-glow`, for example `.pack-featured`, with `box-shadow: 0px 4px 12px color-mix(in srgb, var(--accent) 5%, transparent)`.

In `components/home/packs.tsx`, replace `shadow-[0px_4px_12px_rgba(204,255,0,0.05)]` with that class. Featured cards keep `border-accent`; non-featured cards stay `border-border`.

### Symbol rain canvas

In `components/home/symbol-rain.tsx` only, add a private helper that parses a computed hex (`#cf0` or `#rrggbb`, optional whitespace) into `r,g,b`. At the start of the existing `useEffect`, read `--accent` once via `getComputedStyle(document.documentElement)`.

Use that RGB with the current alpha math:

- lead glyph: `Math.min(drop.alpha + 0.12, 0.42)`
- trail glyph: `drop.alpha * 0.4`

If the computed value is missing or not parseable hex, do not invent a fallback color — skip drawing (leave the canvas blank). Do not call `getComputedStyle` inside the animation frame. Do not add a `lib/` color helper.

## Dependencies

- None

## Out of scope

- `viewport.themeColor` in `app/layout.tsx` (browser chrome; keep hex)
- Hardcoded colors in `app/opengraph-image.tsx` (`ImageResponse` has no `:root`)
- New tokens (`--accent-glow`, `--accent-shadow`, or similar)
- Catalog snapshot / sync check
- Project vs global install copy
- Visual or motion changes beyond swapping the color source
- Hand-editing `content/skills/`

## Decisions

- Scope is the four leftovers listed in `docs/polish-ui.md`, not metadata/OG hex.
- Selection lives only in `globals.css`; layout Tailwind selection classes are removed.
- No new tokens. CSS uses `color-mix` from `var(--accent)`; canvas reads `--accent` via `getComputedStyle`.
- Featured pack shadow is a CSS class in `globals.css`, not a Tailwind arbitrary or inline style.
- Canvas hex parse is a private helper in `symbol-rain.tsx`, read once when the effect starts.
- `color-mix` uses `in srgb` so 12% / 5% matches the current `rgba(204, 255, 0, …)` look.

## Open questions

- None

## Verify when done

- [x] `::selection` / `::-moz-selection` use `var(--accent)` and `var(--background)`; layout has no `selection:bg-[#cf0]` / `selection:text-[#08080a]`
- [x] `.cursor-glow` uses `color-mix` from `var(--accent)` at 12%; glow still follows the pointer and hides under reduced motion / coarse pointer
- [x] Featured pack card uses the new CSS class; shadow still reads as a faint accent, not a layout change
- [x] Symbol rain glyphs still match current brightness; rain hides under reduced motion; `getComputedStyle` is not in the frame loop
- [x] No leftover `#cf0`, `#08080a`, or `rgba(204, 255, 0` in `app/globals.css` (except `:root` token definitions), `app/layout.tsx` selection classes, `components/home/packs.tsx`, or `components/home/symbol-rain.tsx`
- [x] Homepage and a `/skills/[name]` page: selection looks the same as today; skill page still has no glow/rain
- [x] No TypeScript errors
- [x] No console errors
- [x] Responsive at mobile and desktop (glow/rain/packs on homepage)
- [x] Project build passes
