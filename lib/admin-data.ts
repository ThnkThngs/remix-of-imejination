export const leadStatuses = [
  "New",
  "Contacted",
  "Quoted",
  "Won",
  "Archived",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export const projectTypes = [
  "Property / Architecture",
  "Food & Beverage",
  "Event / Portrait",
  "Video Production",
  "Other",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export const preferredContacts = ["Email", "Phone", "WhatsApp"] as const;

export type PreferredContact = (typeof preferredContacts)[number];

export const portfolioCategories = [
  "Property",
  "Architecture",
  "Interior",
  "Food & Beverage",
  "Lifestyle",
  "Event",
  "Portrait",
  "Video",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type LeadNote = {
  id: string;
  text: string;
  createdAt: string;
};

export type LeadTimelineEntry = {
  status: LeadStatus;
  at: string;
};

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  preferredContact: PreferredContact;
  projectType: ProjectType;
  projectName: string;
  location: string;
  deadline: string;
  budgetRange: string;
  details: string;
  aiRecommendation: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  statusTimeline: LeadTimelineEntry[];
  internalNotes: LeadNote[];
};

export type PortfolioImage = {
  id: string;
  fileName: string;
  alt: string;
  previewUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  mimeType: string;
  createdAt: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  tags: string[];
  featured: boolean;
  order: number;
  images: PortfolioImage[];
  updatedAt: string;
};

export type AdminState = {
  leads: Lead[];
  portfolioItems: PortfolioItem[];
};

export const adminStorageKey = "imejination-admin-state-v1";

export const baseTagPool = [
  "Aerial",
  "Architecture",
  "Brand",
  "Campaign",
  "Commercial",
  "Corporate",
  "Creative Direction",
  "Dusk",
  "Editorial",
  "Event",
  "Exterior",
  "Food",
  "Flat Lay",
  "Interior",
  "Lifestyle",
  "Lighting",
  "Masterplan",
  "Menu",
  "Night",
  "Portrait",
  "Property",
  "Product",
  "Residential",
  "Still Life",
  "Township",
  "Travel",
  "Video",
  "Walkthrough",
];

export const seedState: AdminState = {
  leads: [
    {
      id: "lead-001",
      name: "Amirah Tan",
      company: "Sime Darby Property",
      email: "amirah.tan@simeprop.com",
      phone: "+60 12-341 9987",
      preferredContact: "WhatsApp",
      projectType: "Property / Architecture",
      projectName: "Bandar Bukit Raja launch update",
      location: "Klang, Selangor",
      deadline: "2026-07-08",
      budgetRange: "RM20k - RM35k",
      details:
        "Township aerials, dusk hero frames, and a short walkthrough reel for launch communications.",
      aiRecommendation:
        "Lead with aerial context, then capture the bridge, main arrival road, and a dusk hero sequence before finishing with a concise walkthrough reel and still set for social and sales decks.",
      status: "Quoted",
      createdAt: "2026-06-19T01:15:00.000Z",
      updatedAt: "2026-06-23T05:22:00.000Z",
      statusTimeline: [
        { status: "New", at: "2026-06-19T01:15:00.000Z" },
        { status: "Contacted", at: "2026-06-20T02:40:00.000Z" },
        { status: "Quoted", at: "2026-06-23T05:22:00.000Z" },
      ],
      internalNotes: [
        {
          id: "note-001",
          text: "Requested sunrise and dusk alternatives for the same flight plan.",
          createdAt: "2026-06-23T05:40:00.000Z",
        },
      ],
    },
    {
      id: "lead-002",
      name: "Daniel Foo",
      company: "Kopi District",
      email: "daniel@kopidistrict.my",
      phone: "+60 18-992 2204",
      preferredContact: "Email",
      projectType: "Food & Beverage",
      projectName: "New menu and drink campaign",
      location: "Petaling Jaya",
      deadline: "2026-06-30",
      budgetRange: "RM8k - RM15k",
      details:
        "Menu photography, drink macros, and lifestyle imagery for social rollout and delivery app assets.",
      aiRecommendation:
        "Build a shot list around menu hero dishes, drink stack-ups, texture close-ups, and one human-led café moment to keep the campaign lively.",
      status: "Contacted",
      createdAt: "2026-06-21T03:10:00.000Z",
      updatedAt: "2026-06-24T03:05:00.000Z",
      statusTimeline: [
        { status: "New", at: "2026-06-21T03:10:00.000Z" },
        { status: "Contacted", at: "2026-06-24T03:05:00.000Z" },
      ],
      internalNotes: [
        {
          id: "note-002",
          text: "Waiting on final dish list and preferred plating style.",
          createdAt: "2026-06-24T03:12:00.000Z",
        },
      ],
    },
    {
      id: "lead-003",
      name: "Rina Suresh",
      company: "Aurora Events",
      email: "rina@auroraevents.co",
      phone: "+60 16-808 7712",
      preferredContact: "WhatsApp",
      projectType: "Event / Portrait",
      projectName: "Leadership summit documentation",
      location: "Kuala Lumpur",
      deadline: "2026-07-14",
      budgetRange: "RM12k - RM22k",
      details:
        "Stage coverage, speaker portraits, networking moments, and same-day selects for PR.",
      aiRecommendation:
        "Cover the opening keynote, panel reactions, networking cadence, and a compact portrait set with fast turnaround selects for press.",
      status: "Won",
      createdAt: "2026-06-18T00:40:00.000Z",
      updatedAt: "2026-06-24T07:20:00.000Z",
      statusTimeline: [
        { status: "New", at: "2026-06-18T00:40:00.000Z" },
        { status: "Contacted", at: "2026-06-19T04:12:00.000Z" },
        { status: "Quoted", at: "2026-06-21T01:50:00.000Z" },
        { status: "Won", at: "2026-06-24T07:20:00.000Z" },
      ],
      internalNotes: [
        {
          id: "note-003",
          text: "Need one photographer dedicated to speaker portraits before the closing session.",
          createdAt: "2026-06-24T07:28:00.000Z",
        },
      ],
    },
    {
      id: "lead-004",
      name: "Shawn Lee",
      company: "Northpoint Residences",
      email: "shawn@northpointres.com",
      phone: "+60 13-642 4300",
      preferredContact: "Phone",
      projectType: "Video Production",
      projectName: "Property walkthrough and social reels",
      location: "Johor Bahru",
      deadline: "2026-07-20",
      budgetRange: "RM15k - RM28k",
      details:
        "Need a walkthrough, short social edits, and a light narration version for sales team follow-up.",
      aiRecommendation:
        "Use one hero walkthrough route, then break the deliverables into a long-form property edit plus short vertical reels and stills for ads.",
      status: "New",
      createdAt: "2026-06-24T09:05:00.000Z",
      updatedAt: "2026-06-24T09:05:00.000Z",
      statusTimeline: [{ status: "New", at: "2026-06-24T09:05:00.000Z" }],
      internalNotes: [],
    },
    {
      id: "lead-005",
      name: "Nadia Razak",
      company: "Vivid Hospitality",
      email: "nadia@vividhospitality.my",
      phone: "+60 17-907 1450",
      preferredContact: "Email",
      projectType: "Food & Beverage",
      projectName: "Cafe opening rollout",
      location: "Shah Alam",
      deadline: "2026-06-12",
      budgetRange: "RM6k - RM10k",
      details:
        "Archival now, but keep the brand on file for future F&B launches and seasonal refreshes.",
      aiRecommendation:
        "Archived after scope change; retain a compact playbook for future drinks, lifestyle, and menu refresh content.",
      status: "Archived",
      createdAt: "2026-06-10T02:00:00.000Z",
      updatedAt: "2026-06-12T08:00:00.000Z",
      statusTimeline: [
        { status: "New", at: "2026-06-10T02:00:00.000Z" },
        { status: "Contacted", at: "2026-06-11T03:00:00.000Z" },
        { status: "Archived", at: "2026-06-12T08:00:00.000Z" },
      ],
      internalNotes: [
        {
          id: "note-004",
          text: "Could revive later with smaller monthly content package.",
          createdAt: "2026-06-12T08:14:00.000Z",
        },
      ],
    },
  ],
  portfolioItems: [
    {
      id: "item-001",
      title: "Bandar Bukit Raja launch masterplan",
      category: "Property",
      description:
        "Aerial property context and sunset hero frames for township launches and sales decks.",
      tags: ["Property", "Aerial", "Masterplan", "Township", "Dusk"],
      featured: true,
      order: 1,
      images: [
        {
          id: "image-001",
          fileName: "property-masterplan.jpg",
          alt: "Aerial view of the township masterplan at sunset",
          previewUrl: "/portfolio/property-masterplan.jpg",
          thumbnailUrl: "/portfolio/property-masterplan.jpg",
          width: 1400,
          height: 978,
          mimeType: "image/jpeg",
          createdAt: "2026-06-01T00:00:00.000Z",
        },
      ],
      updatedAt: "2026-06-24T00:00:00.000Z",
    },
    {
      id: "item-002",
      title: "Bridge at dusk",
      category: "Architecture",
      description:
        "Long-exposure exterior work with a cinematic dusk palette and strong leading lines.",
      tags: ["Architecture", "Exterior", "Bridge", "Night", "Lighting"],
      featured: true,
      order: 2,
      images: [
        {
          id: "image-002",
          fileName: "bridge-dusk.jpg",
          alt: "Curving bridge photographed at dusk with illuminated traffic",
          previewUrl: "/portfolio/bridge-dusk.jpg",
          thumbnailUrl: "/portfolio/bridge-dusk.jpg",
          width: 1649,
          height: 1163,
          mimeType: "image/jpeg",
          createdAt: "2026-06-01T00:00:00.000Z",
        },
      ],
      updatedAt: "2026-06-24T00:00:00.000Z",
    },
    {
      id: "item-003",
      title: "Interior bedroom story",
      category: "Interior",
      description:
        "Luxury staging and residential detail for developer brochures and listing campaigns.",
      tags: ["Interior", "Bedroom", "Residential", "Lifestyle"],
      featured: false,
      order: 3,
      images: [
        {
          id: "image-003",
          fileName: "interior-bedroom.jpg",
          alt: "Styled bedroom interior with warm light and premium finishes",
          previewUrl: "/portfolio/interior-bedroom.jpg",
          thumbnailUrl: "/portfolio/interior-bedroom.jpg",
          width: 1400,
          height: 990,
          mimeType: "image/jpeg",
          createdAt: "2026-06-01T00:00:00.000Z",
        },
        {
          id: "image-004",
          fileName: "interior-gallery.jpg",
          alt: "Interior gallery and staging shoot with modern design",
          previewUrl: "/portfolio/interior-gallery.jpg",
          thumbnailUrl: "/portfolio/interior-gallery.jpg",
          width: 1400,
          height: 991,
          mimeType: "image/jpeg",
          createdAt: "2026-06-01T00:00:00.000Z",
        },
      ],
      updatedAt: "2026-06-24T00:00:00.000Z",
    },
    {
      id: "item-004",
      title: "Beverage campaign set",
      category: "Food & Beverage",
      description:
        "Colorful drinks, product styling, and clean tabletop framing for fast social assets.",
      tags: ["Food", "Beverage", "Product", "Campaign", "Flat Lay"],
      featured: true,
      order: 4,
      images: [
        {
          id: "image-005",
          fileName: "fnb-drinks.jpg",
          alt: "Assorted drinks and product styling on a bright tabletop",
          previewUrl: "/portfolio/fnb-drinks.jpg",
          thumbnailUrl: "/portfolio/fnb-drinks.jpg",
          width: 1400,
          height: 990,
          mimeType: "image/jpeg",
          createdAt: "2026-06-01T00:00:00.000Z",
        },
      ],
      updatedAt: "2026-06-24T00:00:00.000Z",
    },
    {
      id: "item-005",
      title: "Menu overhead spread",
      category: "Food & Beverage",
      description:
        "Overhead plates and texture-led food composition for restaurants and delivery content.",
      tags: ["Food", "Menu", "Overhead", "Still Life", "Campaign"],
      featured: false,
      order: 5,
      images: [
        {
          id: "image-006",
          fileName: "fnb-food.jpg",
          alt: "Overhead plated dishes and menu styling on a dark table",
          previewUrl: "/portfolio/fnb-food.jpg",
          thumbnailUrl: "/portfolio/fnb-food.jpg",
          width: 1400,
          height: 991,
          mimeType: "image/jpeg",
          createdAt: "2026-06-01T00:00:00.000Z",
        },
      ],
      updatedAt: "2026-06-24T00:00:00.000Z",
    },
    {
      id: "item-006",
      title: "Lifestyle dining moment",
      category: "Lifestyle",
      description:
        "Human-led lifestyle visuals that connect appetite, hospitality, and brand personality.",
      tags: ["Lifestyle", "Dining", "Human", "Campaign"],
      featured: false,
      order: 6,
      images: [
        {
          id: "image-007",
          fileName: "fnb-lifestyle.jpg",
          alt: "Lifestyle food scene with a model presenting dishes",
          previewUrl: "/portfolio/fnb-lifestyle.jpg",
          thumbnailUrl: "/portfolio/fnb-lifestyle.jpg",
          width: 1400,
          height: 990,
          mimeType: "image/jpeg",
          createdAt: "2026-06-01T00:00:00.000Z",
        },
      ],
      updatedAt: "2026-06-24T00:00:00.000Z",
    },
  ],
};

export function normalizeTag(tag: string) {
  return tag.trim().replace(/\s+/g, " ");
}

export function tagKey(tag: string) {
  return normalizeTag(tag).toLowerCase();
}

export function dedupeTags(tags: string[]) {
  const seen = new Set<string>();
  const deduped: string[] = [];

  for (const tag of tags) {
    const normalized = normalizeTag(tag);
    if (!normalized) {
      continue;
    }

    const key = tagKey(normalized);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(normalized);
  }

  return deduped;
}

export function collectTagPool(items: PortfolioItem[]) {
  return dedupeTags([
    ...baseTagPool,
    ...items.map((item) => item.category),
    ...items.flatMap((item) => item.tags),
  ]);
}

export function suggestTags(query: string, selectedTags: string[], pool: string[]) {
  const normalizedQuery = tagKey(query);
  const selected = new Set(selectedTags.map(tagKey));

  return dedupeTags(pool)
    .filter((tag) => !selected.has(tagKey(tag)))
    .filter((tag) => {
      if (!normalizedQuery) {
        return true;
      }

      const key = tagKey(tag);
      return key.includes(normalizedQuery) || key.startsWith(normalizedQuery);
    })
    .sort((a, b) => {
      const aKey = tagKey(a);
      const bKey = tagKey(b);
      const queryMatchA = aKey.startsWith(normalizedQuery) ? 0 : 1;
      const queryMatchB = bKey.startsWith(normalizedQuery) ? 0 : 1;
      if (queryMatchA !== queryMatchB) {
        return queryMatchA - queryMatchB;
      }
      return a.localeCompare(b);
    })
    .slice(0, 10);
}

export function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createEmptyPortfolioItem(order: number): PortfolioItem {
  return {
    id: createId("item"),
    title: "",
    category: "Property",
    description: "",
    tags: [],
    featured: false,
    order,
    images: [],
    updatedAt: new Date().toISOString(),
  };
}

export function cloneState(state: AdminState): AdminState {
  return {
    leads: state.leads.map((lead) => ({
      ...lead,
      statusTimeline: lead.statusTimeline.map((entry) => ({ ...entry })),
      internalNotes: lead.internalNotes.map((note) => ({ ...note })),
    })),
    portfolioItems: state.portfolioItems.map((item) => ({
      ...item,
      tags: [...item.tags],
      images: item.images.map((image) => ({ ...image })),
    })),
  };
}
