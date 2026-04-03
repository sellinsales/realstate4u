import type { MarketCode, PropertyCardData } from "@/lib/types";

export type MatchGoal =
  | "MOVE_FAST"
  | "BEST_VALUE"
  | "FAMILY_HOME"
  | "INVESTMENT"
  | "PREMIUM";

export type MatchProfile = {
  goal: MatchGoal;
  marketCode?: MarketCode | "ANY";
  listingType?: string | "ANY";
  propertyType?: string | "ANY";
  maxPrice?: number;
  city?: string;
  bedrooms?: number;
  needsQueue?: boolean;
  prefersWhatsApp?: boolean;
};

export type SmartRecommendation = {
  property: PropertyCardData;
  score: number;
  reasons: string[];
  label: string;
};

export type SmartInsight = {
  label: string;
  value: string;
  hint: string;
};

export const DEFAULT_MATCH_PROFILE: MatchProfile = {
  goal: "BEST_VALUE",
  marketCode: "ANY",
  listingType: "ANY",
  propertyType: "ANY",
  maxPrice: undefined,
  city: "",
  bedrooms: undefined,
  needsQueue: false,
  prefersWhatsApp: false,
};

const goalCopy: Record<MatchGoal, { label: string; prompt: string }> = {
  MOVE_FAST: {
    label: "Move fast",
    prompt: "Prioritizes easy contact paths and quick conversion listings.",
  },
  BEST_VALUE: {
    label: "Best value",
    prompt: "Prioritizes strong price fit and practical inventory.",
  },
  FAMILY_HOME: {
    label: "Family home",
    prompt: "Prioritizes space, bedrooms, and livability cues.",
  },
  INVESTMENT: {
    label: "Investment",
    prompt: "Prioritizes verified inventory and demand signals.",
  },
  PREMIUM: {
    label: "Premium",
    prompt: "Prioritizes flagship homes and higher-end inventory.",
  },
};

function normalizeText(value?: string) {
  return value?.trim().toLowerCase() || "";
}

function getBudgetFit(property: PropertyCardData, profile: MatchProfile) {
  if (!profile.maxPrice) {
    return 8;
  }

  if (property.price <= profile.maxPrice) {
    const ratio = profile.maxPrice / Math.max(property.price, 1);
    return Math.min(22, Math.round(10 + ratio * 6));
  }

  const overshoot = property.price - profile.maxPrice;
  const overshootRatio = overshoot / Math.max(profile.maxPrice, 1);
  return Math.max(-18, Math.round(-overshootRatio * 24));
}

function getGoalScore(property: PropertyCardData, profile: MatchProfile) {
  switch (profile.goal) {
    case "MOVE_FAST":
      return (
        (property.whatsappPhone ? 10 : 0) +
        (property.queueType === "FIRSTCOME" ? 8 : 0) +
        (property.isVerified ? 6 : 0)
      );
    case "BEST_VALUE":
      return (
        (property.isVerified ? 6 : 0) +
        (property.areaSqm && property.price > 0 ? Math.min(12, Math.round(property.areaSqm / 12)) : 4)
      );
    case "FAMILY_HOME":
      return (
        (property.bedrooms && property.bedrooms >= 3 ? 12 : 0) +
        (property.bathrooms && property.bathrooms >= 2 ? 8 : 0) +
        (property.areaSqm && property.areaSqm >= 100 ? 8 : 0)
      );
    case "INVESTMENT":
      return (
        (property.listingType === "BUY" ? 10 : 0) +
        (property.isVerified ? 8 : 0) +
        Math.min(12, property.leadCount ?? 0)
      );
    case "PREMIUM":
      return (
        (property.propertyType === "VILLA" || property.propertyType === "HOUSE" ? 10 : 0) +
        (property.bedrooms && property.bedrooms >= 4 ? 8 : 0) +
        (property.price >= 500000 ? 10 : 0)
      );
    default:
      return 0;
  }
}

export function scoreProperty(property: PropertyCardData, profile: MatchProfile) {
  let score = 40;

  if (profile.marketCode && profile.marketCode !== "ANY") {
    score += property.marketCode === profile.marketCode ? 22 : -10;
  }

  if (profile.listingType && profile.listingType !== "ANY") {
    score += property.listingType === profile.listingType ? 18 : -8;
  }

  if (profile.propertyType && profile.propertyType !== "ANY") {
    score += property.propertyType === profile.propertyType ? 12 : -4;
  }

  if (profile.city) {
    score += normalizeText(property.city) === normalizeText(profile.city) ? 14 : -2;
  }

  if (profile.bedrooms) {
    if ((property.bedrooms ?? 0) >= profile.bedrooms) {
      score += 10;
    } else if ((property.bedrooms ?? 0) + 1 === profile.bedrooms) {
      score += 2;
    } else {
      score -= 6;
    }
  }

  if (profile.needsQueue) {
    score += property.queueType ? 12 : -8;
  }

  if (profile.prefersWhatsApp) {
    score += property.whatsappPhone ? 12 : -4;
  }

  score += getBudgetFit(property, profile);
  score += getGoalScore(property, profile);

  return Math.max(0, score);
}

