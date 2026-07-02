import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Eye } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useBriefs } from "@/lib/admin/store";
import type { Brief, BriefStatus } from "@/lib/admin/mock-data";

const STATUSES: BriefStatus[] = ["New", "Reviewed", "Quoted", "Won", "Lost"];

export const Route = createFileRoute("/admin/briefs")({
  component: BriefsPage,
});

function BriefsPage() {
  const { briefs, updateStatus } = useBriefs();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [active, setActive] = useState<Brief | null>(null);

  const filtered = useMemo(
    () =>
      briefs.filter((b) => {
        const matchQ =
          !q ||
          [b.client_name, b.email, b.project_type, b.location]
            .join(" ")
            .toLowerCase()
            .includes(q.toLowerCase());
        const matchS = status === "all" || b.status === status;
        return matchQ && matchS;
      }),
    [briefs, q, status],
  );

  return (
    <AdminShell title="AI Briefs" description="Wizard submissions from the public site">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search briefs…"
            className="border-white/10 bg-white/[0.03] pl-9 text-white placeholder:text-white/30"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full border-white/10 bg-white/[0.03] text-white sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/60">Client</TableHead>
              <TableHead className="text-white/60">Project type</TableHead>
              <TableHead className="text-white/60">Budget</TableHead>
              <TableHead className="text-white/60">Timeline</TableHead>
              <TableHead className="text-white/60">Status</TableHead>
              <TableHead className="text-white/60">Submitted</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b.id} className="border-white/5 hover:bg-white/[0.02]">
                <TableCell>
                  <div className="text-white">{b.client_name}</div>
                  <div className="text-xs text-white/40">{b.email}</div>
                </TableCell>
                <TableCell className="text-sm text-white/70">{b.project_type}</TableCell>
                <TableCell className="text-sm text-white/70">{b.budget_range}</TableCell>
                <TableCell className="text-sm text-white/70">{b.timeline}</TableCell>
                <TableCell>
                  <Select
                    value={b.status}
                    onValueChange={(v) => updateStatus(b.id, v as BriefStatus)}
                  >
                    <SelectTrigger className="h-8 border-white/10 bg-transparent text-xs">
                      <SelectValue>
                        <StatusBadge status={b.status} />
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs text-white/50">
                  {new Date(b.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setActive(b)}
                    className="text-white/70 hover:bg-white/5 hover:text-white"
                  >
                    <Eye className="mr-1 h-3.5 w-3.5" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-sm text-white/40">
                  No briefs yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full border-white/10 bg-black text-white sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display text-2xl font-light text-white">
                  {active.client_name}
                </SheetTitle>
                <SheetDescription className="text-white/50">{active.email}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6 text-sm">
                <Field label="Project type" value={active.project_type} />
                <Field label="Budget" value={active.budget_range} />
                <Field label="Timeline" value={active.timeline} />
                <Field label="Location" value={active.location} />
                <Field label="Deliverables" value={active.deliverables} />
                <Field label="Details" value={active.details} />
                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-primary">
                    AI recommendation
                  </p>
                  <p className="rounded-md border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-white/80">
                    {active.ai_recommendation}
                  </p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AdminShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">{label}</p>
      <p className="mt-1 text-white/80">{value}</p>
    </div>
  );
}
