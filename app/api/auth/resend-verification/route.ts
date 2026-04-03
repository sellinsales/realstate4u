import { NextResponse } from "next/server";
import {
  createVerificationEmail,
  getBaseUrl,
  hasAccountSecuritySchema,
  normalizeEmail,
  shouldRequireEmailVerification,
} from "@/lib/account-security";
import { prisma } from "@/lib/db/prisma";
import { isMailConfigured } from "@/lib/mailer";
import { resendVerificationSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = resendVerificationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Live account verification is not active in demo mode." }, { status: 503 });
  }

  if (!(await hasAccountSecuritySchema())) {
    return NextResponse.json(
      { error: "Account confirmation will be available after the latest database update is applied." },
      { status: 503 },
    );
  }

  if (!shouldRequireEmailVerification()) {
    return NextResponse.json(
      { message: "Email confirmation is not required for this environment." },
      { status: 200 },
    );
  }

  if (!isMailConfigured()) {
    return NextResponse.json(
      { error: "Confirmation email delivery is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const email = normalizeEmail(parsed.data.email);
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({
        message: "If an account exists for that email, a new confirmation message has been sent.",
      });
    }

    if (user.emailVerifiedAt) {
      return NextResponse.json({ message: "This email is already confirmed." });
    }

    await createVerificationEmail(
      {
        userId: user.id,
        email: user.email,
        name: user.profile?.name,
      },
      getBaseUrl(request),
    );

    return NextResponse.json({
      message: "A new confirmation email has been sent.",
    });
  } catch {
    return NextResponse.json({ error: "Unable to resend the confirmation email." }, { status: 500 });
  }
}
