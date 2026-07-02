import { cn } from "@/lib/utils";

const TONES: Record<string, string> = {
  New: "bg-primary/15 text-primary border-primary/30",
  "In Review": "bg-amber-400/10 text-amber-300 border-amber-400/30",
  Reviewed: "bg-amber-400/10 text-amber-300 border-amber-400/30",
  Contacted: "bg-sky-400/10 text-sky-300 border-sky-400/30",
  Quoted: "bg-sky-400/10 text-sky-300 border-sky-400/30",
  Won: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
  Lost: "bg-red-400/10 text-red-300 border-red-400/30",
  Archived: "bg-white/5 text-white/50 border-white/10",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
        TONES[status] ?? "bg-white/5 text-white/60 border-white/10",
      )}
    >
      {status}
    </span>
  );
}
