import { auth } from "@/lib/auth";
import { PageIntro } from "@/components/ui/page-intro";
import { StatCard } from "@/components/ui/stat-card";
import { getAdminSnapshot, isDatabaseConfigured } from "@/lib/data";
import { formatRelativeDate, formatUserRole } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const snapshot = await getAdminSnapshot();
  const demoMode = !isDatabaseConfigured();

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Admin"
          title="Review new agents and approve listing inventory."
          description="Keep seller-side access tight, approve trusted agents and landlords, and move the right listings into the live marketplace."
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

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Pending agents" value={snapshot.pendingUsers.length} />
          <StatCard label="Pending listings" value={snapshot.pendingListings.length} />
          <StatCard label="Approved agents" value={snapshot.approvedAgentCount} />
          <StatCard label="Verified listings" value={snapshot.verifiedCount} />
          <StatCard label="Users" value={snapshot.userCount} />
        </div>

        <div className="panel rounded-[2rem] p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--brand-blue)]">Agent and landlord approval queue</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Only approved agents, landlords, and admins can publish sale and rent listings.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {snapshot.pendingUsers.length ? (
              snapshot.pendingUsers.map((user) => (
                <div key={user.id} className="rounded-[1.6rem] border border-[var(--brand-line)] bg-white/78 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-[var(--brand-blue)]">{user.name}</p>
                      <p className="text-sm text-[var(--muted)]">
                        {formatUserRole(user.role)} · {user.email}
                      </p>
                      <p className="text-sm text-[var(--muted)]">
                        {user.city ? `${user.city}, ` : ""}
                        {user.country || "Country not added"} · Joined {formatRelativeDate(user.createdAt)}
                      </p>
                      {user.phone ? <p className="text-sm text-[var(--muted)]">Phone: {user.phone}</p> : null}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <form action={`/api/admin/users/${user.id}/approval`} method="post">
                        <input type="hidden" name="decision" value="approve" />
                        <button type="submit" disabled={demoMode} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                          Approve {formatUserRole(user.role).toLowerCase()}
                        </button>
                      </form>
                      <form action={`/api/admin/users/${user.id}/approval`} method="post">
                        <input type="hidden" name="decision" value="reject" />
                        <button type="submit" disabled={demoMode} className="btn-secondary disabled:cursor-not-allowed disabled:opacity-60">
                          Reject
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.6rem] border border-dashed border-[var(--brand-line)] bg-white/72 p-5 text-sm leading-7 text-[var(--muted)]">
                No agent or landlord approvals are waiting right now.
              </div>
            )}
          </div>
        </div>

        <div className="panel rounded-[2rem] p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--brand-blue)]">Pending listing review queue</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                New listings stay off the live verified inventory until review is complete.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {snapshot.pendingListings.length ? (
              snapshot.pendingListings.map((listing) => (
                <div key={listing.id} className="rounded-[1.6rem] border border-[var(--brand-line)] bg-white/78 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xl font-semibold text-[var(--brand-blue)]">{listing.title}</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {listing.city}, {listing.country} · {listing.agentName}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <form action={`/api/admin/listings/${listing.id}/review`} method="post">
                        <input type="hidden" name="decision" value="approve" />
                        <button type="submit" disabled={demoMode} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                          Approve listing
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
              ))
            ) : (
              <div className="rounded-[1.6rem] border border-dashed border-[var(--brand-line)] bg-white/72 p-5 text-sm leading-7 text-[var(--muted)]">
                No new listings are waiting for moderation right now.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
