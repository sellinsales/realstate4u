import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid registration payload." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        error: "Registration is temporarily unavailable until the live account database is configured.",
      },
      { status: 503 },
    );
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existing) {
      return NextResponse.json({ error: "Email already exists." }, { status: 409 });
    }

    const password = await hash(parsed.data.password, 10);

    await prisma.user.create({
      data: {
        email: parsed.data.email,
        password,
        profile: {
          create: {
            name: parsed.data.name,
            phone: parsed.data.phone,
            country: parsed.data.country,
          },
        },
      },
    });

    return NextResponse.json({ message: "Account created successfully." }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create account." }, { status: 500 });
  }
}
