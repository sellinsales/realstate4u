import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { DEMO_CREDENTIALS } from "@/lib/demo-data";
import { loginSchema } from "@/lib/validators";

async function authorizeDemoUser(email: string, password: string) {
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

        const { email, password } = parsed.data;

        if (!process.env.DATABASE_URL) {
          return authorizeDemoUser(email, password);
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true },
          });

          if (!user) {
            return null;
          }

          const isValid = await compare(password, user.password);

          if (!isValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.profile?.name ?? user.email,
            role: user.role,
          };
        } catch {
          return authorizeDemoUser(email, password);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as UserRole | undefined) ?? UserRole.USER;
      }

      return session;
    },
  },
};

export function auth() {
  return getServerSession(authOptions);
}
