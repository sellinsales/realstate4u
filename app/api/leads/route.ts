import { LeadSource } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { leadFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await auth();
  const body = await request.json().catch(() => null);
  const parsed = leadFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead payload." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        message: "Lead captured in demo mode. Connect PostgreSQL to persist inquiries.",
        demoMode: true,
      },
      { status: 200 },
    );
  }

  try {
    await prisma.lead.create({
      data: {
        propertyId: parsed.data.propertyId,
        userId: session?.user && !session.user.id.startsWith("demo-") ? session.user.id : null,
        name: parsed.data.name,
        email: parsed.data.email || null,
        phone: parsed.data.phone || null,
        message: parsed.data.message,
        source: parsed.data.source as LeadSource,
      },
    });

    return NextResponse.json({ message: "Inquiry stored successfully." }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to store inquiry." }, { status: 500 });
  }
}
