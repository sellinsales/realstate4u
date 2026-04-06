import Link from "next/link";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  PostPropertyForm,
  type PropertyFormInitialData,
} from "@/components/property/post-property-form";
import { PageIntro } from "@/components/ui/page-intro";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { getPropertyVideoMap } from "@/lib/property-video";
import { getFriendlyUserName } from "@/lib/utils";

type EditListingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditListingPage({ params }: EditListingPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;
  const property = await prisma.propertyListing.findUnique({
    where: { id },
    include: {
      media: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!property) {
    redirect("/dashboard/listings");
  }

  const isAdmin = session.user.role === UserRole.ADMIN;

  if (!isAdmin && property.createdById !== session.user.id) {
    redirect("/dashboard/listings");
  }

  const videoMap = await getPropertyVideoMap([property.id]);

  const initialData: PropertyFormInitialData = {
    id: property.id,
    slug: property.slug,
    marketCode: property.marketCode as PropertyFormInitialData["marketCode"],
    country: property.country,
    city: property.city,
    title: property.title,
    description: property.description,
    listingType: property.listingType,
    propertyType: property.propertyType,
    price: Number(property.price),
    address: property.address ?? undefined,
    bedrooms: property.bedrooms ?? undefined,
    bathrooms: property.bathrooms ?? undefined,
    areaSqm: property.areaSqm ?? undefined,
    contactPhone: property.contactPhone ?? undefined,
    whatsappPhone: property.whatsappPhone ?? undefined,
    youtubeUrl: videoMap.get(property.id),
    firstHand: property.firstHand,
    landlordSelection: property.landlordSelection ?? undefined,
    latitude: property.latitude ?? undefined,
    longitude: property.longitude ?? undefined,
    imageUrls: property.media.map((item) => item.imageUrl),
  };

  const friendlyName = getFriendlyUserName(session.user.name, session.user.email);

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Edit listing"
          title="Update your property listing"
          description={`Signed in as ${friendlyName}. Edit the current listing, update media, and submit the refreshed version.`}
          actions={
            <>
              <Link href={`/properties/${property.slug}`} className="btn-secondary">
                View live listing
              </Link>
              <Link href="/dashboard/listings" className="btn-secondary">
                Back to listings
              </Link>
            </>
          }
        />
        <PostPropertyForm
          mode="edit"
          initialData={initialData}
          submitUrl={`/api/properties/${property.id}`}
          submitMethod="PATCH"
          submitLabel="Update listing"
          draftKey={`realstate4u-edit-listing-${property.id}`}
        />
      </div>
    </main>
  );
}
