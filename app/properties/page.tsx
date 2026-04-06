import { headers } from "next/headers";
import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { RecommendedPropertyGrid } from "@/components/smart/recommended-property-grid";
import { SearchFilters } from "@/components/property/search-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getProperties } from "@/lib/data";
import { detectPreferredMarket, getPreferredMarketCopy, prioritizeByMarket } from "@/lib/market-personalization";
import type { PropertyFilters } from "@/lib/types";
import { readSearchParam } from "@/lib/utils";

type PropertiesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const headerStore = await headers();
  const params = await searchParams;
  const filters: PropertyFilters = {
    country: readSearchParam(params.country),
    city: readSearchParam(params.city),
    listingType: readSearchParam(params.listingType),
    propertyType: readSearchParam(params.propertyType),
    marketCode: readSearchParam(params.marketCode) as PropertyFilters["marketCode"],
    minPrice: readSearchParam(params.minPrice)
      ? Number(readSearchParam(params.minPrice))
      : undefined,
    maxPrice: readSearchParam(params.maxPrice)
      ? Number(readSearchParam(params.maxPrice))
      : undefined,
    minArea: readSearchParam(params.minArea)
      ? Number(readSearchParam(params.minArea))
      : undefined,
    bedrooms: readSearchParam(params.bedrooms)
      ? Number(readSearchParam(params.bedrooms))
      : undefined,
  };

  const preferredMarket = detectPreferredMarket(headerStore);
  const preferenceCopy = getPreferredMarketCopy(preferredMarket);
  const properties = filters.marketCode
    ? await getProperties(filters)
    : prioritizeByMarket(await getProperties(filters), preferredMarket, (property) => property.marketCode);
  const allProperties = prioritizeByMarket(await getProperties(), preferredMarket, (property) => property.marketCode);

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Property search"
          title="Search sale and rental inventory with the local market shown first."
          description="Start with the search purpose, then narrow by market, city, property type, and budget. Property search stays focused on listings, while services, jobs, and public demand remain in their own sections."
          actions={
            <>
              <Link href="/post-property" className="btn-primary">
                Post property
              </Link>
              <Link href="/services" className="btn-secondary">
                Need a service team?
              </Link>
            </>
          }
          size="compact"
        />
        {preferenceCopy && !filters.marketCode ? (
          <div className="status-note status-note-warning">{preferenceCopy}</div>
        ) : null}

        <SearchFilters filters={filters} />

        <RecommendedPropertyGrid
          properties={allProperties}
          title="Smart picks that stay aligned with your current search intent."
          description="Saved homes, recent views, and your active filter choices influence which listings stay near the top."
          limit={3}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {properties.length} live property listings
          </p>
        </div>

        {properties.length ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No properties matched those filters."
            copy="Adjust the market, location, or budget filters and try again."
          />
        )}
      </div>
    </main>
  );
}
