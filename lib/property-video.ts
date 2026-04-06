import { prisma } from "@/lib/db/prisma";

let propertyVideoSupport: boolean | null = null;

function extractYouTubeId(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      const pathMatch = url.pathname.match(/^\/(embed|shorts)\/([^/?#]+)/);
      return pathMatch?.[2] ?? null;
    }
  } catch {
    return null;
  }

  return null;
}

export function normalizeYouTubeUrl(value?: string | null) {
  const videoId = extractYouTubeId(value);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : undefined;
}

export function getYouTubeEmbedUrl(value?: string | null) {
  const videoId = extractYouTubeId(value);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
}

export async function hasPropertyVideoTable() {
  if (!process.env.DATABASE_URL) {
    return false;
  }

  if (propertyVideoSupport !== null) {
    return propertyVideoSupport;
  }

  try {
    const result = await prisma.$queryRaw<Array<{ TABLE_NAME: string }>>`
      SELECT TABLE_NAME
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'PropertyVideo'
      LIMIT 1
    `;

    propertyVideoSupport = result.length > 0;
  } catch {
    propertyVideoSupport = false;
  }

  return propertyVideoSupport;
}

export async function getPropertyVideoMap(propertyIds: string[]) {
  if (!propertyIds.length || !(await hasPropertyVideoTable())) {
    return new Map<string, string>();
  }

  try {
    const videos = await prisma.propertyVideo.findMany({
      where: {
        propertyId: {
          in: propertyIds,
        },
      },
      select: {
        propertyId: true,
        youtubeUrl: true,
      },
    });

    return new Map<string, string>(
      videos.map((video) => [video.propertyId, normalizeYouTubeUrl(video.youtubeUrl) ?? video.youtubeUrl]),
    );
  } catch {
    return new Map<string, string>();
  }
}

export async function maybeCreatePropertyVideo(propertyId: string, youtubeUrl?: string | null) {
  const normalizedUrl = normalizeYouTubeUrl(youtubeUrl);

  if (!normalizedUrl || !(await hasPropertyVideoTable())) {
    return;
  }

  await prisma.propertyVideo.upsert({
    where: {
      propertyId,
    },
    create: {
      propertyId,
      youtubeUrl: normalizedUrl,
    },
    update: {
      youtubeUrl: normalizedUrl,
    },
  });
}
