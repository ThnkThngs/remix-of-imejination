import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Sparkles, Mail, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { generateBrief } from "@/lib/brief.functions";

const searchSchema = z.object({ type: z.string().optional() });

export const Route = createFileRoute("/brief")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "AI Brief Builder — Imejination" },
      {
        name: "description",
        content:
          "Answer a few questions and Imejination's AI will draft a production approach, shot list, deliverables and timeline for your shoot.",
      },
      { property: "og:title", content: "AI Brief Builder — Imejination" },
      {
        property: "og:description",
        content: "Plan your aerial or architectural shoot in minutes.",
      },
    ],
  }),
  component: BriefPage,
});

const TYPES = [
  "Property/Architecture",
  "Food & Beverage",
  "Event/Portrait",
  "Video Production",
  "Other",
];

interface Form {
  projectType: string;
  projectName: string;
  location: string;
  deadline: string;
  scope: string;
  channels: string;
  mood: string;
  deliverables: string;
  budgetRange: string;
  notes: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  preferredContact: string;
}

const empty: Form = {
  projectType: "",
  projectName: "",
  location: "",
  deadline: "",
  scope: "",
  channels: "",
  mood: "",
  deliverables: "",
  budgetRange: "",
  notes: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  preferredContact: "Email",
};

function matchType(s: string) {
  if (!s) return "";
  const lower = s.toLowerCase();
  if (lower.includes("property") || lower.includes("architecture")) return "Property/Architecture";
  if (lower.includes("aerial")) return "Property/Architecture";
  if (lower.includes("food")) return "Food & Beverage";
  if (lower.includes("event") || lower.includes("portrait")) return "Event/Portrait";
  if (lower.includes("video")) return "Video Production";
  return "Other";
}

