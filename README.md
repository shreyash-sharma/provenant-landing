# Provenant Landing

This repository contains the public landing page and documentation site for
Provenant, a local repository intelligence layer for AI coding agents.

The site is built as a Vite + React single-page app. It has two main surfaces:

- `/` - marketing landing page focused on token and cost reduction.
- `/docs` - Nextra-style documentation shell rendered from Markdown files in
  `src/content/product-docs`.

## What Provenant Communicates

Provenant indexes a codebase once, builds compact cited repository memory, and
serves that context to coding agents through MCP. The landing page is written
around the core value proposition: less raw context, fewer tokens, lower agent
cost, and local usage visibility through optional `ccusage` sync.

The docs section is intentionally separate from the landing page. It keeps setup,
retrieval model, usage telemetry, privacy, evaluation, and CLI reference material
in a more structured documentation layout.

## Tech Stack

- Vite
- React
- React Router
- Tailwind CSS
- Framer Motion
- Lucide icons
- Vercel hosting

## Repository Layout

```text
public/
  provenant.png
  provenant-mark-white.png
  provenant-wordmark.png

src/
  components/
    HealingDemo.tsx
    motion.tsx
  content/
    product-docs/
      *.md
  pages/
    Landing.tsx
    Docs.tsx
  App.tsx
  main.tsx
  index.css

vercel.json
vite.config.ts
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3001
http://localhost:3001/docs
```

## Validation

Run TypeScript checks:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

The build output is written to `dist/` and is intentionally ignored by git.

## Documentation Content

Docs pages are sourced from Markdown files under:

```text
src/content/product-docs
```

To add a docs page:

1. Add a Markdown file in `src/content/product-docs`.
2. Import it in `src/pages/Docs.tsx` with `?raw`.
3. Add it to the correct `DOC_GROUPS` section.

The docs renderer supports:

- Headings
- Paragraphs
- Lists
- Tables
- Code blocks
- Local Markdown links
- Basic flowchart and sequence diagrams from Mermaid-style fenced blocks

## Vercel Deployment

This app uses client-side routing. `vercel.json` rewrites all routes to
`/index.html` so direct visits to `/docs` and `/docs/:slug` do not 404.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Environment Variables

PostHog is optional. If these variables are absent, the site runs without
analytics.

```text
VITE_PUBLIC_POSTHOG_PROJECT_TOKEN=
VITE_PUBLIC_POSTHOG_HOST=
```

## Deployment Checklist

Before pushing changes:

```bash
npm run lint
npm run build
```

After Vercel deploys, verify:

```text
/
/docs
/docs/quickstart
/docs/usage-and-savings
```
