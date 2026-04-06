import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { PageIntro } from "@/components/ui/page-intro";
import { getProperties } from "@/lib/data";

export default async function RentPage() {
  const properties = await getProperties({ listingType: "RENT" });

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Rent"
          title="Property for rent"
          description="Open rental apartments, houses, rooms, and queue-ready rental listings."
          size="compact"
          actions={
            <>
              <Link href="/properties?listingType=RENT" className="btn-primary">
                Open full search
              </Link>
              <Link href="/queue-housing" className="btn-secondary">
                Rental Queue
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
