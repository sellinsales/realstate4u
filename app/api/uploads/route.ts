import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { buildListingAssetName } from "@/lib/media";

export const runtime = "nodejs";

function signUpload(params: Record<string, string | number>, apiSecret: string) {
  const serialized = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto.createHash("sha1").update(`${serialized}${apiSecret}`).digest("hex");
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "You must be logged in to upload images." }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary is not configured yet. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const title = String(formData.get("title") || "listing");
  const index = Number(formData.get("index") || 0);

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Select an image before uploading." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image is too large. Keep files under 8 MB." }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "realstate4u/listings";
  const assetName = buildListingAssetName(title, index);
  const publicId = `${assetName}-${Date.now()}`;
  const signature = signUpload({ folder, public_id: publicId, timestamp }, apiSecret);

  const cloudinaryForm = new FormData();
  cloudinaryForm.append("file", file);
  cloudinaryForm.append("api_key", apiKey);
  cloudinaryForm.append("timestamp", String(timestamp));
  cloudinaryForm.append("folder", folder);
  cloudinaryForm.append("public_id", publicId);
  cloudinaryForm.append("signature", signature);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: cloudinaryForm,
    });

    const data = (await response.json()) as { secure_url?: string; error?: { message?: string } };

    if (!response.ok || !data.secure_url) {
      return NextResponse.json({ error: data.error?.message || "Unable to upload image right now." }, { status: 500 });
    }

    return NextResponse.json({
      imageUrl: data.secure_url,
      assetName,
    });
  } catch {
    return NextResponse.json({ error: "Image upload failed. Please try again." }, { status: 500 });
  }
}
