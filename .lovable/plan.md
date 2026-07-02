# Admin Dashboard Plan

Build a fully-styled `/admin` area behind a simple login, matching the IMEJINATION dark/teal aesthetic. Ship with mock data now; wire real Supabase reads/writes in a follow-up.

## Scope
- Public site untouched (no nav link to /admin).
- All admin code isolated under `src/routes/admin*` and `src/components/admin/`.
- Responsive for desktop + tablet (sidebar collapses to icon rail).

## Routes (TanStack file-based)

```
src/routes/
  admin.tsx                 -> layout: guards session, renders <Outlet/>
  admin.index.tsx           -> redirects to /admin/dashboard
  admin.login.tsx           -> public login screen
  admin.dashboard.tsx       -> stat cards + recent activity
  admin.leads.tsx           -> leads table
  admin.briefs.tsx          -> AI brief submissions table
  admin.portfolio.tsx       -> portfolio CRUD grid
  admin.services.tsx        -> services management
  admin.content.tsx         -> homepage content (hero copy, etc.)
  admin.settings.tsx        -> profile + site settings
```

Guard in `admin.tsx` `beforeLoad`: check `localStorage.adminSession` (mock now); redirect to `/admin/login` if missing. Swap to Supabase `getUser()` + `has_role('admin')` later without changing route shape.

## Components (`src/components/admin/`)
- `AdminShell.tsx` — sidebar + top bar wrapper using shadcn `Sidebar`.
- `AdminSidebar.tsx` — nav: Dashboard, Leads, AI Briefs, Portfolio, Services, Content, Settings, Sign out. Active state via `useRouterState`.
- `StatCard.tsx` — icon, label, value, delta.
- `DataTable.tsx` — reusable table w/ search, column filter, status pill, row actions (shadcn Table + Input + Select).
- `StatusBadge.tsx` — New / In Review / Won / Lost / Archived (teal/amber/red variants).
- `PortfolioEditorDialog.tsx` — add/edit form (title, category, description, image URL upload placeholder, project date, published, featured).
- `ServiceEditorDialog.tsx` — title, blurb, icon, order.
- `ConfirmDialog.tsx` — delete confirm.

## Mock data
`src/lib/admin/mock-data.ts` exports leads[], briefs[], portfolioItems[], services[], homepageContent, adminUser. Types shared with future Supabase rows so swap is a one-liner in each page's data hook.

## Data access seam
`src/lib/admin/store.ts` exports hooks:
`useLeads()`, `useBriefs()`, `usePortfolio()`, `useServices()`, `useHomepageContent()`, `useAdminAuth()`.

Now: back with mock arrays + `useState` + localStorage persistence for edits.
Later: replace bodies with `useQuery`/`useMutation` calling `createServerFn` handlers (protected by `requireSupabaseAuth` + `has_role('admin')`). Page components don't change.

## Page details

**Login (`/admin/login`)** — centered card, black bg, teal accent, email + password, "Sign in" button. Mock: any non-empty email/pw sets `localStorage.adminSession` and navigates to dashboard.

**Dashboard** — 4 StatCards (Total Leads, New AI Briefs, Portfolio Projects, Pending Requests) + two panels: Recent Leads (5) and Recent Briefs (5).

**Leads** — DataTable columns: Name, Email, Phone, Service, Message (truncated + expandable), Status (editable Select), Submitted (date). Search box (name/email), status filter, CSV export button (stub).

**AI Briefs** — Table: Client, Project Type, Budget, Timeline, Status, Submitted, "View" opens Sheet with full brief + AI recommendation.

**Portfolio** — Grid of cards with thumbnail, title, category, badges (Published, Featured). Buttons: Edit, Publish/Unpublish, Feature/Unfeature, Delete. "+ New project" opens editor dialog.

**Services** — List with drag handle (visual only for now), edit/delete, "+ New service".

**Homepage Content** — Form: hero eyebrow, hero heading, hero subheading, CTA label, social proof line. Save writes to store.

**Settings** — Admin profile (name/email), password change (stub), site metadata (title, description), sign-out button.

## Styling
Reuse existing tokens (`bg-black`, `text-primary`, `font-display`, `tracking-[0.3em]` eyebrows, thin dividers). Sidebar `bg-black border-r border-white/10`, active item `bg-primary/10 text-primary`. Cards `bg-white/[0.03] border border-white/10 rounded-lg`.

## Supabase-ready notes
- Leads table already exists with admin RLS — `useLeads` becomes a `createServerFn` calling `context.supabase.from('leads').select()`.
- Add `ai_briefs` table later (schema mirrors mock).
- Add `portfolio_items`, `services`, `homepage_content` tables in a follow-up migration with admin-only write policies + public read.
- Login swap: `supabase.auth.signInWithPassword` + check `has_role(uid, 'admin')`; store nothing in localStorage.

## Out of scope (this pass)
- Real image uploads (use URL field placeholder).
- Real Supabase wiring / new migrations.
- Public nav entry for /admin.
- Email notifications, audit log, multi-admin invites.
