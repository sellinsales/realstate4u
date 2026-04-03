import { headers } from "next/headers";
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
    maxPrice: readSearchParam(params.maxPrice)
      ? Number(readSearchParam(params.maxPrice))
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
          title="Search verified and incoming inventory with the most relevant market first."
          description="Filter by market, location, price, and listing type while the platform prioritizes the strongest local fit for the visitor."
          size="compact"
        />
        {preferenceCopy && !filters.marketCode ? (
          <div className="status-note status-note-warning">{preferenceCopy}</div>
        ) : null}

        <SearchFilters filters={filters} />

        <RecommendedPropertyGrid
          properties={allProperties}
          title="Smart picks that adapt as you refine the search."
          description="Your brief and shortlist influence which listings stay near the top, even when market filters change."
          limit={3}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {properties.length} listings
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
