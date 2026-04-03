import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/property/lead-form";
import { QueueApplyButton } from "@/components/property/queue-apply-button";
import { WhatsAppButton } from "@/components/property/whatsapp-button";
import { PropertyEngagementPanel } from "@/components/smart/property-engagement-panel";
import { RecommendedPropertyGrid } from "@/components/smart/recommended-property-grid";
import { PageIntro } from "@/components/ui/page-intro";
import { SectionHeader } from "@/components/ui/section-header";
import { auth } from "@/lib/auth";
import { getProperties, getPropertyBySlug } from "@/lib/data";
import { MARKET_CONFIG } from "@/lib/markets";
import { formatPrice } from "@/lib/utils";

type PropertyDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  const allProperties = await getProperties();
  const session = await auth();

  if (!property) {
    notFound();
  }

  const market = MARKET_CONFIG[property.marketCode];
  const currency = property.marketCode === "PAKISTAN" ? "PKR" : property.marketCode === "SWEDEN" ? "SEK" : "EUR";
  const loginHref = `/login?callbackUrl=${encodeURIComponent(`/properties/${property.slug}`)}`;

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow={market.label}
          title={property.title}
          description={property.address || `${property.city}, ${property.country}`}
          aside={
            <div className="panel rounded-[1.8rem] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Quick facts
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="pill">{property.listingType.toLowerCase()}</span>
                <span className="pill">{property.propertyType.toLowerCase()}</span>
                {property.queueType ? <span className="pill">{property.queueType.toLowerCase()}</span> : null}
                {property.firstHand ? <span className="pill">first-hand</span> : null}
              </div>
              <div className="mt-5 space-y-2 text-sm leading-7 text-[var(--muted)]">
                <p>Agent: {property.agentName}</p>
                {property.contactPhone ? <p>Phone: {property.contactPhone}</p> : null}
                <p>Market rule: {market.accent}</p>
              </div>
            </div>
          }
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {property.imageUrls.map((imageUrl) => (
                <div key={imageUrl} className="panel overflow-hidden rounded-[1.8rem]">
                  <div className="relative h-64 w-full">
                    <Image
                      src={imageUrl}
                      alt={property.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="panel rounded-[2rem] p-6">
              <SectionHeader
                eyebrow="Property overview"
                title="Listing narrative and operational details."
                description={property.description}
              />
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-[var(--muted)]">
                {property.bedrooms ? <span>{property.bedrooms} bedrooms</span> : null}
                {property.bathrooms ? <span>{property.bathrooms} bathrooms</span> : null}
                {property.areaSqm ? <span>{property.areaSqm} sqm</span> : null}
                {property.firstHand ? <span>First-hand rental</span> : null}
              </div>
              {property.landlordSelection ? (
                <div className="mt-6 rounded-[1.5rem] border border-[var(--brand-line)] bg-white/75 p-4 text-sm leading-7 text-[var(--muted)]">
                  <strong className="text-[var(--brand-blue)]">Landlord selection:</strong> {property.landlordSelection}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-5">
            <div className="panel rounded-[2rem] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--brand-green)]">
                Price
              </p>
              <p className="mt-3 text-4xl font-semibold text-[var(--brand-blue)]">
                {formatPrice(property.price, currency)}
              </p>
              <div className="mt-6 space-y-3 text-sm text-[var(--muted)]">
                <p>Primary contact: {property.marketCode === "PAKISTAN" ? "WhatsApp and direct call" : "Web inquiry and direct call"}</p>
                <p>Verification status: {property.isVerified ? "Verified listing" : "Pending review"}</p>
                {property.leadCount ? <p>Tracked leads: {property.leadCount}</p> : null}
              </div>
              <div className="mt-6 grid gap-3">
                {property.contactPhone ? (
                  <a href={`tel:${property.contactPhone}`} className="btn-secondary w-full">
                    Call contact
                  </a>
                ) : null}
                {property.marketCode === "PAKISTAN" && property.whatsappPhone ? (
                  <WhatsAppButton
                    propertyId={property.id}
                    propertyTitle={property.title}
                    phone={property.whatsappPhone}
                  />
                ) : null}
                {property.marketCode === "SWEDEN" && property.queueType ? (
                  <QueueApplyButton
                    propertyId={property.id}
                    canApply={Boolean(session?.user)}
                    loginHref={loginHref}
                  />
                ) : null}
              </div>
            </div>

            <LeadForm propertyId={property.id} propertyTitle={property.title} />

            <PropertyEngagementPanel property={property} allProperties={allProperties} />

            <div className="panel rounded-[2rem] p-5">
              <p className="form-section-title">Map</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                OpenStreetMap is the default map layer for fast location checks and lightweight listing pages.
              </p>
              {property.latitude && property.longitude ? (
                <Link
                  href={`https://www.openstreetmap.org/?mlat=${property.latitude}&mlon=${property.longitude}#map=14/${property.latitude}/${property.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary mt-4 w-full"
                >
                  Open map
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <RecommendedPropertyGrid
          properties={allProperties}
          title="More listings that fit the same decision path."
          description="These recommendations use your smart brief plus the current listing context to keep the next options relevant."
          excludePropertyId={property.id}
          limit={3}
        />
      </div>
    </main>
  );
}
