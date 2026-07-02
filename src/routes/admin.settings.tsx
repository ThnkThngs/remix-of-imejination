import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Save } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/lib/admin/store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { session, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [siteTitle, setSiteTitle] = useState("Imejination — Aerial & Architectural Photography");
  const [siteDesc, setSiteDesc] = useState(
    "Imejination is a Malaysian photography studio elevating properties with stunning aerial and ground perspectives.",
  );

  return (
    <AdminShell title="Settings" description="Profile and site metadata">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Profile" onSave={() => toast.success("Profile saved")}>
          <Field label="Name" value={name} onChange={setName} />
          <Field label="Email" value={email} onChange={setEmail} />
        </Card>

        <Card title="Password" onSave={() => toast.success("Password updated")}>
          <Field label="Current password" value="" onChange={() => {}} type="password" />
          <Field label="New password" value="" onChange={() => {}} type="password" />
        </Card>

        <Card title="Site metadata" onSave={() => toast.success("Site metadata saved")}>
          <Field label="Site title" value={siteTitle} onChange={setSiteTitle} />
          <Field label="Site description" value={siteDesc} onChange={setSiteDesc} />
        </Card>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-display text-lg tracking-tight text-white">Session</h2>
          <p className="mt-2 text-sm text-white/50">
            You're signed in as <span className="text-white">{session?.email ?? "—"}</span>.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              signOut();
              navigate({ to: "/admin/login" });
            }}
            className="mt-4 border-white/10 bg-transparent text-white hover:bg-white/5"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>
    </AdminShell>
  );
}

function Card({
  title,
  onSave,
  children,
}: {
  title: string;
  onSave: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg tracking-tight text-white">{title}</h2>
        <Button
          size="sm"
          onClick={onSave}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="mr-1.5 h-3.5 w-3.5" /> Save
        </Button>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-white/70">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-white/10 bg-black/40 text-white"
      />
    </div>
  );
}
