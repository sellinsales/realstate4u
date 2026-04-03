import Image from "next/image";
import Link from "next/link";
import { MARKET_CONFIG } from "@/lib/markets";
import type { PropertyCardData } from "@/lib/types";
import { formatPrice, formatRelativeDate } from "@/lib/utils";

export function PropertyCard({ property }: { property: PropertyCardData }) {
  const market = MARKET_CONFIG[property.marketCode];
  const currency = property.marketCode === "PAKISTAN" ? "PKR" : property.marketCode === "SWEDEN" ? "SEK" : "EUR";

  return (
    <article className="panel overflow-hidden rounded-[2rem]">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.imageUrls[0]}
          alt={property.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="pill border-white/20 bg-[var(--brand-blue)]/80 text-white">{market.label}</span>
          <span className="pill bg-white/85 text-[var(--brand-blue)]">
            {property.listingType.toLowerCase()}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(12,28,40,0.42)] to-transparent" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-green)]">
              {property.city}, {property.country}
            </p>
            <h3 className="mt-2 text-3xl font-semibold text-[var(--brand-blue)]">{property.title}</h3>
          </div>
          <p className="text-lg font-bold text-[var(--brand-green-deep)]">
            {formatPrice(property.price, currency)}
          </p>
        </div>

        <p className="line-clamp-3 text-sm leading-7 text-[var(--muted)]">{property.description}</p>

        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
          <span className="pill">{property.propertyType.toLowerCase()}</span>
          {property.queueType ? <span className="pill">{property.queueType.toLowerCase()}</span> : null}
          {property.firstHand ? <span className="pill">first-hand</span> : null}
          {property.marketCode === "PAKISTAN" && property.whatsappPhone ? <span className="pill">whatsapp ready</span> : null}
          {property.isVerified ? <span className="pill">verified listing</span> : <span className="pill">review pending</span>}
        </div>

        <div className="flex items-center justify-between text-sm text-[var(--muted)]">
          <span>{property.agentName}</span>
          <span>{formatRelativeDate(property.createdAt)}</span>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
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
