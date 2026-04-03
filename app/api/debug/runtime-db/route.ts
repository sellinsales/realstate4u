import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function maskDatabaseUrl(url?: string) {
  if (!url) {
    return null;
  }

  const match = url.match(/^([a-z]+:\/\/)([^:]+):([^@]+)@([^/]+)\/(.+)$/i);

  if (!match) {
    return "present-but-unparseable";
  }

  return `${match[1]}${match[2]}:***@${match[4]}/${match[5]}`;
}

function isAuthorized(request: Request) {
  const debugToken = request.headers.get("x-debug-token");
  return Boolean(process.env.NEXTAUTH_SECRET && debugToken === process.env.NEXTAUTH_SECRET);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload: Record<string, unknown> = {
    cwd: process.cwd(),
    nodeVersion: process.version,
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    databaseUrlPreview: maskDatabaseUrl(process.env.DATABASE_URL),
    nextAuthUrl: process.env.NEXTAUTH_URL || null,
    authRequireEmailVerification: process.env.AUTH_REQUIRE_EMAIL_VERIFICATION || null,
  };

  try {
    payload.dbPing = await prisma.$queryRawUnsafe("SELECT 1");
  } catch (error) {
    payload.dbPingError = error instanceof Error ? error.message : "Unknown db ping error";
  }

  try {
    payload.userLookup = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
      },
    });
  } catch (error) {
    payload.userLookupError = error instanceof Error ? error.message : "Unknown user lookup error";
  }

  return NextResponse.json(payload);
}
