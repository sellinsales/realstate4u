import type { AccountApprovalStatus, UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: UserRole;
      approvalStatus: AccountApprovalStatus;
    };
  }

  interface User {
    role: UserRole;
    approvalStatus: AccountApprovalStatus;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    approvalStatus?: AccountApprovalStatus;
    name?: string | null;
    email?: string | null;
  }
}
