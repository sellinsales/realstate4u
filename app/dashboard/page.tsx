import { PersonalizedDashboardPanel } from "@/components/dashboard/personalized-dashboard-panel";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { PageIntro } from "@/components/ui/page-intro";
import { StatCard } from "@/components/ui/stat-card";
import { getDashboardSnapshot, getProperties } from "@/lib/data";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const snapshot = await getDashboardSnapshot(session.user.id);
  const allProperties = await getProperties();

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Dashboard"
          title={`Welcome back, ${session.user.email}`}
          description="Track listing volume, lead flow, review status, and queue applications from one operator view."
          actions={
            <>
              <Link href="/dashboard/listings" className="btn-secondary">
                View listings
              </Link>
              <Link href="/post-property" className="btn-primary">
                Post another
              </Link>
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-4">
          <StatCard label="Listings" value={snapshot.listingCount} />
          <StatCard label="Leads" value={snapshot.leadCount} />
          <StatCard label="Queue apps" value={snapshot.queueApplications} />
          <StatCard label="Pending review" value={snapshot.pendingReview} />
        </div>

        <PersonalizedDashboardPanel properties={allProperties} />

        <div className="panel rounded-[2rem] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-[var(--brand-blue)]">Recent listings</h2>
            <Link href="/properties" className="btn-secondary">
              Explore marketplace
            </Link>
          </div>
          <div className="mt-6 space-y-4">
            {snapshot.listings.map((listing) => (
              <div key={listing.id} className="flex flex-col gap-3 rounded-[1.5rem] border border-[var(--brand-line)] bg-white/75 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-[var(--brand-blue)]">{listing.title}</p>
                  <p className="text-sm text-[var(--muted)]">
                    {listing.city}, {listing.country}
                  </p>
                </div>
                <Link href={`/properties/${listing.slug}`} className="btn-secondary">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
