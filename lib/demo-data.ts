import type { AdminSnapshot, DashboardSnapshot, MarketCode, PropertyCardData } from "@/lib/types";

export const DEMO_CREDENTIALS = [
  {
    email: "admin@realstate4u.com",
    password: "demo1234",
    role: "ADMIN",
    name: "Mina Rahman",
    phone: "+46 70 000 1000",
    country: "Sweden",
    city: "Stockholm",
  },
  {
    email: "agent@realstate4u.com",
    password: "demo1234",
    role: "AGENT",
    name: "Ali Hassan",
    phone: "+92 300 1234567",
    country: "Pakistan",
    city: "Lahore",
  },
  {
    email: "user@realstate4u.com",
    password: "demo1234",
    role: "USER",
    name: "Eva Lindholm",
    phone: "+49 151 12345678",
    country: "Germany",
    city: "Berlin",
  },
] as const;

export const HERO_METRICS = [
  { label: "Verticals", value: "3" },
  { label: "Phase 1 flows", value: "9" },
  { label: "Target markets", value: "3" },
];

export const DEMO_PROPERTIES: PropertyCardData[] = [
  {
    id: "demo-sto-queue-1",
    slug: "sodermalm-queue-apartment",
    title: "Sodermalm Queue Apartment",
    description:
      "Two-bedroom Stockholm rental with first-hand queue flow, shortlist-ready landlord review, and a fast onboarding path for verified renters.",
    price: 12900,
    country: "Sweden",
    city: "Stockholm",
    address: "Sodermalm, Stockholm",
    marketCode: "SWEDEN",
    propertyType: "APARTMENT",
    listingType: "RENT",
    bedrooms: 2,
    bathrooms: 1,
    areaSqm: 74,
    firstHand: true,
    landlordSelection: "Shortlist from queue position and income check",
    isVerified: true,
    createdAt: "2026-03-28T12:00:00.000Z",
    agentName: "Nordbo Housing",
    contactPhone: "+46 70 000 1000",
    latitude: 59.315,
    longitude: 18.069,
    imageUrls: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    ],
    queueType: "QUEUE",
    leadCount: 12,
  },
  {
    id: "demo-gbg-queue-2",
    slug: "vastra-frolunda-second-hand-rental",
    title: "Vastra Frolunda Second-Hand Rental",
    description:
      "Second-hand Gothenburg rental for families seeking a cleaner application process with queue or first-come flexibility.",
    price: 9800,
    country: "Sweden",
    city: "Gothenburg",
    address: "Vastra Frolunda, Gothenburg",
    marketCode: "SWEDEN",
    propertyType: "APARTMENT",
    listingType: "RENT",
    bedrooms: 3,
    bathrooms: 1,
    areaSqm: 81,
    firstHand: false,
    landlordSelection: "First complete application set wins",
    isVerified: false,
    createdAt: "2026-03-25T09:00:00.000Z",
    agentName: "West Coast Rentals",
    contactPhone: "+46 31 555 200",
    latitude: 57.663,
    longitude: 11.882,
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    ],
    queueType: "FIRSTCOME",
    leadCount: 5,
  },
  {
    id: "demo-ber-eu-1",
    slug: "kreuzberg-family-flat",
    title: "Kreuzberg Family Flat",
    description:
      "A buy-ready Berlin apartment tuned for multilingual EU discovery pages and clean lead collection for agents.",
    price: 485000,
    country: "Germany",
    city: "Berlin",
    address: "Kreuzberg, Berlin",
    marketCode: "EU",
    propertyType: "APARTMENT",
    listingType: "BUY",
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 118,
    isVerified: true,
    createdAt: "2026-03-30T08:30:00.000Z",
    agentName: "Urban Nest EU",
    contactPhone: "+49 30 900001",
    latitude: 52.498,
    longitude: 13.403,
    imageUrls: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    ],
    leadCount: 8,
  },
  {
    id: "demo-lhr-pk-1",
    slug: "dha-lahore-modern-villa",
    title: "DHA Lahore Modern Villa",
    description:
      "A premium Pakistan listing designed for direct agent contact, WhatsApp-first conversions, and verified project-style presentation.",
    price: 125000000,
    country: "Pakistan",
    city: "Lahore",
    address: "DHA Phase 6, Lahore",
    marketCode: "PAKISTAN",
    propertyType: "VILLA",
    listingType: "BUY",
    bedrooms: 5,
    bathrooms: 5,
    areaSqm: 510,
    isVerified: false,
    createdAt: "2026-03-31T16:45:00.000Z",
    agentName: "Hassan Estates",
    contactPhone: "+92 42 1234567",
    whatsappPhone: "923001234567",
    latitude: 31.468,
    longitude: 74.385,
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    ],
    leadCount: 15,
  },
];

export const HOME_VERTICALS = [
  {
    title: "Properties",
    description:
      "Buy, rent, and queue-ready housing across Sweden, EU markets, and Pakistan.",
  },
  {
    title: "Home Services",
    description:
      "A future vertical for verified movers, cleaners, maintenance teams, and inspection providers.",
  },
  {
    title: "Construction Jobs",
    description:
      "Phase 4 expansion for project hiring, trade workers, and development-focused job posts.",
  },
];

export const PHASE_NOTES = [
  "Phase 1 focuses on properties, auth, queue MVP, leads, and admin basics.",
  "Services and jobs have placeholder routes so the architecture is ready without shipping those verticals yet.",
  "All market differences are modeled as data and feature flags instead of hard-coded pages.",
];

export const FILTER_OPTIONS = {
  countries: ["Sweden", "Germany", "Pakistan"],
  cities: ["Stockholm", "Gothenburg", "Berlin", "Lahore"],
  listingTypes: ["BUY", "RENT"],
  propertyTypes: ["APARTMENT", "HOUSE", "VILLA", "ROOM"],
};

export const DEMO_DASHBOARD: DashboardSnapshot = {
  listingCount: DEMO_PROPERTIES.length,
  leadCount: 40,
  queueApplications: 17,
  pendingReview: DEMO_PROPERTIES.filter((property) => !property.isVerified).length,
  listings: DEMO_PROPERTIES.slice(0, 3),
};

export const DEMO_ADMIN: AdminSnapshot = {
  pendingListings: DEMO_PROPERTIES.filter((property) => !property.isVerified),
  verifiedCount: DEMO_PROPERTIES.filter((property) => property.isVerified).length,
  userCount: DEMO_CREDENTIALS.length,
};

export const DEFAULT_MARKET: MarketCode = "SWEDEN";
