import { PropertyCard } from "@/components/property/property-card";
import { auth } from "@/lib/auth";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getDashboardSnapshot } from "@/lib/data";

export default async function DashboardListingsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const snapshot = await getDashboardSnapshot(session.user.id);

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Dashboard listings"
          title="Your most recent property records."
          description="Use this view to inspect recent listings exactly as they appear inside the marketplace experience."
        />
        {snapshot.listings.length ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {snapshot.listings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <EmptyState
            eyebrow="Listings"
            title="No listings have been posted yet."
            copy="Start by creating the first property record for your account."
          />
        )}
      </div>
    </main>
  );
}
