import { PropertyCard } from "@/components/property/property-card";
import { auth } from "@/lib/auth";
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
        <div>
          <span className="eyebrow">Dashboard listings</span>
          <h1 className="mt-5 text-5xl font-semibold text-[var(--brand-blue)]">Your most recent property records.</h1>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {snapshot.listings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
