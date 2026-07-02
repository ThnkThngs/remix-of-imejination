// Client-side admin data store. Backed by mock data + localStorage for now.
// Swap each hook body to `useQuery`/`useMutation` against server functions when
// Supabase tables are ready — page components stay unchanged.
import { useCallback, useEffect, useState } from "react";
import {
  mockAdminUser,
  mockBriefs,
  mockHomepage,
  mockLeads,
  mockPortfolio,
  mockServices,
  type Brief,
  type HomepageContent,
  type Lead,
  type PortfolioItem,
  type Service,
} from "./mock-data";

const KEYS = {
  session: "imej_admin_session",
  leads: "imej_admin_leads",
  briefs: "imej_admin_briefs",
  portfolio: "imej_admin_portfolio",
  services: "imej_admin_services",
  homepage: "imej_admin_homepage",
} as const;

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function useLocalCollection<T>(key: string, seed: T[]) {
  const [items, setItems] = useState<T[]>(() => readLS<T[]>(key, seed));
  useEffect(() => writeLS(key, items), [key, items]);
  return [items, setItems] as const;
}

// ————— Auth (mock) —————
export interface AdminSession {
  email: string;
  name: string;
  signedInAt: string;
}

export function useAdminAuth() {
  const [session, setSession] = useState<AdminSession | null>(() =>
    readLS<AdminSession | null>(KEYS.session, null),
  );

  const signIn = useCallback((email: string) => {
    const next: AdminSession = {
      email,
      name: mockAdminUser.name,
      signedInAt: new Date().toISOString(),
    };
    writeLS(KEYS.session, next);
    setSession(next);
    return next;
  }, []);

  const signOut = useCallback(() => {
    if (typeof window !== "undefined") window.localStorage.removeItem(KEYS.session);
    setSession(null);
  }, []);

  return { session, signIn, signOut, isAuthenticated: !!session };
}

export function isAdminSessionActive(): boolean {
  if (typeof window === "undefined") return true; // avoid SSR redirect flicker
  return !!window.localStorage.getItem(KEYS.session);
}

// ————— Leads —————
export function useLeads() {
  const [leads, setLeads] = useLocalCollection<Lead>(KEYS.leads, mockLeads);
  return {
    leads,
    updateStatus: (id: string, status: Lead["status"]) =>
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l))),
    remove: (id: string) => setLeads((prev) => prev.filter((l) => l.id !== id)),
  };
}

// ————— Briefs —————
export function useBriefs() {
  const [briefs, setBriefs] = useLocalCollection<Brief>(KEYS.briefs, mockBriefs);
  return {
    briefs,
    updateStatus: (id: string, status: Brief["status"]) =>
      setBriefs((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b))),
  };
}

// ————— Portfolio —————
export function usePortfolio() {
  const [items, setItems] = useLocalCollection<PortfolioItem>(KEYS.portfolio, mockPortfolio);
  return {
    items,
    upsert: (item: PortfolioItem) =>
      setItems((prev) => {
        const idx = prev.findIndex((p) => p.id === item.id);
        if (idx === -1) return [item, ...prev];
        const next = [...prev];
        next[idx] = item;
        return next;
      }),
    remove: (id: string) => setItems((prev) => prev.filter((p) => p.id !== id)),
    togglePublished: (id: string) =>
      setItems((prev) => prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))),
    toggleFeatured: (id: string) =>
      setItems((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))),
  };
}

// ————— Services —————
export function useServices() {
  const [services, setServices] = useLocalCollection<Service>(KEYS.services, mockServices);
  return {
    services,
    upsert: (service: Service) =>
      setServices((prev) => {
        const idx = prev.findIndex((s) => s.id === service.id);
        if (idx === -1) return [...prev, service].sort((a, b) => a.order - b.order);
        const next = [...prev];
        next[idx] = service;
        return next.sort((a, b) => a.order - b.order);
      }),
    remove: (id: string) => setServices((prev) => prev.filter((s) => s.id !== id)),
  };
}

// ————— Homepage —————
export function useHomepageContent() {
  const [content, setContent] = useState<HomepageContent>(() =>
    readLS<HomepageContent>(KEYS.homepage, mockHomepage),
  );
  useEffect(() => writeLS(KEYS.homepage, content), [content]);
  return { content, save: setContent };
}
