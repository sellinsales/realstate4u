"use client";

import { useEffect, useMemo } from "react";
import { SavePropertyButton } from "@/components/property/save-property-button";
import { useEngagement } from "@/components/providers/engagement-provider";
import {
  buildRecommendationReasons,
  recommendProperties,
} from "@/lib/smart-match";
import type { PropertyCardData } from "@/lib/types";

export function PropertyEngagementPanel({
  property,
  allProperties,
}: {
  property: PropertyCardData;
  allProperties: PropertyCardData[];
}) {
  const { matchProfile, rememberProperty } = useEngagement();

  useEffect(() => {
    rememberProperty(property.id);
  }, [property.id, rememberProperty]);

  const reasons = useMemo(
    () => buildRecommendationReasons(property, matchProfile),
    [matchProfile, property],
  );

  const siblingCount = useMemo(
    () => recommendProperties(allProperties, matchProfile, 4, property.id).length,
    [allProperties, matchProfile, property.id],
  );

  return (
    <div className="panel rounded-[2rem] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
            AI guidance
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--brand-blue)]">
            Why this listing stands out
          </h2>
        </div>
        <SavePropertyButton propertyId={property.id} variant="inline" />
      </div>

      <div className="mt-5 space-y-3">
        {reasons.map((reason) => (
          <div
            key={reason}
            className="rounded-[1.4rem] border border-[var(--brand-line)] bg-white/75 px-4 py-3 text-sm leading-7 text-[var(--muted)]"
          >
            {reason}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[1.4rem] border border-[var(--brand-line)] bg-[var(--surface-soft)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
        Your current smart brief also surfaces {siblingCount} similar listings in the same decision path.
      </div>
    </div>
  );
}
