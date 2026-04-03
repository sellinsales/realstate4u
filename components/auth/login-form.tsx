"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const preflightResponse = await fetch("/api/auth/preflight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const preflightData = (await preflightResponse.json().catch(() => null)) as
      | { error?: string; code?: string }
      | null;

    if (!preflightResponse.ok) {
      setLoading(false);

      if (preflightData?.code === "EMAIL_NOT_VERIFIED") {
        setError("Confirm your email before signing in. You can resend the confirmation message below.");
        return;
      }

      setError(preflightData?.error || "Invalid credentials. Check your email and password and try again.");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Invalid credentials. Check your email and password and try again.");
      return;
    }

    window.location.assign(result.url || callbackUrl);
  }

  return (
    <form onSubmit={handleSubmit} className="panel form-panel">
      <div>
        <label htmlFor="email" className="field-label">
          Email
        </label>
        <input id="email" name="email" type="email" className="field" required />
      </div>
      <div>
        <label htmlFor="password" className="field-label">
          Password
        </label>
        <input id="password" name="password" type="password" className="field" required />
      </div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-[var(--muted)]">Use your verified marketplace account.</span>
        <Link href="/forgot-password" className="font-semibold text-[var(--brand-blue)]">
          Forgot password?
        </Link>
      </div>
      {error ? <p className="status-note status-note-error">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
