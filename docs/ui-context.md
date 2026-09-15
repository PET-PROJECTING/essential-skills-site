# UI Context

## Theme

Dark only. No light mode. The design language is a dark technical workspace: near-black page, slightly lifted surfaces, hairline borders, and a vivid acid-green accent for interactive and CLI chrome. Motion is decorative (glow, symbol rain, marquee, reveals) and must disable under `prefers-reduced-motion`.

Reusable UI (buttons, cards, text, borders, badges, inputs, links) must use the tokens below — never raw hex, `rgb()`, or `rgba()` in those elements. Hex belongs only in `:root` when defining a token.

Documented hex exceptions (not reusable UI): `viewport.themeColor` in `app/layout.tsx` and colors in `app/opengraph-image.tsx` (`ImageResponse` has no `:root`).

## Colors

Defined in `app/globals.css` `:root` and mapped in `@theme inline` so Tailwind classes match.

| Role | CSS variable | Tailwind | Value |
| --- | --- | --- | --- |
| Page background | `--background` | `bg-background` | `#08080a` |
| Primary text | `--foreground` | `text-foreground` | `#ffffff` |
| Muted text | `--muted` | `text-muted` | `#a3a3ac` |
| Dim / tertiary text | `--muted-dim` | `text-muted-dim` | `#808088` |
| Surface (cards, bars) | `--surface` | `bg-surface` | `#0d0d11` |
| Raised surface (chips, code) | `--surface-raised` | `bg-surface-raised` | `#17171c` |
| Default border | `--border` | `border-border` | `#1d1d24` |
| Accent (links, CTA, focus) | `--accent` | `text-accent`, `bg-accent`, `border-accent` | `#cf0` |
| Accent wash | `--accent-soft` | `bg-accent-soft` | `#1a2400` |
| Danger (chat-failure contrast) | `--danger` | `text-danger` | `#ffa2a2` |
| Danger wash | `--danger-soft` | `bg-danger-soft` | `#2a0b0d` |

`--muted-dim` is captions, placeholders, terminal chrome, pipeline numbers/artifacts, footer, and decorative labels only — not primary body. Body stays `--muted` or `--foreground`.

Positive UI (copied install, recommended badge, repo-side pills) uses `--accent` / `--accent-soft`. The files-vs-chat comparison is the only danger surface: chat-side pills use `--danger` / `--danger-soft`. Do not use danger on form errors or toasts unless those ship.

Focus rings: `outline: 2px solid var(--accent)` with `outline-offset: 2px` (see `globals.css`). Interactive hover/focus text and borders go to `--accent`, not a new color.

## Typography

| Role | Font | CSS / Tailwind |
| --- | --- | --- |
| Display / headings | Space Grotesk | `--font-display` / `font-display` |
| Body / UI text | Space Grotesk | `--font-text` or `--font-sans` / `font-text` |
| CLI, stats, badges, code | JetBrains Mono | `--font-mono` / `font-mono` |

Loaded in `app/layout.tsx` via `next/font/google`. Body uses `font-text`. Headings and the wordmark use `font-display` with tight tracking. Do not add a third family.

Type scale (Tailwind defaults only — no `text-[Npx]`; nothing smaller than `text-xs` / 12px):

| Role | Classes | Used for |
| --- | --- | --- |
| Hero | `text-4xl sm:text-5xl lg:text-6xl` | Homepage `h1` |
| Page title | `text-2xl sm:text-3xl` | Skill page `h1` |
| Section title | `text-xl` | Section `h2`s, CTA heading, install-scopes heading, files-vs-chat headline |
| Card title | `text-lg font-semibold` | Pack names, how-it-works step titles |
| Body | `text-sm` | Section subtitles, card descriptions, skill descriptions, files-vs-chat intro and pills, explorer subtitles, CTA body, skill markdown body |
| Hero subtitle | `text-base` | Hero description only (no `sm:text-lg`) |
| Chrome | `text-xs` (12px) | Badges, labels, eyebrows, terminal, footer, pipeline numbers/artifacts, code in markdown, table headers, agent-strip label |

