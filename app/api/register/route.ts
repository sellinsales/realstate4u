import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { AccountApprovalStatus, UserRole } from "@prisma/client";
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
    const role = parsed.data.role as UserRole;
    const approvalStatus =
      role === UserRole.AGENT || role === UserRole.LANDLORD
        ? AccountApprovalStatus.PENDING
        : AccountApprovalStatus.APPROVED;

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password,
        role,
        approvalStatus,
        approvedAt: approvalStatus === AccountApprovalStatus.APPROVED ? new Date() : null,
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
        {
          message:
            approvalStatus === AccountApprovalStatus.PENDING
              ? "Account created. Your agent profile is pending admin approval before you can publish listings."
              : "Account created successfully. You can sign in now.",
          verificationRequired: false,
          approvalPending: approvalStatus === AccountApprovalStatus.PENDING,
        },
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
          message:
            approvalStatus === AccountApprovalStatus.PENDING
              ? "Account created. Confirm the email first, then wait for admin approval before posting listings."
              : "Account created. Check your inbox to confirm the email before signing in.",
          verificationRequired: true,
          approvalPending: approvalStatus === AccountApprovalStatus.PENDING,
          email: user.email,
          delivery: "sent",
        },
        { status: 201 },
      );
    } catch {
      return NextResponse.json(
        {
          message:
            approvalStatus === AccountApprovalStatus.PENDING
              ? "Account created. Email delivery is pending, and your agent profile will still need admin approval before posting."
              : "Account created, but the confirmation email could not be sent yet. Use resend confirmation from the login page.",
          verificationRequired: true,
          approvalPending: approvalStatus === AccountApprovalStatus.PENDING,
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
