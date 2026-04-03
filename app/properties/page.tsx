import { PropertyCard } from "@/components/property/property-card";
import { RecommendedPropertyGrid } from "@/components/smart/recommended-property-grid";
import { SearchFilters } from "@/components/property/search-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getProperties } from "@/lib/data";
import type { PropertyFilters } from "@/lib/types";
import { readSearchParam } from "@/lib/utils";

type PropertiesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
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

  const properties = await getProperties(filters);
  const allProperties = await getProperties();

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Property search"
          title="Search verified and incoming inventory across Sweden, EU, and Pakistan."
          description="Filter by market, location, price, and listing type to move between Sweden queue rentals, EU homes, and Pakistan lead-first listings."
        />

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
