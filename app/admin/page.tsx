import type { Metadata } from "next";
import AdminDashboard from "./admin-dashboard";

export const metadata: Metadata = {
  title: "Imejination Admin",
  description:
    "Manage leads, portfolio items, tag suggestions, and image uploads for Imejination Sdn Bhd.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}

