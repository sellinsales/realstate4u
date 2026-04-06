import { AccountApprovalStatus, ListingType, Prisma, PropertyType, UserRole } from "@prisma/client";
import { DEMO_ADMIN, DEMO_DASHBOARD, DEMO_PROPERTIES } from "@/lib/demo-data";
import { prisma } from "@/lib/db/prisma";
import { getPropertyVideoMap } from "@/lib/property-video";
import type { AdminSnapshot, DashboardSnapshot, PropertyCardData, PropertyFilters } from "@/lib/types";

const propertyInclude = {
  media: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  createdBy: {
    include: {
      profile: true,
    },
  },
  housingQueue: true,
  leads: true,
} satisfies Prisma.PropertyListingInclude;

type PropertyRecord = Prisma.PropertyListingGetPayload<{
  include: typeof propertyInclude;
}>;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function mapPropertyRecord(record: PropertyRecord, youtubeUrl?: string): PropertyCardData {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    description: record.description,
    price: Number(record.price),
    country: record.country,
    city: record.city,
    address: record.address ?? undefined,
    marketCode: record.marketCode as PropertyCardData["marketCode"],
    propertyType: record.propertyType,
    listingType: record.listingType,
    bedrooms: record.bedrooms ?? undefined,
    bathrooms: record.bathrooms ?? undefined,
    areaSqm: record.areaSqm ?? undefined,
    firstHand: record.firstHand,
    landlordSelection: record.landlordSelection ?? undefined,
    isVerified: record.isVerified,
    createdAt: record.createdAt.toISOString(),
    agentName: record.createdBy.profile?.name ?? record.createdBy.email,
    contactPhone: record.contactPhone ?? record.createdBy.profile?.phone ?? undefined,
    whatsappPhone: record.whatsappPhone ?? undefined,
    latitude: record.latitude ?? undefined,
    longitude: record.longitude ?? undefined,
    imageUrls: record.media.map((item) => item.imageUrl),
    youtubeUrl,
    queueType: record.housingQueue?.type,
    leadCount: record.leads.length,
  };
}

function filterProperties(properties: PropertyCardData[], filters: PropertyFilters) {
  return properties.filter((property) => {
    const matchesCountry = filters.country
      ? property.country.toLowerCase() === filters.country.toLowerCase()
      : true;
    const matchesCity = filters.city
      ? property.city.toLowerCase() === filters.city.toLowerCase()
      : true;
    const matchesListingType = filters.listingType
      ? property.listingType === filters.listingType
      : true;
    const matchesPropertyType = filters.propertyType
      ? property.propertyType === filters.propertyType
      : true;
    const matchesMinPrice = filters.minPrice ? property.price >= filters.minPrice : true;
    const matchesMarket = filters.marketCode
      ? property.marketCode === filters.marketCode
      : true;
    const matchesPrice = filters.maxPrice ? property.price <= filters.maxPrice : true;
    const matchesArea = filters.minArea ? (property.areaSqm ?? 0) >= filters.minArea : true;
    const matchesBedrooms = filters.bedrooms ? (property.bedrooms ?? 0) >= filters.bedrooms : true;

    return (
      matchesCountry &&
      matchesCity &&
      matchesListingType &&
      matchesPropertyType &&
      matchesMinPrice &&
      matchesMarket &&
      matchesPrice &&
      matchesArea &&
      matchesBedrooms
    );
  });
}

export async function getProperties(filters: PropertyFilters = {}) {
  if (!isDatabaseConfigured()) {
    return filterProperties(DEMO_PROPERTIES, filters);
  }

  try {
    const properties = await prisma.propertyListing.findMany({
      where: {
        country: filters.country || undefined,
        city: filters.city || undefined,
        listingType: filters.listingType
          ? (filters.listingType as ListingType)
          : undefined,
        propertyType: filters.propertyType
          ? (filters.propertyType as PropertyType)
          : undefined,
        marketCode: filters.marketCode || undefined,
        price: filters.minPrice || filters.maxPrice
          ? {
              ...(filters.minPrice ? { gte: filters.minPrice } : {}),
              ...(filters.maxPrice ? { lte: filters.maxPrice } : {}),
            }
          : undefined,
        areaSqm: filters.minArea
          ? {
              gte: filters.minArea,
            }
          : undefined,
        bedrooms: filters.bedrooms
          ? {
              gte: filters.bedrooms,
            }
          : undefined,
      },
      include: propertyInclude,
      orderBy: {
        createdAt: "desc",
      },
    });

    const videoMap = await getPropertyVideoMap(properties.map((property) => property.id));
    return properties.map((property) => mapPropertyRecord(property, videoMap.get(property.id)));
  } catch {
    return filterProperties(DEMO_PROPERTIES, filters);
  }
}

