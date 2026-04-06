import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getProperties } from "@/lib/data";

export default async function PlotFinderPage() {
  const properties = await getProperties({ propertyType: "PLOT" });

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Plot finder"
          title="Find residential and investment plots faster"
          description="Filter plot inventory by city and price, then move into full property search when needed."
          size="compact"
          actions={
            <Link href="/properties?propertyType=PLOT" className="btn-primary">
              Open full search
            </Link>
          }
        />
        {properties.length ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <EmptyState title="No plot listings matched right now." copy="Try the full property search while new plot inventory is added." />
        )}
      </div>
    </main>
  );
}
