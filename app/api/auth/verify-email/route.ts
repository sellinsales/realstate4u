import { NextResponse } from "next/server";
import { hasAccountSecuritySchema, verifyEmailToken } from "@/lib/account-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Email confirmation is unavailable in demo mode." }, { status: 503 });
  }

  if (!(await hasAccountSecuritySchema())) {
    return NextResponse.json(
      { error: "Email confirmation will be available after the latest database update is applied." },
      { status: 503 },
    );
  }

  try {
    const result = await verifyEmailToken(token);

    if (result.status === "success") {
      return NextResponse.json({ message: "Email confirmed successfully.", email: result.email });
    }

    if (result.status === "expired") {
      return NextResponse.json(
        { error: "This confirmation link has expired.", code: "TOKEN_EXPIRED", email: result.email },
        { status: 410 },
      );
    }

    return NextResponse.json(
      { error: "This confirmation link is invalid.", code: "TOKEN_INVALID" },
      { status: 400 },
    );
  } catch {
    return NextResponse.json({ error: "Unable to confirm the email address." }, { status: 500 });
  }
}
