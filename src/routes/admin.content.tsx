import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useHomepageContent } from "@/lib/admin/store";

export const Route = createFileRoute("/admin/content")({
  component: ContentAdmin,
});

function ContentAdmin() {
  const { content, save } = useHomepageContent();
  const [draft, setDraft] = useState(content);

  useEffect(() => setDraft(content), [content]);

  return (
    <AdminShell
      title="Homepage content"
      description="Editable copy that powers the public site"
      actions={
        <Button
          onClick={() => save(draft)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="mr-2 h-4 w-4" /> Save changes
        </Button>
      }
    >
      <div className="max-w-2xl space-y-6 rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <Field label="Hero title" value={draft.hero_title} onChange={(v) => setDraft({ ...draft, hero_title: v })} />
        <div className="space-y-2">
          <Label className="text-white/70">Hero subtitle</Label>
          <Textarea
            value={draft.hero_subtitle}
            onChange={(e) => setDraft({ ...draft, hero_subtitle: e.target.value })}
            rows={3}
            className="border-white/10 bg-black/40 text-white"
          />
        </div>
        <Field label="Hero video URL" value={draft.hero_video} onChange={(v) => setDraft({ ...draft, hero_video: v })} />
        <Field label="Hero CTA label" value={draft.hero_cta} onChange={(v) => setDraft({ ...draft, hero_cta: v })} />
        <div className="space-y-2">
          <Label className="text-white/70">About text</Label>
          <Textarea
            value={draft.about_text}
            onChange={(e) => setDraft({ ...draft, about_text: e.target.value })}
            rows={4}
            className="border-white/10 bg-black/40 text-white"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <Label className="text-white/70">Statistics</Label>
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                setDraft({
                  ...draft,
                  statistics: [...draft.statistics, { label: "", value: "" }],
                })
              }
              className="text-primary hover:bg-primary/10"
            >
              <Plus className="mr-1 h-3.5 w-3.5" /> Add
            </Button>
          </div>
          <div className="space-y-2">
            {draft.statistics.map((stat, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
                <Input
                  value={stat.label}
                  onChange={(e) => {
                    const next = [...draft.statistics];
                    next[i] = { ...stat, label: e.target.value };
                    setDraft({ ...draft, statistics: next });
                  }}
                  placeholder="Label"
                  className="border-white/10 bg-black/40 text-white"
                />
                <Input
                  value={stat.value}
                  onChange={(e) => {
                    const next = [...draft.statistics];
                    next[i] = { ...stat, value: e.target.value };
                    setDraft({ ...draft, statistics: next });
                  }}
                  placeholder="Value"
                  className="border-white/10 bg-black/40 text-white"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      statistics: draft.statistics.filter((_, j) => j !== i),
                    })
                  }
                  className="text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
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
