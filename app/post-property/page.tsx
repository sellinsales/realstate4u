import Link from "next/link";
import { AccountApprovalStatus, UserRole } from "@prisma/client";
import { PostPropertyForm } from "@/components/property/post-property-form";
import { PageIntro } from "@/components/ui/page-intro";
import { auth } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/data";
import { prisma } from "@/lib/db/prisma";
import { canPublishListings, formatUserRole, getFriendlyUserName } from "@/lib/utils";

export default async function PostPropertyPage() {
  const session = await auth();
  let liveUser: { role: UserRole; approvalStatus: AccountApprovalStatus } | null = null;

  if (session?.user && isDatabaseConfigured() && !session.user.id.startsWith("demo-")) {
    try {
      liveUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          role: true,
          approvalStatus: true,
        },
      });
    } catch {
      liveUser = null;
    }
  }
  const friendlyName = getFriendlyUserName(session?.user.name, session?.user.email);
  const effectiveRole = liveUser?.role ?? session?.user.role ?? UserRole.USER;
  const effectiveApprovalStatus =
    liveUser?.approvalStatus ?? session?.user.approvalStatus ?? AccountApprovalStatus.APPROVED;
  const canPost = canPublishListings(effectiveRole, effectiveApprovalStatus);
  const isSignedIn = Boolean(session?.user);
  const accountRole = effectiveRole;
  const approvalStatus = effectiveApprovalStatus;

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="New listing"
          title="Post a sale or rent listing through the guided property wizard."
          description={
            isSignedIn
              ? `Signed in as ${friendlyName}. Use presets, uploads, and guided steps to publish faster with fewer errors.`
              : "Sign in as an approved agent, landlord, or admin to add new sale and rent inventory."
          }
          aside={
            <div className="panel rounded-[1.8rem] p-5">
              {canPost ? (
                <>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                    Production checklist
                  </p>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                    <p>Use a clear title, real pricing, and at least one strong uploaded image.</p>
                    <p>Pakistan listings should include a WhatsApp-ready contact number.</p>
                    <p>Sweden rentals can include first-hand signals and queue selection notes.</p>
                  </div>
                </>
              ) : !isSignedIn ? (
                <>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                    Listing access
                  </p>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                    <p>Buyers and renters can browse without limits, but posting is reserved for approved seller-side accounts.</p>
                    <p>Sign in or register as an agent or landlord to start the approval flow.</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                    Listing access
                  </p>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                    <p>
                      Your current account is <span className="font-semibold text-[var(--brand-blue)]">{formatUserRole(accountRole)}</span> with{" "}
                      <span className="font-semibold text-[var(--brand-blue)]">{approvalStatus.toLowerCase()}</span> seller approval status.
                    </p>
                    <p>
                      Only approved agents, landlords, and admins can publish listings. The admin panel must approve your seller access first.
                    </p>
                  </div>
                </>
              )}
            </div>
          }
        />
        {canPost ? (
          <PostPropertyForm />
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="panel rounded-[2rem] p-6">
              <h2 className="text-2xl font-semibold text-[var(--brand-blue)]">Who can post listings?</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                <p>Approved agents can publish sale and rent inventory after admin review.</p>
                <p>Approved landlords can publish directly for their own property inventory.</p>
                <p>Buyer and renter accounts keep search, inquiry, and dashboard access but cannot publish supply-side listings.</p>
              </div>
            </div>
            <div className="panel rounded-[2rem] p-6">
              <h2 className="text-2xl font-semibold text-[var(--brand-blue)]">Next step</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                {!isSignedIn ? (
                  <p>Create an agent or landlord account, then come back here after sign-in.</p>
                ) : approvalStatus === AccountApprovalStatus.PENDING ? (
                  <p>Your seller account is pending review. An admin needs to approve it before posting opens.</p>
                ) : (
                  <p>If you need seller access, register a dedicated agent or landlord account and ask an admin to review it.</p>
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {!isSignedIn ? <Link href="/login" className="btn-secondary">Log in</Link> : null}
                <Link href="/register" className="btn-primary">Create seller account</Link>
                <Link href="/properties" className="btn-secondary">Browse listings</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
