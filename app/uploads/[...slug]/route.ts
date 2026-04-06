import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getLocalUploadsRoot } from "@/lib/upload-storage";

export const runtime = "nodejs";

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function isSafeSegment(value: string) {
  return /^[a-zA-Z0-9._-]+$/.test(value);
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await context.params;

  if (!slug.length || slug.length > 2 || slug.some((segment) => !isSafeSegment(segment))) {
    return new NextResponse("Not found", { status: 404 });
  }

  const absolutePath = path.join(getLocalUploadsRoot(), ...slug);

  try {
    const fileBuffer = await readFile(absolutePath);
    const extension = path.extname(absolutePath).toLowerCase();

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentTypes[extension] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
