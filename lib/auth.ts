import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { AccountApprovalStatus, UserRole } from "@prisma/client";
import { hasAccountSecuritySchema, normalizeEmail, shouldRequireEmailVerification } from "@/lib/account-security";
import { prisma } from "@/lib/db/prisma";
import { DEMO_CREDENTIALS } from "@/lib/demo-data";
import { loginSchema } from "@/lib/validators";

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  approvalStatus: AccountApprovalStatus;
};

type CredentialCheckResult =
  | { status: "ok"; user: SessionUser }
  | { status: "invalid" }
  | { status: "unverified"; email: string };

async function authorizeDemoUser(email: string, password: string): Promise<SessionUser | null> {
  const demoUser = DEMO_CREDENTIALS.find(
    (candidate) => candidate.email === email && candidate.password === password,
  );

  if (!demoUser) {
    return null;
  }

  return {
    id: `demo-${demoUser.role.toLowerCase()}`,
    email: demoUser.email,
    name: demoUser.name,
    role: demoUser.role as UserRole,
    approvalStatus: AccountApprovalStatus.APPROVED,
  };
}

export async function validateCredentials(email: string, password: string): Promise<CredentialCheckResult> {
  const normalizedEmail = normalizeEmail(email);

  if (!process.env.DATABASE_URL) {
    const demoUser = await authorizeDemoUser(normalizedEmail, password);
    return demoUser ? { status: "ok", user: demoUser } : { status: "invalid" };
  }

  const supportsAccountSecurity = await hasAccountSecuritySchema();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      approvalStatus: true,
      profile: {
        select: {
          name: true,
        },
      },
      ...(supportsAccountSecurity ? { emailVerifiedAt: true } : {}),
    },
  });

  if (!user) {
    return { status: "invalid" };
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    return { status: "invalid" };
  }

  if (supportsAccountSecurity && shouldRequireEmailVerification() && !("emailVerifiedAt" in user && user.emailVerifiedAt)) {
    return {
      status: "unverified",
      email: user.email,
    };
  }

  return {
    status: "ok",
    user: {
      id: user.id,
      email: user.email,
      name: user.profile?.name ?? user.email,
      role: user.role,
      approvalStatus: user.approvalStatus,
    },
  };
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "realstate4u-development-secret",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        try {
          const result = await validateCredentials(parsed.data.email, parsed.data.password);
          return result.status === "ok" ? result.user : null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.approvalStatus = user.approvalStatus;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as UserRole | undefined) ?? UserRole.USER;
        session.user.approvalStatus =
          (token.approvalStatus as AccountApprovalStatus | undefined) ?? AccountApprovalStatus.APPROVED;
        session.user.name = typeof token.name === "string" ? token.name : session.user.name;
        session.user.email = typeof token.email === "string" ? token.email : session.user.email;
      }

      return session;
    },
  },
};

export function auth() {
  return getServerSession(authOptions);
}
