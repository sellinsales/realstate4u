import Link from "next/link";
import { auth } from "@/lib/auth";
import { getDashboardSnapshot } from "@/lib/data";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const snapshot = await getDashboardSnapshot(session.user.id);

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1 className="mt-5 text-5xl font-semibold text-[var(--brand-blue)]">
              Welcome back, {session.user.email}
            </h1>
          </div>
          <Link href="/dashboard/listings" className="btn-secondary">
            View listings
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Listings</p>
            <p className="mt-3 text-4xl font-semibold text-[var(--brand-blue)]">{snapshot.listingCount}</p>
          </div>
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Leads</p>
            <p className="mt-3 text-4xl font-semibold text-[var(--brand-blue)]">{snapshot.leadCount}</p>
          </div>
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Queue apps</p>
            <p className="mt-3 text-4xl font-semibold text-[var(--brand-blue)]">{snapshot.queueApplications}</p>
          </div>
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Pending review</p>
            <p className="mt-3 text-4xl font-semibold text-[var(--brand-blue)]">{snapshot.pendingReview}</p>
          </div>
        </div>

        <div className="panel rounded-[2rem] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-[var(--brand-blue)]">Recent listings</h2>
            <Link href="/post-property" className="btn-primary">
              Post another
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
