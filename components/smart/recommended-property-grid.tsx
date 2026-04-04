"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PropertyCard } from "@/components/property/property-card";
import { useEngagement } from "@/components/providers/engagement-provider";
import {
  recommendProperties,
  type SmartRecommendation,
} from "@/lib/smart-match";
import type { PropertyCardData } from "@/lib/types";

function FallbackRecommendations({
  properties,
  limit,
}: {
  properties: PropertyCardData[];
  limit: number;
}) {
  return [...properties]
    .sort(
      (left, right) =>
        (right.leadCount ?? 0) - (left.leadCount ?? 0) ||
        Number(right.isVerified) - Number(left.isVerified),
    )
    .slice(0, limit)
    .map((property) => ({
      property,
      score: 72,
      reasons: [
        property.isVerified ? "Verified for marketplace trust" : "Active inventory worth watching",
        property.leadCount ? `${property.leadCount} active lead signals` : "Fresh listing momentum",
      ],
      label: property.isVerified ? "Trending now" : "Watchlist pick",
    })) satisfies SmartRecommendation[];
}

export function RecommendedPropertyGrid({
  properties,
  title,
  description,
  limit = 3,
  emptyTitle = "No recommendations yet.",
  emptyCopy = "Adjust your smart brief to generate stronger matches.",
  excludePropertyId,
}: {
  properties: PropertyCardData[];
  title: string;
  description: string;
  limit?: number;
  emptyTitle?: string;
  emptyCopy?: string;
  excludePropertyId?: string;
}) {
  const { matchProfile } = useEngagement();

  const recommendations = useMemo(() => {
    const matches = recommendProperties(properties, matchProfile, limit, excludePropertyId);
    return matches.length ? matches : FallbackRecommendations({ properties, limit });
  }, [excludePropertyId, limit, matchProfile, properties]);

  if (!recommendations.length) {
    return (
      <div className="panel rounded-[2rem] p-6">
        <h2 className="text-3xl font-semibold text-[var(--brand-blue)]">{emptyTitle}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">{emptyCopy}</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
            Smart recommendations
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-blue)]">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">{description}</p>
        </div>
        <Link href="/smart-match" className="btn-secondary">
          Open AI Match
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {recommendations.map((item) => (
          <PropertyCard
            key={item.property.id}
            property={item.property}
            recommendationLabel={item.label}
            matchReasons={item.reasons}
          />
        ))}
      </div>
    </section>
  );
}
