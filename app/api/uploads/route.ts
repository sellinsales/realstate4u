import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { buildListingAssetName } from "@/lib/media";

export const runtime = "nodejs";

const allowedMimeTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/jpg": "jpg",
} as const;

function getUploadDirectory() {
  const customDirectory = process.env.LOCAL_UPLOADS_DIR?.trim();
  return customDirectory
    ? path.resolve(customDirectory)
    : path.join(process.cwd(), "public", "uploads", "listings");
}

function getPublicBasePath() {
  const customBase = process.env.LOCAL_UPLOADS_PUBLIC_BASE?.trim();
  return customBase ? customBase.replace(/\/$/, "") : "/uploads/listings";
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "You must be logged in to upload images." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const title = String(formData.get("title") || "listing");
  const index = Number(formData.get("index") || 0);

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Select an image before uploading." }, { status: 400 });
  }

  const extension = allowedMimeTypes[file.type as keyof typeof allowedMimeTypes];

  if (!extension) {
    return NextResponse.json({ error: "Only JPG, PNG, and WEBP image uploads are allowed." }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image is too large. Keep files under 8 MB." }, { status: 400 });
  }

  const assetName = buildListingAssetName(title, index);
  const finalFileName = `${assetName}-${Date.now()}.${extension}`;
  const uploadDirectory = getUploadDirectory();
  const publicBasePath = getPublicBasePath();

  try {
    await mkdir(uploadDirectory, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDirectory, finalFileName), buffer);

    return NextResponse.json({
      imageUrl: `${publicBasePath}/${finalFileName}`,
      assetName,
    });
  } catch {
    return NextResponse.json({ error: "Image upload failed. Please try again." }, { status: 500 });
  }
}
