import { auth } from "@/lib/auth";
import { PageIntro } from "@/components/ui/page-intro";
import { StatCard } from "@/components/ui/stat-card";
import { getAdminSnapshot, isDatabaseConfigured } from "@/lib/data";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const snapshot = await getAdminSnapshot();
  const demoMode = !isDatabaseConfigured();

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Admin"
          title="Listing review and user oversight."
          description="Moderate incoming listings, verify records, and keep marketplace inventory trustworthy across all markets."
          aside={
            demoMode ? (
              <div className="status-note status-note-warning">
                Demo mode is active. Review actions stay visible, but they will not mutate live records until the database is fully configured.
              </div>
            ) : (
              <div className="status-note status-note-success">
                Live database mode is active for listing verification workflows.
              </div>
            )
          }
        />

        <div className="grid gap-5 md:grid-cols-3">
          <StatCard label="Pending listings" value={snapshot.pendingListings.length} />
          <StatCard label="Verified listings" value={snapshot.verifiedCount} />
          <StatCard label="Users" value={snapshot.userCount} />
        </div>

        <div className="panel rounded-[2rem] p-6">
          <h2 className="text-3xl font-semibold text-[var(--brand-blue)]">Pending review queue</h2>
          <div className="mt-6 space-y-4">
            {snapshot.pendingListings.map((listing) => (
              <div key={listing.id} className="rounded-[1.6rem] border border-[var(--brand-line)] bg-white/78 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xl font-semibold text-[var(--brand-blue)]">{listing.title}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {listing.city}, {listing.country} - {listing.agentName}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <form action={`/api/admin/listings/${listing.id}/review`} method="post">
                      <input type="hidden" name="decision" value="approve" />
                      <button type="submit" disabled={demoMode} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                        Approve
                      </button>
                    </form>
                    <form action={`/api/admin/listings/${listing.id}/review`} method="post">
                      <input type="hidden" name="decision" value="reject" />
                      <button type="submit" disabled={demoMode} className="btn-secondary disabled:cursor-not-allowed disabled:opacity-60">
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
