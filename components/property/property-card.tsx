"use client";

import Image from "next/image";
import Link from "next/link";
import { SavePropertyButton } from "@/components/property/save-property-button";
import { getMarketConfig, normalizeMarketCode } from "@/lib/markets";
import type { PropertyCardData } from "@/lib/types";
import { formatPrice, formatRelativeDate } from "@/lib/utils";

export function PropertyCard({
  property,
  recommendationLabel,
  matchReasons,
}: {
  property: PropertyCardData;
  recommendationLabel?: string;
  matchReasons?: string[];
}) {
  const marketCode = normalizeMarketCode(property.marketCode);
  const market = getMarketConfig(property.marketCode);
  const currency = marketCode === "PAKISTAN" ? "PKR" : marketCode === "SWEDEN" ? "SEK" : "EUR";
  const coverImage = property.imageUrls[0] || "/logo-web.png";

  return (
    <article className="panel overflow-hidden rounded-[1.9rem]">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={coverImage}
          alt={property.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="pill border-white/20 bg-[var(--brand-blue)]/80 text-white">{market.label}</span>
          <div className="flex items-center gap-2">
            <span className="pill bg-white/85 text-[var(--brand-blue)]">
              {property.listingType.toLowerCase()}
            </span>
            <SavePropertyButton propertyId={property.id} />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(12,28,40,0.42)] to-transparent" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-green)]">
              {property.city}, {property.country}
            </p>
            <h3 className="mt-2 text-[1.72rem] leading-[1.08] font-semibold text-[var(--brand-blue)]">
              {property.title}
            </h3>
          </div>
          <p className="text-base font-bold text-[var(--brand-green-deep)] md:text-lg">
            {formatPrice(property.price, currency)}
          </p>
        </div>

        <p className="line-clamp-3 text-sm leading-7 text-[var(--muted)]">{property.description}</p>

        {recommendationLabel ? (
          <div className="rounded-[1.4rem] border border-[var(--brand-line)] bg-[var(--surface-soft)] px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
              {recommendationLabel}
            </p>
            {matchReasons?.length ? (
              <ul className="mt-2 space-y-1 text-sm leading-6 text-[var(--muted)]">
                {matchReasons.map((reason) => (
                  <li key={reason}>- {reason}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
          <span className="pill">{property.propertyType.toLowerCase()}</span>
          {property.queueType ? <span className="pill">{property.queueType.toLowerCase()}</span> : null}
          {property.firstHand ? <span className="pill">first-hand</span> : null}
          {marketCode === "PAKISTAN" && property.whatsappPhone ? <span className="pill">whatsapp ready</span> : null}
          {property.isVerified ? <span className="pill">verified listing</span> : <span className="pill">review pending</span>}
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-[var(--muted)]">
          <span>{property.agentName}</span>
          <span>{formatRelativeDate(property.createdAt)}</span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
          {property.bedrooms ? <span>{property.bedrooms} beds</span> : null}
          {property.bathrooms ? <span>{property.bathrooms} baths</span> : null}
          {property.areaSqm ? <span>{property.areaSqm} sqm</span> : null}
          {property.leadCount ? <span>{property.leadCount} leads</span> : null}
        </div>

        <Link href={`/properties/${property.slug}`} className="btn-primary w-full">
          Open listing
        </Link>
      </div>
    </article>
  );
}
