"use client";

import { useMemo } from "react";
import { PropertyCard } from "@/components/property/property-card";
import { useEngagement } from "@/components/providers/engagement-provider";
import { recommendProperties } from "@/lib/smart-match";
import type { PropertyCardData } from "@/lib/types";

export function PersonalizedDashboardPanel({ properties }: { properties: PropertyCardData[] }) {
  const { hasHydrated, savedPropertyIds, recentPropertyIds, matchProfile } = useEngagement();

  const savedProperties = useMemo(() => {
    const ids = new Set(savedPropertyIds);
    return properties.filter((property) => ids.has(property.id)).slice(0, 3);
  }, [properties, savedPropertyIds]);

  const recentCount = recentPropertyIds.length;

  const topRecommendations = useMemo(
    () => recommendProperties(properties, matchProfile, 3),
    [matchProfile, properties],
  );

  return (
    <section className="space-y-8">
      <div className="grid gap-5 md:grid-cols-3">
        <div className="panel rounded-[1.8rem] p-5">
          <p className="stat-label">Saved shortlist</p>
          <p className="stat-value">{hasHydrated ? savedPropertyIds.length : 0}</p>
          <p className="stat-hint">Properties you marked to revisit later.</p>
        </div>
        <div className="panel rounded-[1.8rem] p-5">
          <p className="stat-label">Recent views</p>
          <p className="stat-value">{hasHydrated ? recentCount : 0}</p>
          <p className="stat-hint">Listings you explored in the current browser.</p>
        </div>
        <div className="panel rounded-[1.8rem] p-5">
          <p className="stat-label">Smart brief</p>
          <p className="mt-3 text-2xl font-semibold text-[var(--brand-blue)]">
            {matchProfile.goal.replace("_", " ").toLowerCase()}
          </p>
          <p className="stat-hint">Your current recommendation strategy.</p>
        </div>
      </div>

      {savedProperties.length ? (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
              Shortlist
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-blue)]">Saved properties worth revisiting</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
            AI recommendations
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-blue)]">Fresh matches based on your current brief</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {topRecommendations.map((item) => (
            <PropertyCard
              key={item.property.id}
              property={item.property}
              recommendationLabel={item.label}
              matchReasons={item.reasons}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
