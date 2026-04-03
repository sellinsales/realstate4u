"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PropertyCard } from "@/components/property/property-card";
import { useEngagement } from "@/components/providers/engagement-provider";
import type { PropertyCardData } from "@/lib/types";

export function RecentlyViewedPanel({
  properties,
  title = "Recently viewed",
  description = "Keep returning to the listings you explored most recently.",
}: {
  properties: PropertyCardData[];
  title?: string;
  description?: string;
}) {
  const { hasHydrated, recentPropertyIds } = useEngagement();

  const recentProperties = useMemo(() => {
    if (!recentPropertyIds.length) {
      return [];
    }

    const map = new Map(properties.map((property) => [property.id, property]));
    return recentPropertyIds
      .map((id) => map.get(id))
      .filter((property): property is PropertyCardData => Boolean(property))
      .slice(0, 3);
  }, [properties, recentPropertyIds]);

  if (!hasHydrated || !recentProperties.length) {
    return (
      <div className="panel rounded-[2rem] p-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
          Returning visitors
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-blue)]">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/properties" className="btn-secondary">
            Explore inventory
          </Link>
          <Link href="/smart-match" className="btn-primary">
            Build smart brief
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
          Returning visitors
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-blue)]">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">{description}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {recentProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
