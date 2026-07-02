// Mock data for the admin dashboard. Shapes mirror what future Supabase rows
// will look like so swapping the data source is a one-liner in each hook.

export type LeadStatus = "New" | "In Review" | "Contacted" | "Won" | "Lost" | "Archived";
export type BriefStatus = "New" | "Reviewed" | "Quoted" | "Won" | "Lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: LeadStatus;
  created_at: string;
}

export interface Brief {
  id: string;
  client_name: string;
  email: string;
  project_type: string;
  budget_range: string;
  timeline: string;
  location: string;
  deliverables: string;
  details: string;
  ai_recommendation: string;
  status: BriefStatus;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  project_date: string;
  published: boolean;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  order: number;
}

export interface HomepageContent {
  hero_eyebrow: string;
  hero_heading: string;
  hero_subheading: string;
  cta_label: string;
  social_proof: string;
}

export const mockLeads: Lead[] = [
  {
    id: "l-001",
    name: "Aisha Rahman",
    email: "aisha@simedarbyproperty.com",
    phone: "+60 12 345 6789",
    service: "Aerial & Drone",
    message: "Need aerial coverage for Elmina Lakeside launch event on March 14th.",
    status: "New",
    created_at: "2026-06-28T09:14:00Z",
  },
  {
    id: "l-002",
    name: "Daniel Wong",
    email: "daniel@myra.com.my",
    phone: "+60 19 876 5432",
    service: "Architecture & Interior",
    message: "Show unit interiors, 6 units in Bangsar South. Timeline 3 weeks.",
    status: "In Review",
    created_at: "2026-06-26T16:02:00Z",
  },
  {
    id: "l-003",
    name: "Priya Menon",
    email: "priya@pintea.co",
    phone: "+60 11 223 4455",
    service: "Commercial & Still Life",
    message: "Menu refresh — 24 hero product shots for new tea line.",
    status: "Contacted",
    created_at: "2026-06-22T11:40:00Z",
  },
  {
    id: "l-004",
    name: "Jason Lim",
    email: "jason@ecoworld.my",
    phone: "+60 13 777 8899",
    service: "Property & Landscape",
    message: "Landscape and pool twilight for Eco Ardence show village.",
    status: "Won",
    created_at: "2026-06-18T08:25:00Z",
  },
  {
    id: "l-005",
    name: "Nurul Izzah",
    email: "hello@sushiya.my",
    phone: "+60 17 555 4433",
    service: "Commercial & Still Life",
    message: "Instagram content package — quarterly retainer inquiry.",
    status: "New",
    created_at: "2026-06-15T13:11:00Z",
  },
];

export const mockBriefs: Brief[] = [
  {
    id: "b-001",
    client_name: "Sime Darby Property",
    email: "brand@simedarbyproperty.com",
    project_type: "Aerial & Drone",
    budget_range: "RM 20,000 – RM 40,000",
    timeline: "4 weeks",
    location: "Elmina, Shah Alam",
    deliverables: "20 aerial stills, 2 min hero film, drone reel",
    details: "Phase 2 launch. Need dawn + dusk light. Talent optional.",
    ai_recommendation:
      "Recommend 2-day shoot with sunrise and golden-hour blocks, secondary Mavic 3 for detail passes, and a 60-second cut plus 15s vertical for reels.",
    status: "New",
    created_at: "2026-06-30T07:45:00Z",
  },
  {
    id: "b-002",
    client_name: "Myra Living",
    email: "marketing@myra.com.my",
    project_type: "Architecture & Interior",
    budget_range: "RM 10,000 – RM 20,000",
    timeline: "2 weeks",
    location: "Bangsar South, KL",
    deliverables: "30 interior stills across 6 unit layouts",
    details: "Focus on natural light. Twilight exteriors on day 2.",
    ai_recommendation:
      "One prep day for styling, two shoot days (interior + twilight), same-day retouch previews. Deliver TIFFs + web JPEGs.",
    status: "Reviewed",
    created_at: "2026-06-24T15:20:00Z",
  },
  {
    id: "b-003",
    client_name: "WOW Cafe",
    email: "founder@wowcafe.my",
    project_type: "Commercial & Still Life",
    budget_range: "RM 5,000 – RM 10,000",
    timeline: "1 week",
    location: "Damansara Uptown",
    deliverables: "18 menu stills + 6 lifestyle",
    details: "New seasonal menu. Warm tones, moody backgrounds.",
    ai_recommendation:
      "Single-day studio shoot with 2 backdrops, capture with Phase One IQ4 for tabletop, sign-off retouch within 4 business days.",
    status: "Quoted",
    created_at: "2026-06-19T10:05:00Z",
  },
];

export const mockPortfolio: PortfolioItem[] = [
  {
    id: "p-001",
    title: "Elmina Lakeside Mall & Sales Gallery",
    category: "Aerial · Architecture",
    description: "Twilight aerial and interior coverage for Sime Darby Property.",
    image_url: "/src/assets/elmina-1.jpg",
    project_date: "2026-04-12",
    published: true,
    featured: true,
  },
  {
    id: "p-002",
    title: "Bukit Raja Township",
    category: "Aerial · Property",
    description: "Township aerial series and show-home twilight set.",
    image_url: "/src/assets/bukit-raja-1.jpg",
    project_date: "2026-02-28",
    published: true,
    featured: false,
  },
  {
    id: "p-003",
    title: "Myra Gardens",
    category: "Landscape · Property",
    description: "Lush canopy aerials paired with pool twilight interiors.",
    image_url: "/src/assets/myra-1.jpg",
    project_date: "2025-11-15",
    published: true,
    featured: true,
  },
  {
    id: "p-004",
    title: "Pintea Seasonal Menu",
    category: "Still Life · Commercial",
    description: "Tabletop stills and lifestyle content for new tea line.",
    image_url: "/src/assets/pintea.jpg",
    project_date: "2025-10-02",
    published: false,
    featured: false,
  },
];

export const mockServices: Service[] = [
  { id: "s-001", title: "Aerial & Drone", blurb: "CAAM-licensed drone crews for townships, launches, and hero films.", icon: "Plane", order: 1 },
  { id: "s-002", title: "Architecture & Interior", blurb: "Tilt-shift precision for developers, architects, and interior designers.", icon: "Building", order: 2 },
  { id: "s-003", title: "Property & Landscape", blurb: "Twilight-to-blue-hour coverage that sells the address.", icon: "Trees", order: 3 },
  { id: "s-004", title: "Commercial & Still Life", blurb: "Studio and on-location product, food, and campaign imagery.", icon: "Camera", order: 4 },
];

export const mockHomepage: HomepageContent = {
  hero_eyebrow: "Malaysia · Aerial & Architectural Photography",
  hero_heading: "Frames that sell the place, not the pixel.",
  hero_subheading:
    "Imejination is a Malaysian photography studio elevating properties with stunning aerial and ground perspectives.",
  cta_label: "Start a brief",
  social_proof: "1.5K+ followers · 98% recommend on Facebook",
};

export const mockAdminUser = {
  name: "Nicholas Chen",
  email: "nicholas@imejination.my",
  role: "admin" as const,
};
