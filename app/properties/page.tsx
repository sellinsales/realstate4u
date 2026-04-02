import { PropertyCard } from "@/components/property/property-card";
import { SearchFilters } from "@/components/property/search-filters";
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
        <div className="max-w-3xl">
          <span className="eyebrow">Property search</span>
          <h1 className="mt-5 text-5xl font-semibold text-[var(--brand-blue)]">
            Search across Sweden rentals, EU homes, and Pakistan lead-first listings.
          </h1>
        </div>

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
          <div className="panel rounded-[2rem] p-8 text-center text-[var(--muted)]">
            No properties matched those filters.
          </div>
        )}
      </div>
    </main>
  );
}
