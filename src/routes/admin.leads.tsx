import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
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
import { useLeads } from "@/lib/admin/store";
import type { LeadStatus } from "@/lib/admin/mock-data";

const STATUSES: LeadStatus[] = ["New", "In Review", "Contacted", "Won", "Lost", "Archived"];

export const Route = createFileRoute("/admin/leads")({
  component: LeadsPage,
});

function LeadsPage() {
  const { leads, updateStatus } = useLeads();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchQ =
        !q ||
        [l.name, l.email, l.service, l.message].join(" ").toLowerCase().includes(q.toLowerCase());
      const matchS = status === "all" || l.status === status;
      return matchQ && matchS;
    });
  }, [leads, q, status]);

  function exportCsv() {
    const header = ["Name", "Email", "Phone", "Service", "Message", "Status", "Created"];
    const rows = filtered.map((l) => [l.name, l.email, l.phone, l.service, l.message.replace(/\n/g, " "), l.status, l.created_at]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminShell
      title="Leads"
      description="Contact form submissions"
      actions={
        <Button
          onClick={exportCsv}
          variant="outline"
          className="border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white"
        >
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      }
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, email, service…"
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
              <TableHead className="text-white/60">Name</TableHead>
              <TableHead className="text-white/60">Contact</TableHead>
              <TableHead className="text-white/60">Service</TableHead>
              <TableHead className="text-white/60">Message</TableHead>
              <TableHead className="text-white/60">Status</TableHead>
              <TableHead className="text-white/60">Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((l) => (
              <TableRow key={l.id} className="border-white/5 align-top hover:bg-white/[0.02]">
                <TableCell className="text-white">{l.name}</TableCell>
                <TableCell className="text-sm text-white/70">
                  <div>{l.email}</div>
                  <div className="text-white/40">{l.phone}</div>
                </TableCell>
                <TableCell className="text-sm text-white/70">{l.service}</TableCell>
                <TableCell className="max-w-md text-sm text-white/60">
                  <p className="line-clamp-2">{l.message}</p>
                </TableCell>
                <TableCell>
                  <Select
                    value={l.status}
                    onValueChange={(v) => updateStatus(l.id, v as LeadStatus)}
                  >
                    <SelectTrigger className="h-8 border-white/10 bg-transparent text-xs">
                      <SelectValue>
                        <StatusBadge status={l.status} />
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
                  {new Date(l.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-sm text-white/40">
                  No leads match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminShell>
  );
}
