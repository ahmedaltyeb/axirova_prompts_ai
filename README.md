# Axirova Prompt Architect AI

Arabic-first AI prompt engineering SaaS. Turns a simple idea — text, an uploaded image, or both — into a Professional, Advanced, and Short prompt variant, a recommended AI tool, an explanation, and improvement suggestions. Tuned for Gulf business context (industry, audience, and cultural tone detection).

## Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui (Base UI primitives)
- **Backend:** Next.js Server Actions, Prisma ORM
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth (email/password)
- **AI:** Provider abstraction (`src/lib/ai`) with a fully functional rule-based Arabic/English engine by default, plus optional OpenAI/Anthropic adapters

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` / `DIRECT_URL` — from Project Settings → Database → Connection string (pooled + direct).
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Project Settings → API.
   - `SUPABASE_SERVICE_ROLE_KEY` — same page. Used server-side for uploading prompt reference images to Supabase Storage (a public `prompt-images` bucket is created automatically on first upload). Keep this secret; never expose it to the client.
3. In Supabase Auth settings, enable email/password sign-in (enabled by default). Disabling "Confirm email" simplifies local testing.

### 3. Run migrations and seed data

```bash
npm run db:migrate
npm run db:seed
```

This creates the schema and seeds the 9 prompt categories and 4 AI provider rows (`rule-based`, `openai`, `anthropic`, `gemini`).

### 4. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000`.

## AI providers

The app ships with a **rule-based engine** (`src/lib/ai/providers/rule-based.ts`) that requires no API keys — it does real Arabic-script detection, industry/audience/platform/Gulf-market keyword matching, and template-based prompt generation. This is the default and always available.

To enable live LLM generation, add any of these keys to `.env`:

```bash
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
GEMINI_API_KEY="..."
DEFAULT_AI_PROVIDER="openai"   # or "anthropic" / "gemini"
```

Users can also pick their preferred provider per-account from **Settings → AI Model Selection** — unavailable providers (no key configured) are shown disabled with a "Requires API key" badge. If a live provider call fails, the app automatically falls back to the rule-based engine.

### Image upload

The Workspace also accepts an attached reference image (alongside or instead of text), in two modes:
- **Describe this image** — reverse-engineers the exact image into a prompt that would reproduce it.
- **Generate similar** — writes a prompt for a new, related piece in a similar style, not a copy.

Image understanding requires a vision-capable provider (OpenAI, Anthropic, or Gemini) — the rule-based engine can't process images, so attaching one while on `rule-based` returns a friendly error asking you to pick another provider in Settings.

## Project structure

```
prisma/schema.prisma         Database schema (User, Prompt, PromptCategory, PromptHistory, AIProvider, UserSettings)
prisma/seed.ts                Seeds categories + AI providers
src/app/(marketing)/          Landing page
src/app/(auth)/                Login / signup
src/app/(app)/                 Dashboard, Workspace, History, Saved, Categories, Settings (auth-guarded)
src/components/                UI primitives (shadcn) + landing/dashboard/workspace/auth/settings components
src/lib/ai/                    Provider abstraction + rule-based Arabic intelligence engine
src/lib/auth/                  Supabase session helpers, sync-user, server actions
src/lib/i18n/                  Arabic/English dictionaries, cookie-based locale, RTL wiring
src/lib/prompts/               Prompt queries, server actions, category/state mappers
src/lib/settings/              Profile/language/AI-provider server actions
src/lib/supabase/              Browser/server/middleware Supabase clients
src/middleware.ts              Session refresh + route guarding
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (typecheck + lint included) |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed categories + AI providers |
| `npm run db:studio` | Open Prisma Studio |

## Notes

- The interface defaults to Arabic (RTL). Language preference is stored per-user in `UserSettings` and mirrored to a `NEXT_LOCALE` cookie; switch it from the navbar or Settings.
- Pricing on the landing page is a placeholder (`Coming soon`) — no billing is wired up yet.
- Auth-guarded routes (`/dashboard`, `/workspace`, `/history`, `/saved`, `/categories`, `/settings`) require a real Supabase project — they redirect to `/login` otherwise.
