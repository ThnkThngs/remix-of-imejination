import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useHomepageContent } from "@/lib/admin/store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/content")({
  component: ContentAdmin,
});

function ContentAdmin() {
  const { content, save } = useHomepageContent();
  const [draft, setDraft] = useState(content);

  useEffect(() => setDraft(content), [content]);

  function onSave() {
    save(draft);
    toast.success("Homepage content saved");
  }

  return (
    <AdminShell
      title="Homepage content"
      description="Editable copy that powers the public site"
      actions={
        <Button onClick={onSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="mr-2 h-4 w-4" /> Save changes
        </Button>
      }
    >
      <div className="max-w-2xl space-y-6 rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <Field label="Hero eyebrow" value={draft.hero_eyebrow} onChange={(v) => setDraft({ ...draft, hero_eyebrow: v })} />
        <Field label="Hero heading" value={draft.hero_heading} onChange={(v) => setDraft({ ...draft, hero_heading: v })} />
        <div className="space-y-2">
          <Label className="text-white/70">Hero subheading</Label>
          <Textarea
            value={draft.hero_subheading}
            onChange={(e) => setDraft({ ...draft, hero_subheading: e.target.value })}
            rows={3}
            className="border-white/10 bg-black/40 text-white"
          />
        </div>
        <Field label="CTA label" value={draft.cta_label} onChange={(v) => setDraft({ ...draft, cta_label: v })} />
        <Field label="Social proof" value={draft.social_proof} onChange={(v) => setDraft({ ...draft, social_proof: v })} />
      </div>
    </AdminShell>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-white/70">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-white/10 bg-black/40 text-white"
      />
    </div>
  );
}
