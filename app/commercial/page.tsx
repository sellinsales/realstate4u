import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getProperties } from "@/lib/data";

export default async function CommercialPage() {
  const properties = await getProperties();
  const commercialListings = properties.filter(
    (property) => property.propertyType === "OFFICE" || property.propertyType === "SHOP",
  );

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Commercial"
          title="Commercial listings"
          description="Explore offices, shops, and business-ready property listings."
          size="compact"
          actions={
            <Link href="/properties" className="btn-primary">
              Open full search
            </Link>
          }
        />
        {commercialListings.length ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {commercialListings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <EmptyState title="No commercial listings yet." copy="Use the main property search while new commercial inventory is added." />
        )}
      </div>
    </main>
  );
}
