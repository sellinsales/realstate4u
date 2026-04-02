import { auth } from "@/lib/auth";
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
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Admin</span>
            <h1 className="mt-5 text-5xl font-semibold text-[var(--brand-blue)]">Listing review and user oversight.</h1>
          </div>
          {demoMode ? (
            <div className="panel rounded-[1.5rem] px-4 py-3 text-sm text-[var(--muted)]">
              Demo mode is active. Review buttons are disabled until PostgreSQL is connected.
            </div>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Pending listings</p>
            <p className="mt-3 text-4xl font-semibold text-[var(--brand-blue)]">{snapshot.pendingListings.length}</p>
          </div>
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Verified listings</p>
            <p className="mt-3 text-4xl font-semibold text-[var(--brand-blue)]">{snapshot.verifiedCount}</p>
          </div>
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Users</p>
            <p className="mt-3 text-4xl font-semibold text-[var(--brand-blue)]">{snapshot.userCount}</p>
          </div>
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
