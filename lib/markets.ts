import type { MarketCode } from "@/lib/types";

export const MARKET_CONFIG: Record<
  MarketCode,
  {
    label: string;
    accent: string;
    description: string;
    features: string[];
  }
> = {
  SWEDEN: {
    label: "Sweden",
    accent: "Queue housing",
    description:
      "Rental-first flow with queue-style applications, landlord shortlist logic, and first-hand versus second-hand context.",
    features: ["Queue applications", "Landlord shortlist", "Rental-first UX"],
  },
  EU: {
    label: "EU",
    accent: "Multilingual ready",
    description:
      "Buy and rent marketplace foundation built for multiple countries and localized content expansion.",
    features: ["Buy and rent", "Localized content", "Search-ready detail pages"],
  },
  PAKISTAN: {
    label: "Pakistan",
    accent: "WhatsApp leads",
    description:
      "High-intent property discovery with direct WhatsApp and call CTAs for agents and developers.",
    features: ["WhatsApp CTA", "Agent-first contact", "Developer project support"],
  },
};

export const MARKET_CODES = Object.keys(MARKET_CONFIG) as MarketCode[];
