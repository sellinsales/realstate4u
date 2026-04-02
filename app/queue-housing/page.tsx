import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { getQueueHousingListings } from "@/lib/data";

export default async function QueueHousingPage() {
  const properties = await getQueueHousingListings();

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <div className="max-w-3xl">
          <span className="eyebrow">Sweden queue housing</span>
          <h1 className="mt-5 text-5xl font-semibold text-[var(--brand-blue)]">
            Queue-friendly rental listings with first-hand and second-hand signals.
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            Phase 1 includes a basic application flow, queue type storage, and landlord selection notes.
          </p>
        </div>

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
      </div>
    </main>
  );
}
