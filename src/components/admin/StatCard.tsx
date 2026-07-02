import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">{label}</p>
          <p className="mt-3 font-display text-3xl font-light text-white">{value}</p>
        </div>
        <div className="rounded-md bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      {delta && <p className="mt-4 text-xs text-white/50">{delta}</p>}
    </div>
  );
}
