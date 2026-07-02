import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useServices } from "@/lib/admin/store";
import type { Service } from "@/lib/admin/mock-data";

export const Route = createFileRoute("/admin/services")({
  component: ServicesAdmin,
});

const empty: Service = { id: "", title: "", blurb: "", icon: "Camera", order: 99 };

function ServicesAdmin() {
  const { services, upsert, remove } = useServices();
  const [editing, setEditing] = useState<Service | null>(null);

  return (
    <AdminShell
      title="Services"
      description="Cards shown on the homepage services section"
      actions={
        <Button
          onClick={() => setEditing({ ...empty, id: `s-${Date.now()}` })}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> New service
        </Button>
      }
    >
      <ul className="divide-y divide-white/5 rounded-lg border border-white/10 bg-white/[0.03]">
        {services.map((s) => (
          <li key={s.id} className="flex items-center gap-4 p-4">
            <GripVertical className="h-4 w-4 text-white/20" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Order {s.order}</p>
              <p className="mt-1 text-white">{s.title}</p>
              <p className="mt-1 truncate text-sm text-white/50">{s.blurb}</p>
            </div>
            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditing(s)}
                className="text-white/70 hover:bg-white/5"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => remove(s.id)}
                className="text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="border-white/10 bg-black text-white">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-light">
              {editing && services.some((s) => s.id === editing.id) ? "Edit service" : "New service"}
            </DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/70">Title</Label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="border-white/10 bg-white/[0.03] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Blurb</Label>
                <Textarea
                  value={editing.blurb}
                  onChange={(e) => setEditing({ ...editing, blurb: e.target.value })}
                  rows={3}
                  className="border-white/10 bg-white/[0.03] text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70">Icon (lucide name)</Label>
                  <Input
                    value={editing.icon}
                    onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                    className="border-white/10 bg-white/[0.03] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Order</Label>
                  <Input
                    type="number"
                    value={editing.order}
                    onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                    className="border-white/10 bg-white/[0.03] text-white"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)} className="text-white/70 hover:bg-white/5">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editing) upsert(editing);
                setEditing(null);
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}
