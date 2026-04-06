import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { PageIntro } from "@/components/ui/page-intro";
import { getProperties } from "@/lib/data";

export default async function BuyPage() {
  const properties = await getProperties({ listingType: "BUY" });

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Buy"
          title="Property for sale"
          description="Browse homes, plots, villas, and commercial property currently available for sale."
          size="compact"
          actions={
            <>
              <Link href="/properties?listingType=BUY" className="btn-primary">
                Open full search
              </Link>
              <Link href="/plot-finder" className="btn-secondary">
                Plot Finder
              </Link>
            </>
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