export function buildRecommendationReasons(property: PropertyCardData, profile: MatchProfile) {
  const reasons: string[] = [];

  if (profile.marketCode && profile.marketCode !== "ANY" && property.marketCode === profile.marketCode) {
    reasons.push(`Matches your ${profile.marketCode.toLowerCase()} market focus`);
  }

  if (profile.city && normalizeText(property.city) === normalizeText(profile.city)) {
    reasons.push(`Located in your preferred city: ${property.city}`);
  }

  if (profile.maxPrice && property.price <= profile.maxPrice) {
    reasons.push("Fits within your target budget");
  }

  if (profile.bedrooms && (property.bedrooms ?? 0) >= profile.bedrooms) {
    reasons.push(`Meets your ${profile.bedrooms}+ bedroom target`);
  }

  if (profile.needsQueue && property.queueType) {
    reasons.push(`Includes a ${property.queueType.toLowerCase()} rental workflow`);
  }

  if (profile.prefersWhatsApp && property.whatsappPhone) {
    reasons.push("Supports a WhatsApp-first contact path");
  }

  if (property.isVerified) {
    reasons.push("Already verified for marketplace trust");
  }

  if ((property.leadCount ?? 0) >= 10) {
    reasons.push("Showing strong market interest");
  }

  if (profile.goal === "FAMILY_HOME" && (property.bedrooms ?? 0) >= 3) {
    reasons.push("Sized well for families");
  }

  if (profile.goal === "INVESTMENT" && property.listingType === "BUY") {
    reasons.push("Structured for long-term acquisition");
  }

  if (profile.goal === "PREMIUM" && (property.propertyType === "VILLA" || property.propertyType === "HOUSE")) {
    reasons.push("Aligned with premium home inventory");
  }

  if (!reasons.length) {
    reasons.push(goalCopy[profile.goal].prompt);
  }

  return reasons.slice(0, 3);
}

export function buildRecommendationLabel(profile: MatchProfile, score: number) {
  if (score >= 92) {
    return "Top match";
  }

  if (profile.goal === "MOVE_FAST" && score >= 78) {
    return "Fast-contact pick";
  }

  if (profile.goal === "BEST_VALUE" && score >= 78) {
    return "Value pick";
  }

  if (profile.goal === "FAMILY_HOME" && score >= 78) {
    return "Family fit";
  }

  if (profile.goal === "INVESTMENT" && score >= 78) {
    return "Investment-ready";
  }

  if (profile.goal === "PREMIUM" && score >= 78) {
    return "Premium pick";
  }

  return "Recommended";
}

export function recommendProperties(
  properties: PropertyCardData[],
  profile: MatchProfile,
  limit = 6,
  excludePropertyId?: string,
) {
  return properties
    .filter((property) => property.id !== excludePropertyId)
    .map((property) => {
      const score = scoreProperty(property, profile);

      return {
        property,
        score,
        reasons: buildRecommendationReasons(property, profile),
        label: buildRecommendationLabel(profile, score),
      } satisfies SmartRecommendation;
    })
    .sort((left, right) => right.score - left.score || (right.property.leadCount ?? 0) - (left.property.leadCount ?? 0))
    .slice(0, limit);
}

export function buildSmartInsights(properties: PropertyCardData[], profile: MatchProfile): SmartInsight[] {
  const recommendations = recommendProperties(properties, profile, 6);
  const top = recommendations[0];
  const averagePrice = recommendations.length
    ? Math.round(recommendations.reduce((sum, item) => sum + item.property.price, 0) / recommendations.length)
    : 0;
  const whatsappReady = recommendations.filter((item) => item.property.whatsappPhone).length;
  const queueReady = recommendations.filter((item) => item.property.queueType).length;

  return [
    {
      label: "Strongest market",
      value: top ? top.property.country : "All markets",
      hint: top ? `Lead pick: ${top.property.city}` : "Set your brief to generate focused picks.",
    },
    {
      label: "Recommended budget zone",
      value: averagePrice ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(averagePrice) : "Flexible",
      hint: averagePrice ? "Average price across your best-fit listings" : "No budget signal yet",
    },
    {
      label: "Best contact path",
      value: whatsappReady >= queueReady ? "Direct lead" : "Queue workflow",
      hint:
        whatsappReady >= queueReady
          ? "More of your matches convert through call or WhatsApp"
          : "More of your matches are queue-based rentals",
    },
  ];
}

export function getGoalOptions() {
  return [
    { value: "BEST_VALUE", label: "Best value" },
    { value: "MOVE_FAST", label: "Move fast" },
    { value: "FAMILY_HOME", label: "Family home" },
    { value: "INVESTMENT", label: "Investment" },
    { value: "PREMIUM", label: "Premium" },
  ] as const;
}
