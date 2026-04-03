import { NextResponse } from "next/server";
import { validateCredentials } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid login payload." }, { status: 400 });
  }

  try {
    const result = await validateCredentials(parsed.data.email, parsed.data.password);

    if (result.status === "ok") {
      return NextResponse.json({ ok: true });
    }

    if (result.status === "unverified") {
      return NextResponse.json(
        {
          error: "Confirm your email before signing in.",
          code: "EMAIL_NOT_VERIFIED",
          email: result.email,
        },
        { status: 403 },
      );
    }

    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Unable to complete sign-in right now." }, { status: 500 });
  }
}
