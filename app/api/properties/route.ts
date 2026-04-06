import { HousingQueueType, ListingType, PropertyStatus, PropertyType } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getProperties } from "@/lib/data";
import { prisma } from "@/lib/db/prisma";
import { buildWatermarkedImageUrl } from "@/lib/media";
import { maybeCreatePropertyVideo } from "@/lib/property-video";
import { toSlug } from "@/lib/utils";
import { propertyFormSchema } from "@/lib/validators";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const properties = await getProperties({
    country: url.searchParams.get("country") || undefined,
    city: url.searchParams.get("city") || undefined,
    listingType: url.searchParams.get("listingType") || undefined,
    propertyType: url.searchParams.get("propertyType") || undefined,
    marketCode:
      (url.searchParams.get("marketCode") as "SWEDEN" | "EU" | "PAKISTAN" | null) || undefined,
    maxPrice: url.searchParams.get("maxPrice")
      ? Number(url.searchParams.get("maxPrice"))
      : undefined,
  });

  return NextResponse.json({ properties });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "You must be logged in to post a property." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = propertyFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid property payload." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL || session.user.id.startsWith("demo-")) {
    return NextResponse.json(
      {
        error: "Live listing storage is unavailable. Sign in with a database-backed account to publish listings.",
      },
      { status: 503 },
    );
  }

  try {
    const payload = parsed.data;
    const baseSlug = toSlug(payload.title);
    const existing = await prisma.propertyListing.findUnique({
      where: { slug: baseSlug },
      select: { id: true },
    });
    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    const property = await prisma.propertyListing.create({
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
        createdById: session.user.id,
        isVerified: false,
        status: PropertyStatus.PENDING,
        media: {
          create: payload.imageUrls.map((imageUrl, index) => ({
            imageUrl: buildWatermarkedImageUrl(imageUrl, payload.title, index),
            sortOrder: index,
          })),
        },
        housingQueue:
          payload.marketCode === "SWEDEN" && payload.listingType === "RENT"
            ? {
                create: {
                  type: payload.firstHand ? HousingQueueType.QUEUE : HousingQueueType.FIRSTCOME,
                  selectionMethod: payload.landlordSelection || null,
                  selectionNotes: payload.landlordSelection || null,
                },
              }
            : undefined,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    await maybeCreatePropertyVideo(property.id, payload.youtubeUrl || null);

    return NextResponse.json({ property }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create property." }, { status: 500 });
  }
}
