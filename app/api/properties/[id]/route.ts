import { AccountApprovalStatus, ListingType, PropertyStatus, PropertyType, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { buildWatermarkedImageUrl } from "@/lib/media";
import { maybeCreatePropertyVideo } from "@/lib/property-video";
import { toSlug } from "@/lib/utils";
import { propertyFormSchema } from "@/lib/validators";

type PropertyRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: PropertyRouteProps) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "You must be logged in to update a property." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = propertyFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid property payload." }, { status: 400 });
  }

  const { id } = await params;

  const [property, currentUser] = await Promise.all([
    prisma.propertyListing.findUnique({
      where: { id },
      select: {
        id: true,
        slug: true,
        createdById: true,
      },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        role: true,
        approvalStatus: true,
      },
    }),
  ]);

  if (!property || !currentUser) {
    return NextResponse.json({ error: "Property or account could not be found." }, { status: 404 });
  }

  const isAdmin = currentUser.role === UserRole.ADMIN;
  const isOwner = property.createdById === session.user.id;
  const approvedSeller =
    (currentUser.role === UserRole.AGENT || currentUser.role === UserRole.LANDLORD) &&
    currentUser.approvalStatus === AccountApprovalStatus.APPROVED;

  if (!isAdmin && !(isOwner && approvedSeller)) {
    return NextResponse.json({ error: "You do not have permission to edit this listing." }, { status: 403 });
  }

  try {
    const payload = parsed.data;
    const nextBaseSlug = toSlug(payload.title);
    const slugOwner = await prisma.propertyListing.findFirst({
      where: {
        slug: nextBaseSlug,
        NOT: {
          id: property.id,
        },
      },
      select: { id: true },
    });
    const slug = slugOwner ? `${nextBaseSlug}-${Date.now()}` : nextBaseSlug;

    const updated = await prisma.propertyListing.update({
      where: { id: property.id },
      data: {
        slug,
        title: payload.title,
        description: payload.description,
        price: payload.price,
        country: payload.country,
        city: payload.city,
        address: payload.address || null,
        latitude: payload.latitude ?? null,
        longitude: payload.longitude ?? null,
        marketCode: payload.marketCode,
        propertyType: payload.propertyType as PropertyType,
        listingType: payload.listingType as ListingType,
        bedrooms: payload.bedrooms ?? null,
        bathrooms: payload.bathrooms ?? null,
        areaSqm: payload.areaSqm ?? null,
        firstHand: payload.firstHand ?? false,
        landlordSelection: payload.landlordSelection || null,
        contactPhone: payload.contactPhone,
        whatsappPhone: payload.whatsappPhone || null,
        isVerified: isAdmin,
        status: isAdmin ? PropertyStatus.PUBLISHED : PropertyStatus.PENDING,
        media: {
          deleteMany: {},
          create: payload.imageUrls.map((imageUrl, index) => ({
            imageUrl: buildWatermarkedImageUrl(imageUrl, payload.title, index),
            sortOrder: index,
          })),
        },
      },
      select: {
        id: true,
        slug: true,
      },
    });

    await maybeCreatePropertyVideo(updated.id, payload.youtubeUrl || null);

    return NextResponse.json(
      {
        property: updated,
        message: isAdmin ? "Listing updated successfully." : "Listing updated and sent for review.",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: "Unable to update property." }, { status: 500 });
  }
}
