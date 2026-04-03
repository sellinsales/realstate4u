import { NextResponse } from "next/server";
import { createPasswordResetEmail, getBaseUrl, hasAccountSecuritySchema, normalizeEmail } from "@/lib/account-security";
import { prisma } from "@/lib/db/prisma";
import { isMailConfigured } from "@/lib/mailer";
import { forgotPasswordSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Password reset is unavailable in demo mode." }, { status: 503 });
  }

  if (!(await hasAccountSecuritySchema())) {
    return NextResponse.json(
      { error: "Password reset will be available after the latest database update is applied." },
      { status: 503 },
    );
  }

  if (!isMailConfigured()) {
    return NextResponse.json({ error: "Password reset email delivery is not configured yet." }, { status: 503 });
  }

  try {
    const email = normalizeEmail(parsed.data.email);
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (user) {
      await createPasswordResetEmail(
        {
          userId: user.id,
          email: user.email,
          name: user.profile?.name,
        },
        getBaseUrl(request),
      );
    }

    return NextResponse.json({
      message: "If an account exists for that email, a password reset link has been sent.",
    });
  } catch {
    return NextResponse.json({ error: "Unable to send a reset link right now." }, { status: 500 });
  }
}
