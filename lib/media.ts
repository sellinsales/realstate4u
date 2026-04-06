import { getUploadsPublicBase } from "@/lib/upload-storage";
import { toSlug } from "@/lib/utils";

const allowedRemoteImageHosts = new Set(["images.unsplash.com", "res.cloudinary.com"]);
const allowedUploadExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export function buildListingAssetName(title: string, index: number) {
  const safeSlug = toSlug(title) || "listing";
  return `realstate4u-${safeSlug}-${String(index + 1).padStart(2, "0")}`;
}

function normalizeBasePath(value: string) {
  return value.replace(/\/$/, "");
}

function getUploadsBasePath() {
  const uploadsBase = getUploadsPublicBase();

  if (uploadsBase.startsWith("/")) {
    return normalizeBasePath(uploadsBase);
  }

  try {
    return normalizeBasePath(new URL(uploadsBase).pathname || "/uploads");
  } catch {
    return "/uploads";
  }
}

function hasAllowedUploadExtension(pathname: string) {
  const normalized = pathname.toLowerCase().split("?")[0];
  return [...allowedUploadExtensions].some((extension) => normalized.endsWith(extension));
}

function isConfiguredUploadUrl(imageUrl: string) {
  const uploadsBase = normalizeBasePath(getUploadsPublicBase());
  return uploadsBase.length > 0 && imageUrl.startsWith(`${uploadsBase}/`);
}

function isTrustedLocalUploadUrl(imageUrl: string) {
  if (!imageUrl.startsWith("/")) {
    return false;
  }

  return imageUrl.startsWith(`${getUploadsBasePath()}/`) && hasAllowedUploadExtension(imageUrl);
}

function isTrustedSameOriginUploadUrl(imageUrl: string) {
  let parsed: URL;

  try {
    parsed = new URL(imageUrl);
  } catch {
    return false;
  }

  if (allowedRemoteImageHosts.has(parsed.hostname)) {
    return true;
  }

  if (!hasAllowedUploadExtension(parsed.pathname)) {
    return false;
  }

  if (isConfiguredUploadUrl(imageUrl)) {
    return true;
  }

  const trustedHosts = new Set(["localhost", "127.0.0.1", "realstate4u.com", "www.realstate4u.com"]);
  const appUrl = process.env.NEXTAUTH_URL?.trim();
  if (appUrl) {
    try {
      trustedHosts.add(new URL(appUrl).hostname);
    } catch {}
  }

  if (!trustedHosts.has(parsed.hostname)) {
    return false;
  }

  return parsed.pathname.startsWith(`${getUploadsBasePath()}/`);
}

export function isAllowedListingImageUrl(imageUrl: string) {
  const value = imageUrl.trim();

  if (!value) {
    return false;
  }

  if (value.startsWith("/")) {
    return isTrustedLocalUploadUrl(value);
  }

  return isTrustedSameOriginUploadUrl(value);
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
