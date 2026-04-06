import { PrismaClient } from "@prisma/client";
import { isAllowedListingImageUrl } from "../lib/media";

const prisma = new PrismaClient();
const shouldApply = process.argv.includes("--apply");

async function main() {
  const media = await prisma.propertyMedia.findMany({
    select: {
      id: true,
      imageUrl: true,
      propertyId: true,
      property: {
        select: {
          slug: true,
          title: true,
        },
      },
    },
    orderBy: [
      { propertyId: "asc" },
      { sortOrder: "asc" },
    ],
  });

  const invalidMedia = media.filter((item) => !isAllowedListingImageUrl(item.imageUrl));

  if (!invalidMedia.length) {
    console.log("No invalid property media found.");
    return;
  }

  console.log(`Found ${invalidMedia.length} invalid media record(s).`);
  invalidMedia.forEach((item) => {
    console.log(`${item.id} | ${item.property.slug} | ${item.imageUrl}`);
  });

  if (!shouldApply) {
    console.log("Dry run only. Re-run with --apply to delete these records.");
    return;
  }

  const result = await prisma.propertyMedia.deleteMany({
    where: {
      id: {
        in: invalidMedia.map((item) => item.id),
      },
    },
  });

  console.log(`Deleted ${result.count} invalid media record(s).`);
}

main()
  .catch((error) => {
    console.error("Failed to clean invalid property media.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
