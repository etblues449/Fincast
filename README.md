# CreatorOS — Finance Channel

Content workbench for a faceless personal-finance YouTube channel. Six tabs:
Dashboard, Schedule, AI Ideas, AI Script, Growth, and Pre-publish checklist.
AI Ideas and AI Script are powered by Claude via a server-side proxy.

## Stack

- Next.js 14 (App Router)
- React 18
- Inline styles (no Tailwind / CSS framework)
- Anthropic Messages API via `/api/generate` (server-only; key never leaves the server)

## Run locally

```bash
cp .env.local.example .env.local
# then paste your Anthropic API key into .env.local

npm install
npm run dev
```

Open http://localhost:3000.

## Environment

| Var | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Server-side key used by `/api/generate` to call the Messages API. Required for AI Ideas / AI Script. |

## How the AI calls work

Client components call `POST /api/generate` with `{ system, prompt }`. The
route handler at `app/api/generate/route.js` forwards the request to the
Anthropic Messages API using model `claude-sonnet-4-5` and returns the first
text block. The API key is read from `process.env` and never reaches the browser.

## Project layout

```
app/
  layout.jsx        root layout
  globals.css       fonts + body reset
  page.jsx          client component — all six tabs
  api/generate/
    route.js        server-side Claude proxy
```

## Not in scope (yet)

- Persistence (videos/checklist are in-memory)
- Auth
- Deploy config
