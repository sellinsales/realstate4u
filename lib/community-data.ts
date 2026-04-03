import type { Route } from "next";

export type MarketFlash = {
  tag: string;
  title: string;
  href: Route;
};

export type OpenDemand = {
  id: string;
  title: string;
  category: string;
  location: string;
  budget: string;
  urgency: string;
  summary: string;
  contactMode: string;
};

export type MarketTrend = {
  title: string;
  market: string;
  signal: string;
  summary: string;
};

export type InvestmentOpportunity = {
  title: string;
  market: string;
  profile: string;
  whyNow: string;
  watchFor: string;
};

export const MARKET_FLASHES: MarketFlash[] = [
  {
    tag: "Today",
    title: "Demand briefs are now open for rentals, services, and investor requirements.",
    href: "/demand-board",
  },
  {
    tag: "Trend",
    title: "Sweden queue rentals remain strong for verified first-hand supply.",
    href: "/queue-housing",
  },
  {
    tag: "Smart Match",
    title: "Build a smart search brief and rank listings by intent instead of simple date order.",
    href: "/smart-match",
  },
  {
    tag: "Pakistan",
    title: "WhatsApp-ready listings are converting faster for direct agent response.",
    href: "/properties?marketCode=PAKISTAN",
  },
  {
    tag: "Investment",
    title: "Mid-market EU apartments remain the cleanest entry point for long-hold buyers.",
    href: "/demand-board",
  },
];

export const OPEN_DEMANDS: OpenDemand[] = [
  {
    id: "demand-sto-rental",
    title: "Need a verified 2-bed rental in Stockholm within 30 days",
    category: "Rental requirement",
    location: "Stockholm, Sweden",
    budget: "Up to 15,000 SEK / month",
    urgency: "High priority",
    summary:
      "Corporate tenant wants a clean queue-ready or direct rental option near commuter lines with fast landlord review.",
    contactMode: "Web inquiry or queue shortlist",
  },
  {
    id: "demand-lhr-renovation",
    title: "Looking for villa renovation team in DHA Lahore",
    category: "Property work request",
    location: "Lahore, Pakistan",
    budget: "Premium scope",
    urgency: "Immediate quotes",
    summary:
      "Owner needs interior refresh, paint, lighting, and kitchen upgrade with one accountable contractor.",
    contactMode: "Call or WhatsApp",
  },
  {
    id: "demand-ber-investor",
    title: "Investor seeking buy-to-let apartments in Berlin",
    category: "Investment requirement",
    location: "Berlin, Germany",
    budget: "EUR 350k to 550k",
    urgency: "This quarter",
    summary:
      "Buyer wants stable residential stock with multilingual sales material and strong tenant demand fundamentals.",
    contactMode: "Agent intro and data room",
  },
];

export const MARKET_TRENDS: MarketTrend[] = [
  {
    title: "Queue-aware supply is differentiating Sweden rental inventory",
    market: "Sweden",
    signal: "High tenant retention demand",
    summary:
      "Listings that clearly explain queue type, first-hand status, and landlord selection rules are easier to qualify and shortlist.",
  },
  {
    title: "Mid-ticket apartments remain the cleanest EU conversion path",
    market: "EU",
    signal: "Balanced buy-side interest",
    summary:
      "Practical city apartments with strong transport links are easier to market across multilingual buyer segments than oversized stock.",
  },
  {
    title: "Direct-response channels continue to win in Pakistan",
    market: "Pakistan",
    signal: "WhatsApp-first lead capture",
    summary:
      "Listings with clear phone ownership, prompt response expectations, and strong media packages continue to outperform generic listing pages.",
  },
];

export const INVESTMENT_OPPORTUNITIES: InvestmentOpportunity[] = [
  {
    title: "Stockholm commuter-belt rentals with transparent queue rules",
    market: "Sweden",
    profile: "Income-focused hold",
    whyNow:
      "Strong rental pressure and clearer tenant qualification workflows make smaller verified units easier to operate.",
    watchFor: "Queue transparency, landlord notes, and transport proximity",
  },
  {
    title: "Berlin family apartments in resilient inner-ring neighborhoods",
    market: "EU",
    profile: "Capital preservation plus long-term demand",
    whyNow:
      "Buyers continue to favor well-located family stock with broad rental appeal and clearer resale positioning.",
    watchFor: "School access, transport links, and multilingual presentation quality",
  },
  {
    title: "Lahore villas with direct-response developer or agent coverage",
    market: "Pakistan",
    profile: "Premium upside with active lead flow",
    whyNow:
      "High-intent buyers still respond quickly to strong media, immediate contact paths, and neighborhood reputation.",
    watchFor: "Response speed, documentation readiness, and developer credibility",
  },
];
