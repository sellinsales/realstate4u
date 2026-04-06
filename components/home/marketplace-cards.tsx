"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { NavIcon } from "@/components/ui/nav-icon";
import { getMarketConfig, normalizeMarketCode } from "@/lib/markets";
import { buildWatermarkedImageUrl } from "@/lib/media";
import type { PropertyCardData } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function FeaturedListingCard({ property }: { property: PropertyCardData }) {
  const marketCode = normalizeMarketCode(property.marketCode);
  const currency = marketCode === "PAKISTAN" ? "PKR" : marketCode === "SWEDEN" ? "SEK" : "EUR";
  const coverImage = property.imageUrls[0]
    ? buildWatermarkedImageUrl(property.imageUrls[0], property.title, 0)
    : "/logo-web.png";

  return (
    <Link href={`/properties/${property.slug}`} className="market-listing-card">
      <div className="market-listing-media">
        <Image src={coverImage} alt={property.title} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
        <span className="market-listing-price">{formatPrice(property.price, currency)}</span>
      </div>
      <div className="space-y-2 p-3">
        <h3 className="market-card-title">{property.title}</h3>
        <p className="market-card-subtitle">{property.city}, {property.country}</p>
        <div className="market-card-meta">
          {property.bedrooms ? <span>{property.bedrooms} Beds</span> : null}
          {property.bathrooms ? <span>{property.bathrooms} Baths</span> : null}
          {property.areaSqm ? <span>{property.areaSqm} Sqm</span> : null}
        </div>
        <div className="market-card-tags">
          <span className="market-tag">{getMarketConfig(property.marketCode).label}</span>
          <span className={`market-tag ${property.isVerified ? "market-tag-hot" : ""}`}>
            {property.isVerified ? "Verified" : "Pending"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ImageTileCard({
  href,
  title,
  subtitle,
  imageUrl,
  meta,
}: {
  href: Route;
  title: string;
  subtitle: string;
  imageUrl: string;
  meta?: string;
}) {
  return (
    <Link href={href} className="market-tile-card">
      <div className="market-tile-media">
        <Image src={imageUrl} alt={title} fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover" />
      </div>
      <div className="space-y-1.5 p-3">
        <h3 className="market-card-title">{title}</h3>
        <p className="market-card-subtitle">{subtitle}</p>
        {meta ? <p className="market-card-caption">{meta}</p> : null}
      </div>
    </Link>
  );
}

export function IconShortcutCard({
  href,
  label,
  icon,
}: {
  href: Route;
  label: string;
  icon: Parameters<typeof NavIcon>[0]["name"];
}) {
  return (
    <Link href={href} className="market-icon-card">
      <span className="market-icon-shell">
        <NavIcon name={icon} className="h-5 w-5" />
      </span>
      <span className="market-icon-label">{label}</span>
    </Link>
  );
}

export function GuideShortcutCard({
  href,
  title,
  subtitle,
  icon,
}: {
  href: Route;
  title: string;
  subtitle: string;
  icon: Parameters<typeof NavIcon>[0]["name"];
}) {
  return (
    <Link href={href} className="market-guide-card">
      <span className="market-icon-shell market-icon-shell-sm">
        <NavIcon name={icon} className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0">
        <h3 className="market-guide-title">{title}</h3>
        <p className="market-card-caption mt-1">{subtitle}</p>
      </div>
    </Link>
  );
}
