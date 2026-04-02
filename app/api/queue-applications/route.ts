import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { queueApplicationSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Log in before applying to a queue." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = queueApplicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid application payload." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL || session.user.id.startsWith("demo-")) {
    return NextResponse.json(
      {
        message: "Queue application accepted in demo mode. Connect PostgreSQL for persistence.",
        demoMode: true,
      },
      { status: 200 },
    );
  }

  try {
    await prisma.housingApplication.create({
      data: {
        propertyId: parsed.data.propertyId,
        userId: session.user.id,
        note: parsed.data.note || null,
      },
    });

    return NextResponse.json({ message: "Queue application submitted." }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Application already exists or could not be created." },
      { status: 409 },
    );
  }
}
