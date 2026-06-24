## Add AI Brief Builder

Add an AI-powered project brief builder to the Imejination site. Users answer a 3-step questionnaire (project type → details → contact), an AI generates a draft production approach, and the lead is saved to the studio inbox.

The pasted snippet uses `react-router-dom` and Supabase Edge Functions — this project is TanStack Start with Lovable Cloud. I'll port the same UX to the project's conventions.

### What gets built

**1. Enable Lovable Cloud** (database + AI gateway + server functions).

**2. Database** — single migration:
- `leads` table: `id, created_at, name, company, email, phone, preferred_contact, project_type, project_name, location, deadline, deliverables, budget_range, details (jsonb), ai_recommendation, status`
- RLS: insert allowed for `anon` + `authenticated` (public form); select restricted to `admin` role only.
- `app_role` enum + `user_roles` + `has_role()` per project conventions (admins read leads later).
- Required `GRANT`s for `anon`/`authenticated`/`service_role`.

**3. Server function** `src/lib/brief.functions.ts`:
- `generateBrief({ form })` — validates with Zod, calls Lovable AI Gateway (`google/gemini-3-flash-preview`) via the standard provider helper, returns markdown recommendation. System prompt tuned for an aerial/architectural photography studio (shot list, deliverables, timeline, crew, gear suggestions).
- `saveLead({ form, recommendation })` — inserts via server publishable client (anon, RLS-protected). Returns `{ id }`.
- Helper at `src/lib/ai-gateway.server.ts` (per Lovable AI Gateway pattern).

**4. New route** `src/routes/brief.tsx`:
- 3-step wizard matching the pasted design: project type chips → details grid → contact fields → AI output.
- Uses existing dark theme + mint primary; reuses `Button`, `Input`, `Textarea`, `sonner` toast.
- TanStack Router `<Link>` + `useSearch` (replaces `useSearchParams`); `?type=` preset still works.
- `head()` with unique title/description/OG tags.
- Renders markdown output with a small in-file renderer (headings, bullets, paragraphs).
- Final step: "Send brief" mailto, call Moses, email link, "back home" link, lead ref id.

**5. Wire entry points**:
- Hero "Explore Portfolio" stays; add a secondary mint CTA "Plan your shoot with AI →" linking to `/brief`.
- Services section: each category chip links to `/brief?type=<label>`.
- Nav: add "Brief" link.

### Technical notes

- AI call lives in a `createServerFn` (not a server route) — it's app-internal client→server RPC.
- `LOVABLE_API_KEY` read inside `.handler()`; provider helper kept in `*.server.ts` and imported only from handlers.
- Lead insert uses the server publishable client with the anon-insert RLS policy, so no auth required to submit.
- No `react-router-dom`, no Supabase Edge Function, no client-side AI calls.
- Errors (429 rate limit, 402 credits) surfaced via toast with clear messages.

### Files

- migration: `leads` + roles infra
- `src/lib/ai-gateway.server.ts`
- `src/lib/brief.functions.ts`
- `src/routes/brief.tsx`
- edits: `src/components/site/Nav.tsx`, `Hero.tsx`, `Services.tsx`