export async function getFeaturedProperties() {
  const properties = await getProperties();
  return properties.slice(0, 3);
}

export async function getPropertyBySlug(slug: string) {
  if (!isDatabaseConfigured()) {
    return DEMO_PROPERTIES.find((property) => property.slug === slug) ?? null;
  }

  try {
    const property = await prisma.propertyListing.findUnique({
      where: { slug },
      include: propertyInclude,
    });

    if (!property) {
      return null;
    }

    const videoMap = await getPropertyVideoMap([property.id]);
    return mapPropertyRecord(property, videoMap.get(property.id));
  } catch {
    return DEMO_PROPERTIES.find((property) => property.slug === slug) ?? null;
  }
}

export async function getQueueHousingListings() {
  const properties = await getProperties({ marketCode: "SWEDEN", listingType: "RENT" });
  return properties.filter((property) => Boolean(property.queueType));
}

export async function getDashboardSnapshot(userId: string): Promise<DashboardSnapshot> {
  if (!isDatabaseConfigured() || userId.startsWith("demo-")) {
    return DEMO_DASHBOARD;
  }

  try {
    const [listingCount, leadCount, queueApplications, pendingReview, listings] = await Promise.all([
      prisma.propertyListing.count({
        where: { createdById: userId },
      }),
      prisma.lead.count({
        where: {
          property: {
            createdById: userId,
          },
        },
      }),
      prisma.housingApplication.count({
        where: {
          property: {
            createdById: userId,
          },
        },
      }),
      prisma.propertyListing.count({
        where: {
          createdById: userId,
          isVerified: false,
        },
      }),
      prisma.propertyListing.findMany({
        where: {
          createdById: userId,
        },
        include: propertyInclude,
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    const videoMap = await getPropertyVideoMap(listings.map((listing) => listing.id));

    return {
      listingCount,
      leadCount,
      queueApplications,
      pendingReview,
      listings: listings.map((listing) => mapPropertyRecord(listing, videoMap.get(listing.id))),
    };
  } catch {
    return DEMO_DASHBOARD;
  }
}

export async function getAdminSnapshot(): Promise<AdminSnapshot> {
  if (!isDatabaseConfigured()) {
    return DEMO_ADMIN;
  }

  try {
    const [pendingListings, verifiedCount, userCount, approvedAgentCount, pendingUsers] = await Promise.all([
      prisma.propertyListing.findMany({
        where: { isVerified: false },
        include: propertyInclude,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.propertyListing.count({
        where: { isVerified: true },
      }),
      prisma.user.count(),
      prisma.user.count({
        where: {
          role: {
            in: [UserRole.AGENT, UserRole.LANDLORD],
          },
          approvalStatus: AccountApprovalStatus.APPROVED,
        },
      }),
      prisma.user.findMany({
        where: {
          role: {
            in: [UserRole.AGENT, UserRole.LANDLORD],
          },
          approvalStatus: AccountApprovalStatus.PENDING,
        },
        select: {
          id: true,
          email: true,
          role: true,
          approvalStatus: true,
          createdAt: true,
          profile: {
            select: {
              name: true,
              phone: true,
              country: true,
              city: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    const videoMap = await getPropertyVideoMap(pendingListings.map((listing) => listing.id));

    return {
      pendingListings: pendingListings.map((listing) => mapPropertyRecord(listing, videoMap.get(listing.id))),
      verifiedCount,
      userCount,
      approvedAgentCount,
      pendingUsers: pendingUsers.map((user) => ({
        id: user.id,
        email: user.email,
        role: user.role,
        approvalStatus: user.approvalStatus,
        createdAt: user.createdAt.toISOString(),
        name: user.profile?.name ?? user.email,
        phone: user.profile?.phone ?? undefined,
        country: user.profile?.country ?? undefined,
        city: user.profile?.city ?? undefined,
      })),
    };
  } catch {
    return DEMO_ADMIN;
  }
}