function BriefPage() {
  const { type } = Route.useSearch();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>({ ...empty, projectType: matchType(type ?? "") });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);

  const runGenerate = useServerFn(generateBrief);

  const set =
    (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function generate() {
    if (!form.name || !form.email) {
      toast.error("Please add your name and email.");
      setStep(3);
      return;
    }
    setLoading(true);
    try {
      const res = await runGenerate({ data: form });
      setOutput(res.recommendation);
      setLeadId(res.leadId);
      setStep(4);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  function sendEmail() {
    const body = encodeURIComponent(
      `New enquiry via website\n\nName: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nPreferred contact: ${form.preferredContact}\n\nProject: ${form.projectName} (${form.projectType})\nLocation: ${form.location}\nDeadline: ${form.deadline}\nBudget: ${form.budgetRange}\n\n--- AI Brief ---\n${output ?? ""}`,
    );
    window.location.href = `mailto:askimeji@gmail.com?subject=${encodeURIComponent(
      `Brief: ${form.projectName || form.projectType}`,
    )}&body=${body}`;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/5 px-6 py-6 md:px-12">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between">
          <Link to="/" className="text-xs uppercase tracking-[0.25em] text-white/60 hover:text-primary">
            ← Imejination
          </Link>
          <a
            href="mailto:askimeji@gmail.com"
            className="text-xs uppercase tracking-[0.25em] text-white/60 hover:text-primary"
          >
            askimeji@gmail.com
          </a>
        </div>
      </header>

      <section className="px-6 pt-16 md:px-12 md:pt-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
              AI Brief Builder
            </span>
          </div>
          <h1 className="font-display text-5xl font-light leading-tight md:text-7xl">
            Plan your shoot<br />in minutes.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">
            Answer a few questions and we'll generate a draft approach, shot list, deliverables and
            timeline you can send to our team.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1100px] rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 md:p-12">
          {step < 4 && <Stepper step={step} />}

          {step === 1 && (
            <Step title="What kind of project?">
              <div className="grid gap-3 sm:grid-cols-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, projectType: t }))}
                    className={cn(
                      "rounded-lg border px-5 py-4 text-left transition-colors",
                      form.projectType === t
                        ? "border-primary bg-primary/10"
                        : "border-white/10 hover:border-white/30",
                    )}
                  >
                    <p className="text-sm font-medium text-white">{t}</p>
                  </button>
                ))}
              </div>
              <Nav onNext={() => setStep(2)} canNext={!!form.projectType} />
            </Step>
          )}

          {step === 2 && (
            <Step title="Tell us about the shoot">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Project name">
                  <Input value={form.projectName} onChange={set("projectName")} maxLength={160} />
                </Field>
                <Field label="Location">
                  <Input value={form.location} onChange={set("location")} maxLength={200} />
                </Field>
                <Field label="Deadline">
                  <Input
                    value={form.deadline}
                    onChange={set("deadline")}
                    placeholder="e.g. mid-March"
                    maxLength={120}
                  />
                </Field>
                <Field label="Budget range">
                  <Input
                    value={form.budgetRange}
                    onChange={set("budgetRange")}
                    placeholder="e.g. RM 10-20k"
                    maxLength={120}
                  />
                </Field>
                <Field label="Scope" className="sm:col-span-2">
                  <Textarea
                    rows={2}
                    value={form.scope}
                    onChange={set("scope")}
                    placeholder="What needs to be captured?"
                    maxLength={500}
                  />
                </Field>
                <Field label="Channels / usage" className="sm:col-span-2">
                  <Textarea
                    rows={2}
                    value={form.channels}
                    onChange={set("channels")}
                    placeholder="e.g. brochure, IG reels, billboards"
                    maxLength={500}
                  />
                </Field>
                <Field label="Mood / references" className="sm:col-span-2">
                  <Textarea
                    rows={2}
                    value={form.mood}
                    onChange={set("mood")}
                    placeholder="Cinematic, warm, twilight…"
                    maxLength={500}
                  />
                </Field>
                <Field label="Required deliverables" className="sm:col-span-2">
                  <Textarea
                    rows={2}
                    value={form.deliverables}
                    onChange={set("deliverables")}
                    placeholder="e.g. 25 stills, 1 hero film, 5 reels"
                    maxLength={500}
                  />
                </Field>
                <Field label="Anything else?" className="sm:col-span-2">
                  <Textarea
                    rows={2}
                    value={form.notes}
                    onChange={set("notes")}
                    maxLength={500}
                  />
                </Field>
              </div>
              <Nav onBack={() => setStep(1)} onNext={() => setStep(3)} canNext />
            </Step>
          )}

          {step === 3 && (
            <Step title="How can we reach you?">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <Input value={form.name} onChange={set("name")} required maxLength={120} />
                </Field>
                <Field label="Company">
                  <Input value={form.company} onChange={set("company")} maxLength={160} />
                </Field>
                <Field label="Email">
                  <Input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    required
                    maxLength={255}
                  />
                </Field>
                <Field label="Phone / WhatsApp">
                  <Input value={form.phone} onChange={set("phone")} maxLength={40} />
                </Field>
                <Field label="Preferred contact" className="sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {["Email", "WhatsApp", "Phone"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, preferredContact: p }))}
                        className={cn(
                          "rounded-full border px-4 py-1.5 text-sm",
                          form.preferredContact === p
                            ? "border-primary bg-primary/10 text-white"
                            : "border-white/15 text-white/60",
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
              <Nav
                onBack={() => setStep(2)}
                onNext={generate}
                nextLabel={loading ? "Generating…" : "Generate brief"}
                canNext={!loading && !!form.name && !!form.email}
                rightIcon={
                  loading ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="ml-2 h-4 w-4" />
                  )
                }
              />
            </Step>
          )}

          {step === 4 && output && (
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
                Your draft brief
              </span>
              <h2 className="mt-2 mb-6 font-display text-3xl font-light sm:text-4xl">
                Production approach
              </h2>
              <BriefRender markdown={output} />

              <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
                <Button
                  onClick={sendEmail}
                  className="rounded-full bg-primary text-black hover:bg-primary/90"
                >
                  <Mail className="mr-2 h-4 w-4" /> Send brief to Imejination
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/5"
                >
                  <a href="tel:+60183940060">
                    <Phone className="mr-2 h-4 w-4" /> Call Moses
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/5"
                >
                  <a href="mailto:askimeji@gmail.com">
                    <Mail className="mr-2 h-4 w-4" /> Email askimeji@gmail.com
                  </a>
                </Button>
              </div>
              {leadId && (
                <p className="mt-6 text-xs text-white/40">
                  Saved to studio inbox · Ref {leadId.slice(0, 8)}
                </p>
              )}
              <div className="mt-8">
                <Link to="/" className="text-xs uppercase tracking-[0.25em] text-white/60 hover:text-primary">
                  ← Back home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-10 flex items-center gap-2">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border text-xs",
              step >= n
                ? "border-primary bg-primary text-black"
                : "border-white/20 text-white/40",
            )}
          >
            {n}
          </span>
          <span
            className={cn(
              "text-xs uppercase tracking-[0.2em]",
              step >= n ? "text-white" : "text-white/40",
            )}
          >
            {n === 1 ? "Project" : n === 2 ? "Details" : "You"}
          </span>
          {n < 3 && <span className="ml-2 h-px w-8 bg-white/10" />}
        </div>
      ))}
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-light sm:text-3xl">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function Nav({
  onBack,
  onNext,
  canNext,
  nextLabel,
  rightIcon,
}: {
  onBack?: () => void;
  onNext: () => void;
  canNext: boolean;
  nextLabel?: string;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div className="mt-10 flex items-center justify-between">
      {onBack ? (
        <Button
          variant="ghost"
          onClick={onBack}
          className="rounded-full text-white/70 hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      ) : (
        <span />
      )}
      <Button
        onClick={onNext}
        disabled={!canNext}
        className="rounded-full bg-primary text-black hover:bg-primary/90 disabled:opacity-40"
      >
        {nextLabel ?? "Continue"}
        {rightIcon ?? <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}

function BriefRender({ markdown }: { markdown: string }) {
  const blocks: React.ReactNode[] = [];
  const lines = markdown.split(/\r?\n/);
  let listBuf: string[] = [];
  let key = 0;
  const flushList = () => {
    if (listBuf.length) {
      blocks.push(
        <ul key={`l-${key++}`} className="my-4 space-y-1.5 pl-5 text-white/80">
          {listBuf.map((l, i) => (
            <li key={i} className="list-disc">
              {l}
            </li>
          ))}
        </ul>,
      );
      listBuf = [];
    }
  };
  lines.forEach((raw) => {
    const line = raw.trimEnd();
    if (/^#\s+/.test(line)) {
      flushList();
      blocks.push(
        <h3
          key={`h-${key++}`}
          className="mt-8 mb-3 font-display text-lg uppercase tracking-[0.2em] text-primary"
        >
          {line.replace(/^#\s+/, "")}
        </h3>,
      );
    } else if (/^-\s+/.test(line)) {
      listBuf.push(line.replace(/^-\s+/, ""));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      blocks.push(
        <p key={`p-${key++}`} className="my-2 leading-relaxed text-white/80">
          {line}
        </p>,
      );
    }
  });
  flushList();
  return <div>{blocks}</div>;
}