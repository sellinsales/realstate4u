import { NextResponse } from "next/server";
import { hasAccountSecuritySchema, resetPasswordWithToken } from "@/lib/account-security";
import { resetPasswordSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = resetPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid password reset payload." }, { status: 400 });
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

  try {
    const result = await resetPasswordWithToken(parsed.data.token, parsed.data.password);

    if (result.status === "success") {
      return NextResponse.json({ message: "Password updated successfully." });
    }

    if (result.status === "expired") {
      return NextResponse.json({ error: "This password reset link has expired." }, { status: 410 });
    }

    return NextResponse.json({ error: "This password reset link is invalid." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Unable to reset the password." }, { status: 500 });
  }
}
