import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePortfolio } from "@/lib/admin/store";
import type { PortfolioItem } from "@/lib/admin/mock-data";

export const Route = createFileRoute("/admin/portfolio")({
  component: PortfolioAdmin,
});

const empty: PortfolioItem = {
  id: "",
  title: "",
  category: "",
  description: "",
  image_url: "",
  project_date: new Date().toISOString().slice(0, 10),
  published: false,
  featured: false,
};

function PortfolioAdmin() {
  const { items, upsert, remove, togglePublished, toggleFeatured } = usePortfolio();
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openNew() {
    setEditing({ ...empty, id: `p-${Date.now()}` });
  }

  function save() {
    if (!editing) return;
    upsert(editing);
    setEditing(null);
  }

  return (
    <AdminShell
      title="Portfolio"
      description="Manage published case studies"
      actions={
        <Button onClick={openNew} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New project
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
              {item.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-white/30">
                  No image
                </div>
              )}
              <div className="absolute right-2 top-2 flex gap-1.5">
                {item.featured && (
                  <span className="rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                    Featured
                  </span>
                )}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                    item.published
                      ? "bg-emerald-400/90 text-black"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {item.published ? "Live" : "Draft"}
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary">{item.category}</p>
              <h3 className="mt-2 font-display text-lg leading-tight text-white">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/50">{item.description}</p>
              <p className="mt-3 text-xs text-white/40">
                {new Date(item.project_date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                <IconBtn onClick={() => setEditing(item)} label="Edit">
                  <Pencil className="h-3.5 w-3.5" />
                </IconBtn>
                <IconBtn onClick={() => togglePublished(item.id)} label={item.published ? "Unpublish" : "Publish"}>
                  {item.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </IconBtn>
                <IconBtn onClick={() => toggleFeatured(item.id)} label={item.featured ? "Unfeature" : "Feature"}>
                  <Star className={`h-3.5 w-3.5 ${item.featured ? "fill-primary text-primary" : ""}`} />
                </IconBtn>
                <IconBtn onClick={() => setDeleteId(item.id)} label="Delete" tone="danger">
                  <Trash2 className="h-3.5 w-3.5" />
                </IconBtn>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="border-white/10 bg-black text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-light">
              {editing && items.some((i) => i.id === editing.id) ? "Edit project" : "New project"}
            </DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <FieldInput label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <FieldInput label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} />
              <div className="space-y-2">
                <Label className="text-white/70">Description</Label>
                <Textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="border-white/10 bg-white/[0.03] text-white"
                  rows={3}
                />
              </div>
              <FieldInput label="Image URL" value={editing.image_url} onChange={(v) => setEditing({ ...editing, image_url: v })} placeholder="https://…" />
              <div className="space-y-2">
                <Label className="text-white/70">Project date</Label>
                <Input
                  type="date"
                  value={editing.project_date}
                  onChange={(e) => setEditing({ ...editing, project_date: e.target.value })}
                  className="border-white/10 bg-white/[0.03] text-white"
                />
              </div>
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <Switch
                    checked={editing.published}
                    onCheckedChange={(v) => setEditing({ ...editing, published: v })}
                  />
                  Published
                </label>
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <Switch
                    checked={editing.featured}
                    onCheckedChange={(v) => setEditing({ ...editing, featured: v })}
                  />
                  Featured
                </label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)} className="text-white/70 hover:bg-white/5">
              Cancel
            </Button>
            <Button onClick={save} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="border-white/10 bg-black text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              This can't be undone (in mock mode it removes the local copy).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 bg-transparent text-white hover:bg-white/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) remove(deleteId);
                setDeleteId(null);
              }}
              className="bg-red-500 text-white hover:bg-red-500/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-white/70">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-white/10 bg-white/[0.03] text-white placeholder:text-white/30"
      />
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  tone,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  tone?: "danger";
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition-colors ${
        tone === "danger"
          ? "border-red-500/30 text-red-300 hover:bg-red-500/10"
          : "border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
