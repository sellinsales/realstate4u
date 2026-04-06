import Link from "next/link";
import { auth } from "@/lib/auth";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getUserListings } from "@/lib/data";

export default async function DashboardListingsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const listings = await getUserListings(session.user.id);

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Dashboard listings"
          title="Manage your property listings"
          description="Open, edit, and monitor the review status of every listing you have already posted."
          actions={
            <Link href="/post-property" className="btn-primary">
              Add new listing
            </Link>
          }
        />
        {listings.length ? (
          <div className="space-y-4">
            {listings.map((property) => {
              const reviewState = property.isVerified
                ? "Verified"
                : property.status === "REJECTED"
                  ? "Rejected"
                  : "Pending review";

              return (
                <section
                  key={property.id}
                  className="panel rounded-[1.7rem] p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-semibold text-[var(--brand-blue)]">
                          {property.title}
                        </h2>
                        <span className="pill">{reviewState}</span>
                        <span className="pill">
                          {property.listingType === "BUY" ? "For sale" : "For rent"}
                        </span>
                        <span className="pill">{property.propertyType.toLowerCase()}</span>
                      </div>
                      <p className="text-sm leading-7 text-[var(--muted)]">
                        {property.city}, {property.country}
                        {property.address ? ` · ${property.address}` : ""}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
                        <span>{property.price.toLocaleString()} asking</span>
                        {property.bedrooms ? <span>{property.bedrooms} beds</span> : null}
                        {property.bathrooms ? <span>{property.bathrooms} baths</span> : null}
                        {property.areaSqm ? <span>{property.areaSqm} sqm</span> : null}
                        <span>{property.leadCount ?? 0} leads</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/properties/${property.slug}`} className="btn-secondary">
                        View listing
                      </Link>
                      <Link href={`/dashboard/listings/${property.id}/edit`} className="btn-primary">
                        Edit listing
                      </Link>
                    </div>
                  </div>
                </section>
              );
            })}
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
