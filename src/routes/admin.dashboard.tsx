import { createFileRoute, Link } from "@tanstack/react-router";
import { Inbox, Sparkles, Images, Clock, ArrowUpRight } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useLeads, useBriefs, usePortfolio } from "@/lib/admin/store";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { leads } = useLeads();
  const { briefs } = useBriefs();
  const { items } = usePortfolio();

  const pending = leads.filter((l) => l.status === "New" || l.status === "In Review").length;
  const newBriefs = briefs.filter((b) => b.status === "New").length;

  const recentLeads = [...leads]
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 5);
  const recentBriefs = [...briefs]
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 5);

  return (
    <AdminShell title="Dashboard" description="Studio at a glance">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total leads" value={leads.length} delta="All time" icon={Inbox} />
        <StatCard label="New AI briefs" value={newBriefs} delta="Awaiting review" icon={Sparkles} />
        <StatCard label="Portfolio projects" value={items.length} delta={`${items.filter((i) => i.published).length} published`} icon={Images} />
        <StatCard label="Pending requests" value={pending} delta="Leads to action" icon={Clock} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Panel title="Recent leads" href="/admin/leads">
          <ul className="divide-y divide-white/5">
            {recentLeads.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-white">{l.name}</p>
                  <p className="truncate text-xs text-white/40">{l.service}</p>
                </div>
                <StatusBadge status={l.status} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recent AI briefs" href="/admin/briefs">
          <ul className="divide-y divide-white/5">
            {recentBriefs.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-white">{b.client_name}</p>
                  <p className="truncate text-xs text-white/40">
                    {b.project_type} · {b.budget_range}
                  </p>
                </div>
                <StatusBadge status={b.status} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AdminShell>
  );
}

function Panel({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg tracking-tight text-white">{title}</h2>
        <Link
          to={href}
          className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-primary hover:opacity-80"
        >
          View all <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      {children}
    </section>
  );
}
