# Essential Skills Site

## Overview

This repository is the public marketing and skill-catalog site for **Essential Skills**, an open-source CLI (`npx essential-skills`) that copies curated skill protocols into AI coding agents. It is for individual developers and for teams who want the same pack on every machine so agents produce similar, unified results. The site’s job is to explain the product, convert a visitor into running the CLI, and let them inspect the exact skill files that will be installed. The CLI itself lives in a separate repository.

## Goals

1. Convert a visitor into copying and running `npx essential-skills` after they understand Quick vs Full.
2. Let a visitor browse the live catalog and open any skill’s exact `SKILL.md` before they install.
3. Keep the catalog counts, skill list, and skill documents matched to the latest published CLI (npm registry + GitHub sync).
4. Make it clear that installing the same pack (globally or per repo) is how a team gets consistent agent behavior across machines.

## Core User Flow

1. Visitor lands on the homepage and sees the value proposition: better habits for their AI coding agent.
2. They skim How it works (run the CLI, choose scope and agents, pick skills).
3. They compare Quick (pet projects) vs Full (production rails).
4. They copy `npx essential-skills` from the header, hero, or CTA.
5. Optionally they search the Skills Explorer and open `/skills/[name]` to read the protocol that will be injected.
6. They run the CLI locally: project or global install, select agents, pick a pack or individual skills.
7. A teammate on another machine installs the same pack the same way, so both agents follow the same protocols.

## Features

### Marketing and conversion

- Homepage funnel: hero, how-it-works, packs, recommended-flow (spec-driven loop), explorer, supported agents, install scopes, CTA
- One-command install copy (`npx essential-skills`) with clipboard affordance
- Pack comparison: Quick vs Full, with live skill counts from the published package
- Agent list (Cursor, Claude Code, Codex, Copilot, Gemini CLI, OpenCode, Universal)
- Project vs global install copy — the team-standardization mechanism, not a separate product surface

### Skill catalog

- Skills Explorer: search, recommended skills, Quick/Full tags
- Skill detail pages that render the synced `SKILL.md` body
- Catalog metadata from the npm `essential-skills` package (24h revalidate, checked-in snapshot fallback)
- Skill markdown synced from `PET-PROJECTING/essential-skills` on `main` via `npm run sync-skills`

### Site quality

- SEO: metadata, sitemap, robots, Open Graph image, JSON-LD
- Vercel Analytics and Speed Insights
- Public, unauthenticated pages only

## Scope

### In Scope

- Public marketing pages and the skill catalog/detail UI
- Copy and layout that explain packs, agents, and project vs global install
- Fetching and displaying the published skill list and documents
- Keeping the site accurate relative to the latest CLI release
- Polish, accessibility, performance, and SEO for those surfaces

### Out of Scope

- Implementing, packaging, or releasing the Essential Skills CLI
- Auth, accounts, billing, or user dashboards
- A docs/guides hub, blog, or contributor handbook
- A skill marketplace or third-party skill publishing
- Team admin, org management, or license enforcement — teams standardize by installing the same pack

## Success Criteria

1. A visitor can copy `npx essential-skills` from the homepage without creating an account.
2. The homepage shows live Quick and total skill counts from the published package (or the snapshot if npm is unreachable).
3. A visitor can open any catalog skill at `/skills/[name]` and read that skill’s exact `SKILL.md`.
4. Catalog metadata matches `dist-tags.latest` on npm, and skill documents match the CLI repo’s `skills/` on `main` after sync.
