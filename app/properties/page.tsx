import { PropertyCard } from "@/components/property/property-card";
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

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Property search"
          title="Search across Sweden rentals, EU homes, and Pakistan lead-first listings."
          description="Use the filters to shift between queue-housing rentals, standard buy and rent inventory, and Pakistan listings built around direct agent contact."
        />

        <SearchFilters filters={filters} />

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {properties.length} results
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
            copy="Adjust the market, type, or price filters and try again."
          />
        )}
      </div>
    </main>
  );
}
