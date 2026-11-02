# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Svelte MCP Tools

You have access to the Svelte MCP server with comprehensive Svelte 5 and SvelteKit documentation.

1. **`list-sections`** — call this FIRST to discover relevant documentation sections.
2. **`get-documentation`** — fetch all sections relevant to the task after reviewing `list-sections` results.
3. **`svelte-autofixer`** — MUST be called before sending any Svelte code to the user. Repeat until no issues remain.
4. **`playground-link`** — only generate on explicit user request; never if code was written to project files.

## Project Overview

Website for **Stavebniny Orol** (a Slovak building materials company). Built with SvelteKit 2 + Svelte 5, deployed to Cloudflare Pages.

## Commands

```bash
bun run dev          # start dev server
bun run build        # production build
bun run preview      # preview production build
bun run check        # type-check with svelte-check
bun run lint         # prettier + eslint check
bun run format       # auto-format with prettier
```

## Architecture

- **Svelte 5 runes mode** is enforced project-wide via `svelte.config.js` — never use legacy `$:`, `export let`, or event directives. Use `$props()`, `$state()`, `$derived()`, `$effect()`.
- Routes live in `src/routes/`. Each page is a `+page.svelte`, shared layout in `+layout.svelte`.
- Static assets (images, favicon) live in `src/lib/assets/` and are imported directly into components.
- Design reference docs are in `src/docs/`: `Color_Palette.md`, `website_layout.md`, `Links.md`.
- No tests are configured yet.

## Design System

Color tokens are defined in `src/docs/Color_Palette.md` also look into DESIGN.md. Apply them as CSS custom properties:

```css
--color-brand-primary: #c0281c; /* Orol Red — CTAs, links */
--color-brand-hover: #e03323; /* Ember Red — hover/active */
--color-brand-dark: #8c1a10; /* Deep Crimson — footer, headings */
--color-iron: #1e2022; /* body text, nav bg (not pure black) */
--color-chalk: #f2f4f5; /* alternate section bg */
--color-white: #ffffff; /* page bg, cards */
```

Never use pure black (`#000000`) — use Iron. Don't use red for error states — use `--color-error: #c62828`.

## Planned Pages (from `src/docs/website_layout.md`)

Home, Product categories (with subcategories), Services, Price quote form, Contact, News/Blog, Promotions/Sales, About us.

Header: logo + site name (left), nav (center-right), phone + social icons (far right).
Footer: quick links, opening hours, contact, social, map, GDPR/legal links, company IDs.
Persistent CTA: "Cenová ponuka" button pinned to bottom-right of screen.
