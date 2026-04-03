import crypto from "node:crypto";
import { hash as hashPassword } from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { isMailConfigured, sendTransactionalEmail } from "@/lib/mailer";

const EMAIL_VERIFICATION_WINDOW_HOURS = 24;
const PASSWORD_RESET_WINDOW_HOURS = 2;
const SCHEMA_CACHE_TTL_MS = 60_000;

let cachedAccountSecuritySchema:
  | {
      checkedAt: number;
      value: boolean;
    }
  | undefined;

type AccountRecipient = {
  userId: string;
  email: string;
  name?: string | null;
};

function createToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function addHours(hours: number) {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

function parseCount(count: bigint | number) {
  return typeof count === "bigint" ? Number(count) : count;
}

function buildGreeting(name?: string | null) {
  return name?.trim() ? `Hi ${name.trim()},` : "Hi,";
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function shouldRequireEmailVerification() {
  if (process.env.AUTH_REQUIRE_EMAIL_VERIFICATION === "true") {
    return true;
  }

  if (process.env.AUTH_REQUIRE_EMAIL_VERIFICATION === "false") {
    return false;
  }

  return isMailConfigured();
}

export async function hasAccountSecuritySchema() {
  if (!process.env.DATABASE_URL) {
    return false;
  }

  if (
    cachedAccountSecuritySchema &&
    Date.now() - cachedAccountSecuritySchema.checkedAt < SCHEMA_CACHE_TTL_MS
  ) {
    return cachedAccountSecuritySchema.value;
  }

  try {
    const [emailVerifiedColumn] = await prisma.$queryRaw<Array<{ count: bigint | number }>>`
      SELECT COUNT(*) AS count
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'User'
        AND COLUMN_NAME = 'emailVerifiedAt'
    `;
    const [verificationTable] = await prisma.$queryRaw<Array<{ count: bigint | number }>>`
      SELECT COUNT(*) AS count
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'EmailVerificationToken'
    `;
    const [resetTable] = await prisma.$queryRaw<Array<{ count: bigint | number }>>`
      SELECT COUNT(*) AS count
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'PasswordResetToken'
    `;

    const value =
      parseCount(emailVerifiedColumn?.count ?? 0) > 0 &&
      parseCount(verificationTable?.count ?? 0) > 0 &&
      parseCount(resetTable?.count ?? 0) > 0;

    cachedAccountSecuritySchema = {
      checkedAt: Date.now(),
      value,
    };

    return value;
  } catch {
    cachedAccountSecuritySchema = {
      checkedAt: Date.now(),
      value: false,
    };

    return false;
  }
}

export function getBaseUrl(request?: Request) {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL.replace(/\/$/, "");
  }

  if (request) {
    const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
    const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");

    if (forwardedHost) {
      return `${forwardedProto}://${forwardedHost}`;
    }

    const origin = request.headers.get("origin");
    if (origin) {
      return origin.replace(/\/$/, "");
    }
  }

  return "http://localhost:3000";
}

export async function createVerificationEmail(recipient: AccountRecipient, baseUrl: string) {
  const token = createToken();

  await prisma.emailVerificationToken.deleteMany({
    where: { userId: recipient.userId },
  });

  await prisma.emailVerificationToken.create({
    data: {
      userId: recipient.userId,
      tokenHash: hashToken(token),
      expiresAt: addHours(EMAIL_VERIFICATION_WINDOW_HOURS),
    },
  });

  const verificationUrl = `${baseUrl}/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(
    recipient.email,
  )}`;
  const greeting = buildGreeting(recipient.name);

  await sendTransactionalEmail({
    to: recipient.email,
    subject: "Confirm your RealState4U account",
    text: `${greeting}

Confirm your RealState4U account by opening this link:
${verificationUrl}

This confirmation link expires in ${EMAIL_VERIFICATION_WINDOW_HOURS} hours.`,
    html: `<p>${greeting}</p>
<p>Confirm your RealState4U account to activate sign-in, lead tracking, saved searches, and posting tools.</p>
<p><a href="${verificationUrl}">Confirm your account</a></p>
<p>This confirmation link expires in ${EMAIL_VERIFICATION_WINDOW_HOURS} hours.</p>`,
  });
}

export async function createPasswordResetEmail(recipient: AccountRecipient, baseUrl: string) {
  const token = createToken();

  await prisma.passwordResetToken.deleteMany({
    where: { userId: recipient.userId },
  });

  await prisma.passwordResetToken.create({
    data: {
      userId: recipient.userId,
      tokenHash: hashToken(token),
      expiresAt: addHours(PASSWORD_RESET_WINDOW_HOURS),
    },
  });

  const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(
    recipient.email,
  )}`;
  const greeting = buildGreeting(recipient.name);

  await sendTransactionalEmail({
    to: recipient.email,
    subject: "Reset your RealState4U password",
    text: `${greeting}

Reset your RealState4U password by opening this link:
${resetUrl}

This reset link expires in ${PASSWORD_RESET_WINDOW_HOURS} hours. If you did not request it, you can ignore this email.`,
    html: `<p>${greeting}</p>
<p>Use the secure link below to reset your RealState4U password.</p>
<p><a href="${resetUrl}">Reset password</a></p>
<p>This link expires in ${PASSWORD_RESET_WINDOW_HOURS} hours. If you did not request it, you can ignore this email.</p>`,
  });
}

export async function verifyEmailToken(token: string) {
  if (!token) {
    return { status: "invalid" as const };
  }

  const verificationToken = await prisma.emailVerificationToken.findUnique({
    where: { tokenHash: hashToken(token) },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!verificationToken) {
    return { status: "invalid" as const };
  }

  if (verificationToken.expiresAt < new Date()) {
    await prisma.emailVerificationToken.delete({
      where: { id: verificationToken.id },
    });

    return { status: "expired" as const, email: verificationToken.user.email };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: verificationToken.userId },
      data: {
        emailVerifiedAt: new Date(),
      },
    }),
    prisma.emailVerificationToken.deleteMany({
      where: { userId: verificationToken.userId },
    }),
  ]);

  return {
    status: "success" as const,
    email: verificationToken.user.email,
  };
}

export async function resetPasswordWithToken(token: string, password: string) {
  if (!token) {
    return { status: "invalid" as const };
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
    include: {
      user: true,
    },
  });

  if (!resetToken) {
    return { status: "invalid" as const };
  }

  if (resetToken.expiresAt < new Date()) {
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return { status: "expired" as const, email: resetToken.user.email };
  }

  const passwordHash = await hashPassword(password, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: {
        password: passwordHash,
      },
    }),
    prisma.passwordResetToken.deleteMany({
      where: { userId: resetToken.userId },
    }),
  ]);

  return {
    status: "success" as const,
    email: resetToken.user.email,
  };
}