Leave as they are (not a fourth display size): header wordmark `text-base`, header nav `text-sm`, explorer skill-card names `text-sm`, pipeline job lines `text-sm`, agent names `text-sm`, primary/secondary buttons `text-sm`. Pipeline commands (and “Your idea”) are `text-sm`. Skill markdown: wrapper `text-sm`; `h2` `text-base`; `h3` / `h4` `text-sm`; inline/code and `th` `text-xs`.

## Border Radius

| Context | Class | Used for |
| --- | --- | --- |
| Inline / chips | `rounded-sm` or `rounded` | Inline code, pack/skill badges |
| Controls | `rounded-md` | Buttons, search field, copy control, skill-doc toggle |
| Cards / panels | `rounded-lg` | Packs, explorer cards, install bar, how-it-works terminal, skill doc frame |
| Pills / round buttons | `rounded-full` | Hero badge, scroll-to-top |

Do not introduce one-off `rounded-[…]` values.

## Component Library

None. No shadcn/ui, no `components/ui/`. Build from existing patterns in `components/home/` and `components/skills/`. Copy spacing, type, radius, and token classes from a nearby section rather than starting a new kit.

## Layout Patterns

- **Page shell:** Full-width column, `min-h-dvh`, `bg-background`. Homepage overlays (`SymbolRain`, `CursorGlow`) sit behind content (`z-1` on the content stack).
- **Horizontal gutter:** `px-5 sm:px-10 lg:px-20` on header, footer, and sections.
- **Header:** Top bar, bottom `border-border`, logo left, in-page nav center, GitHub/npm right. `lg:h-[72px]`. Four in-page links, in order: How it works, Packs, Workflow, Skills (`ScrollSectionButton` → `#how-it-works`, `#packs`, `#workflow`, `#skills`).
- **Marketing sections:** Stacked blocks with `border-b border-border`. Hero is `min-h-svh` and centers a `max-w-[880px]` column. Recommended flow (`#workflow`) sits immediately below Packs and above Skills Explorer. Section header is title plus one subtitle (no pack-note column) in the same padded block as the pipeline — no hairline between them. The loop is a five-node horizontal pipeline (`00` Your idea, then four skill commands): command (or Your idea) on top at `text-sm`, then number, rail dot, job, artifact. Steps stagger in on enter-view; the row scrolls sideways on small screens. Files-vs-chat sits below a `border-t`. Skills Explorer (`#skills`) reserves the collapsed 9-card grid height while searching; cards pack to the start of that canvas and do not stretch to fill it; empty search stays centered.
- **Skill page:** Narrow column `max-w-2xl`, no homepage overlays; back control then title then bordered `bg-surface` document frame.
- **Cards:** `rounded-lg border border-border bg-surface`. Featured pack uses `border-accent` instead of `border-border`. Files-vs-chat comparison is two of those cards, each filled with tinted pills (danger wash on chat, accent wash on repo), not a 1px-divider table. Pills stagger in top-to-bottom on enter-view (both columns in parallel); `prefers-reduced-motion` shows the finished stack.
- **Primary CTA:** Accent border, transparent fill, hover `bg-accent-soft`. Secondary: `border-border`, hover accent border/text.
- **Motion:** Respect `prefers-reduced-motion` (already wired in `globals.css`: hide rain/glow/marquee animations, show static agents row).

## Icons

Figma SVGs in `public/icons/`, paths listed in `lib/home-data.ts` `icons`. Render only through `components/home/icon.tsx`.

- Recolorable chrome (GitHub, npm, arrows): `currentColor` mask so parent `text-*` / hover works.
- Fixed-color artwork: plain `<img>` via `Icon` without `currentColor`.
- Typical sizes: 16px inline with text, 20px wordmark, 4px separators (`ellipse`).

Do not add Lucide or another icon pack. New glyphs go in `public/icons/` and on the `icons` map.
