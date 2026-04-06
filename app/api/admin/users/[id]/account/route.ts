import { AccountApprovalStatus, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ error: "Only admins can update user accounts." }, { status: 403 });
  }

  const { id } = await context.params;

  if (id === session.user.id) {
    return NextResponse.redirect(new URL("/admin?account=self-blocked", request.url), 303);
  }

  const formData = await request.formData();
  const role = String(formData.get("role") || "") as UserRole;
  let approvalStatus = String(formData.get("approvalStatus") || "") as AccountApprovalStatus;

  if (!Object.values(UserRole).includes(role)) {
    return NextResponse.json({ error: "Invalid account role." }, { status: 400 });
  }

  if (!Object.values(AccountApprovalStatus).includes(approvalStatus)) {
    return NextResponse.json({ error: "Invalid approval status." }, { status: 400 });
  }

  if (role === UserRole.ADMIN) {
    approvalStatus = AccountApprovalStatus.APPROVED;
  }

  await prisma.user.update({
    where: { id },
    data: {
      role,
      approvalStatus,
      approvedAt: approvalStatus === AccountApprovalStatus.APPROVED ? new Date() : null,
    },
  });

  return NextResponse.redirect(new URL("/admin?account=updated", request.url), 303);
}
