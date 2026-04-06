import { toSlug } from "@/lib/utils";

export function buildListingAssetName(title: string, index: number) {
  const safeSlug = toSlug(title) || "listing";
  return `realstate4u-${safeSlug}-${String(index + 1).padStart(2, "0")}`;
}

export function buildWatermarkedImageUrl(imageUrl: string, title: string, index: number) {
  if (!imageUrl.includes("res.cloudinary.com") || !imageUrl.includes("/upload/")) {
    return imageUrl;
  }

  if (imageUrl.includes("l_text:Arial_48_bold:RealState4U")) {
    return imageUrl;
  }

  const assetName = buildListingAssetName(title, index);
  const transformation =
    "c_limit,w_1600/f_auto,q_auto/" +
    `l_text:Arial_48_bold:RealState4U,co_rgb:ffffff,o_62,g_south_east,x_28,y_28/` +
    `l_text:Arial_28:${assetName},co_rgb:ffffff,o_48,g_north_west,x_24,y_24/`;

  return imageUrl.replace("/upload/", `/upload/${transformation}`);
}
