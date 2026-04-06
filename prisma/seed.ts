import "dotenv/config";
import { hash } from "bcryptjs";
import {
  AccountApprovalStatus,
  HousingApplicationStatus,
  HousingQueueType,
  ListingType,
  PrismaClient,
  PropertyStatus,
  PropertyType,
  UserRole,
} from "@prisma/client";
import { DEMO_CREDENTIALS, DEMO_PROPERTIES } from "@/lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  const userMap = new Map<string, string>();

  for (const account of DEMO_CREDENTIALS) {
    const password = await hash(account.password, 10);

    const user = await prisma.user.upsert({
      where: { email: account.email },
      update: {
        password,
        role: account.role as UserRole,
        approvalStatus: AccountApprovalStatus.APPROVED,
        approvedAt: new Date(),
        profile: {
          upsert: {
            create: {
              name: account.name,
              phone: account.phone,
              country: account.country,
              city: account.city,
            },
            update: {
              name: account.name,
              phone: account.phone,
              country: account.country,
              city: account.city,
            },
          },
        },
      },
      create: {
        email: account.email,
        password,
        role: account.role as UserRole,
        approvalStatus: AccountApprovalStatus.APPROVED,
        approvedAt: new Date(),
        profile: {
          create: {
            name: account.name,
            phone: account.phone,
            country: account.country,
            city: account.city,
          },
        },
      },
    });

    userMap.set(account.role, user.id);
  }

  for (const property of DEMO_PROPERTIES) {
    const ownerRole = property.marketCode === "PAKISTAN" ? "AGENT" : "LANDLORD";
    const createdById = userMap.get(ownerRole) ?? userMap.get("ADMIN");

    if (!createdById) {
      throw new Error("Seed owner not found");
    }

    await prisma.propertyListing.upsert({
      where: { slug: property.slug },
      update: {
        title: property.title,
        description: property.description,
        price: property.price,
        country: property.country,
        city: property.city,
        address: property.address,
        latitude: property.latitude,
        longitude: property.longitude,
        propertyType: property.propertyType as PropertyType,
        listingType: property.listingType as ListingType,
        marketCode: property.marketCode,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        areaSqm: property.areaSqm,
        firstHand: property.firstHand ?? false,
        landlordSelection: property.landlordSelection,
        contactPhone: property.contactPhone,
        whatsappPhone: property.whatsappPhone,
        isVerified: property.isVerified,
        status: property.isVerified ? PropertyStatus.PUBLISHED : PropertyStatus.PENDING,
        createdById,
        media: {
          deleteMany: {},
          create: property.imageUrls.map((imageUrl, index) => ({
            imageUrl,
            sortOrder: index,
          })),
        },
        housingQueue: property.queueType
          ? {
              upsert: {
                create: {
                  type: property.queueType as HousingQueueType,
                  selectionMethod: property.landlordSelection,
                  selectionNotes: property.landlordSelection,
                },
                update: {
                  type: property.queueType as HousingQueueType,
                  selectionMethod: property.landlordSelection,
                  selectionNotes: property.landlordSelection,
                },
              },
            }
          : undefined,
      },
      create: {
        slug: property.slug,
        title: property.title,
        description: property.description,
        price: property.price,
        country: property.country,
        city: property.city,
        address: property.address,
        latitude: property.latitude,
        longitude: property.longitude,
        propertyType: property.propertyType as PropertyType,
        listingType: property.listingType as ListingType,
        marketCode: property.marketCode,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        areaSqm: property.areaSqm,
        firstHand: property.firstHand ?? false,
        landlordSelection: property.landlordSelection,
        contactPhone: property.contactPhone,
        whatsappPhone: property.whatsappPhone,
        isVerified: property.isVerified,
        status: property.isVerified ? PropertyStatus.PUBLISHED : PropertyStatus.PENDING,
        createdById,
        media: {
          create: property.imageUrls.map((imageUrl, index) => ({
            imageUrl,
            sortOrder: index,
          })),
        },
        housingQueue: property.queueType
          ? {
              create: {
                type: property.queueType as HousingQueueType,
                selectionMethod: property.landlordSelection,
                selectionNotes: property.landlordSelection,
              },
            }
          : undefined,
      },
    });
  }

  const stockholm = await prisma.propertyListing.findUnique({
    where: { slug: "sodermalm-queue-apartment" },
  });
  const buyerId = userMap.get("USER");

  if (stockholm && buyerId) {
    await prisma.housingApplication.upsert({
      where: {
        propertyId_userId: {
          propertyId: stockholm.id,
          userId: buyerId,
        },
      },
      update: {
        status: HousingApplicationStatus.PENDING,
        note: "Looking for a long-term rental in central Stockholm.",
      },
      create: {
        propertyId: stockholm.id,
        userId: buyerId,
        status: HousingApplicationStatus.PENDING,
        note: "Looking for a long-term rental in central Stockholm.",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
