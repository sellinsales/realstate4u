import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getQueueHousingListings } from "@/lib/data";

export default async function QueueHousingPage() {
  const properties = await getQueueHousingListings();

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Sweden queue housing"
          title="Queue-friendly rental listings with first-hand and second-hand signals."
          description="Queue-aware rentals combine application intake, landlord selection notes, and first-hand versus second-hand context in one flow."
        />

        {properties.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {properties.map((property) => (
              <div key={property.id} className="space-y-4">
                <PropertyCard property={property} />
                <Link href={`/properties/${property.slug}`} className="btn-secondary w-full">
                  Review queue details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            eyebrow="Queue rentals"
            title="No queue-ready rentals are available right now."
            copy="Add Sweden rental listings with queue metadata to activate this route."
            action={
              <Link href="/post-property" className="btn-primary">
                Post a Sweden rental
              </Link>
            }
          />
        )}
      </div>
    </main>
  );
}
