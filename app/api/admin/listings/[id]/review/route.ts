import { PropertyStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { getAppUrl } from "@/lib/runtime-url";

type ReviewRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: ReviewRouteProps) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  if (!process.env.DATABASE_URL || session.user.id.startsWith("demo-")) {
    return NextResponse.redirect(getAppUrl("/admin?mode=demo", request.url), 303);
  }

  const formData = await request.formData();
  const decision = String(formData.get("decision") || "");
  const { id } = await params;

  if (!["approve", "reject"].includes(decision)) {
    return NextResponse.json({ error: "Invalid review decision." }, { status: 400 });
  }

  await prisma.propertyListing.update({
    where: { id },
    data: {
      isVerified: decision === "approve",
      status: decision === "approve" ? PropertyStatus.PUBLISHED : PropertyStatus.REJECTED,
    },
  });

  return NextResponse.redirect(getAppUrl("/admin?reviewed=1", request.url), 303);
}
