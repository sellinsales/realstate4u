import type { MarketCode } from "@/lib/types";

const EU_COUNTRY_CODES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
]);

function mapCountryCodeToMarket(code?: string | null): MarketCode | null {
  const value = code?.trim().toUpperCase();

  if (!value) {
    return null;
  }

  if (value === "PK") {
    return "PAKISTAN";
  }

  if (value === "SE") {
    return "SWEDEN";
  }

  if (EU_COUNTRY_CODES.has(value)) {
    return "EU";
  }

  return null;
}

function mapLanguageToMarket(language?: string | null): MarketCode | null {
  const value = language?.trim().toLowerCase();

  if (!value) {
    return null;
  }

  if (value.includes("en-pk") || value.includes("ur")) {
    return "PAKISTAN";
  }

  if (value.includes("sv")) {
    return "SWEDEN";
  }

  if (
    ["de", "fr", "es", "it", "nl", "pl", "pt", "ro", "da", "fi", "el", "cs", "sk", "sl"].some(
      (lang) => value.includes(lang),
    )
  ) {
    return "EU";
  }

  return null;
}

export function detectPreferredMarket(headerStore: Headers): MarketCode | null {
  const explicitMarket = headerStore.get("x-realstate4u-market");

  if (explicitMarket === "PAKISTAN" || explicitMarket === "SWEDEN" || explicitMarket === "EU") {
    return explicitMarket;
  }

  return (
    mapCountryCodeToMarket(headerStore.get("cf-ipcountry")) ||
    mapCountryCodeToMarket(headerStore.get("cloudfront-viewer-country")) ||
    mapCountryCodeToMarket(headerStore.get("x-vercel-ip-country")) ||
    mapCountryCodeToMarket(headerStore.get("x-country-code")) ||
    mapLanguageToMarket(headerStore.get("accept-language"))
  );
}

export function prioritizeByMarket<T>(
  items: T[],
  preferredMarket: MarketCode | null,
  getMarket: (item: T) => MarketCode | null | undefined,
) {
  if (!preferredMarket) {
    return items;
  }

  return [...items].sort((left, right) => {
    const leftScore = getMarket(left) === preferredMarket ? 1 : 0;
    const rightScore = getMarket(right) === preferredMarket ? 1 : 0;

    return rightScore - leftScore;
  });
}

export function getPreferredMarketCopy(preferredMarket: MarketCode | null) {
  if (!preferredMarket) {
    return null;
  }

  if (preferredMarket === "PAKISTAN") {
    return "Prioritizing Pakistan listings and market signals for your region.";
  }

  if (preferredMarket === "SWEDEN") {
    return "Prioritizing Sweden rental and queue-housing signals for your region.";
  }

  return "Prioritizing EU listings and market signals for your region.";
}

