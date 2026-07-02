import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAdminSessionActive } from "@/lib/admin/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Imejination" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  beforeLoad: ({ location }) => {
    if (location.pathname === "/admin/login") return;
    if (typeof window === "undefined") return;
    if (!isAdminSessionActive()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: () => <Outlet />,
});
