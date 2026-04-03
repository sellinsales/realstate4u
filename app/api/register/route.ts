import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import {
  createVerificationEmail,
  getBaseUrl,
  hasAccountSecuritySchema,
  normalizeEmail,
  shouldRequireEmailVerification,
} from "@/lib/account-security";
import { getApiErrorMessage } from "@/lib/api-error";
import { prisma } from "@/lib/db/prisma";
import { registerSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    const normalizedEmail = normalizeEmail(parsed.data.email);
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json({ error: "Email already exists." }, { status: 409 });
    }

    const supportsAccountSecurity = await hasAccountSecuritySchema();
    const requiresVerification = supportsAccountSecurity && shouldRequireEmailVerification();
    const password = await hash(parsed.data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password,
        ...(supportsAccountSecurity ? { emailVerifiedAt: requiresVerification ? null : new Date() } : {}),
        profile: {
          create: {
            name: parsed.data.name,
            phone: parsed.data.phone,
            country: parsed.data.country,
          },
        },
      },
    });

    if (!requiresVerification) {
      return NextResponse.json(
        { message: "Account created successfully. You can sign in now.", verificationRequired: false },
        { status: 201 },
      );
    }

    try {
      await createVerificationEmail(
        {
          userId: user.id,
          email: user.email,
          name: parsed.data.name,
        },
        getBaseUrl(request),
      );

      return NextResponse.json(
        {
          message: "Account created. Check your inbox to confirm the email before signing in.",
          verificationRequired: true,
          email: user.email,
          delivery: "sent",
        },
        { status: 201 },
      );
    } catch {
      return NextResponse.json(
        {
          message:
            "Account created, but the confirmation email could not be sent yet. Use resend confirmation from the login page.",
          verificationRequired: true,
          email: user.email,
          delivery: "pending",
        },
        { status: 201 },
      );
    }
  } catch (error) {
    console.error("Registration failed", error);
    return NextResponse.json(
      { error: getApiErrorMessage(error, "Unable to create account.") },
      { status: 500 },
    );
  }
}
