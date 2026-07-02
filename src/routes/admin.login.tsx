import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/lib/admin/store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin sign in · Imejination" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    // Mock auth. Replace with supabase.auth.signInWithPassword + has_role check.
    setTimeout(() => {
      signIn(email.trim());
      navigate({ to: "/admin/dashboard" });
    }, 350);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Imejination</p>
          <h1 className="mt-2 font-display text-3xl font-light">Admin sign in</h1>
          <p className="mt-2 text-sm text-white/50">
            Restricted area. Sign in to manage leads, briefs and portfolio.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-5 rounded-lg border border-white/10 bg-white/[0.03] p-6"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/70">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@imejination.my"
              className="border-white/10 bg-black/40 text-white placeholder:text-white/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/70">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border-white/10 bg-black/40 text-white placeholder:text-white/30"
            />
          </div>
          {error && <p className="text-xs text-red-300">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
          <p className="text-center text-[11px] text-white/40">
            Demo mode — any email + password will unlock the dashboard.
          </p>
        </form>
      </div>
    </div>
  );
}
