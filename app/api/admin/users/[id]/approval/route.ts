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
    return NextResponse.json({ error: "Only admins can review user approvals." }, { status: 403 });
  }

  const formData = await request.formData();
  const decision = String(formData.get("decision") || "").toLowerCase();
  const { id } = await context.params;

  if (!["approve", "reject", "suspend"].includes(decision)) {
    return NextResponse.json({ error: "Invalid approval decision." }, { status: 400 });
  }

  const approvalStatus =
    decision === "approve"
      ? AccountApprovalStatus.APPROVED
      : decision === "reject"
        ? AccountApprovalStatus.REJECTED
        : AccountApprovalStatus.SUSPENDED;

  await prisma.user.update({
    where: { id },
    data: {
      approvalStatus,
      approvedAt: approvalStatus === AccountApprovalStatus.APPROVED ? new Date() : null,
    },
  });

  return NextResponse.redirect(new URL("/admin", request.url));
}
