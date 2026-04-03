"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ResendVerificationForm } from "@/components/auth/resend-verification-form";

type VerifyEmailPanelProps = {
  token?: string;
  email?: string;
};

type VerificationState = "idle" | "loading" | "success" | "invalid" | "expired" | "error";

export function VerifyEmailPanel({ token, email = "" }: VerifyEmailPanelProps) {
  const [state, setState] = useState<VerificationState>(token ? "loading" : "invalid");
  const [message, setMessage] = useState<string>(
    token ? "Checking your confirmation link..." : "This email confirmation link is incomplete.",
  );
  const [resolvedEmail, setResolvedEmail] = useState(email);

  useEffect(() => {
    if (!token) {
      return;
    }

    let active = true;
    const verificationToken = token;

    async function verifyToken() {
      const response = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(verificationToken)}`);
      const data = (await response.json().catch(() => null)) as
        | { message?: string; error?: string; email?: string }
        | null;

      if (!active) {
        return;
      }

      if (response.ok) {
        setState("success");
        setMessage(data?.message || "Email confirmed successfully.");
        setResolvedEmail(data?.email || email);
        return;
      }

      if (response.status === 410) {
        setState("expired");
        setMessage(data?.error || "This confirmation link has expired.");
        setResolvedEmail(data?.email || email);
        return;
      }

      if (response.status === 400) {
        setState("invalid");
        setMessage(data?.error || "This confirmation link is invalid.");
        return;
      }

      setState("error");
      setMessage(data?.error || "Unable to confirm the email right now.");
    }

    verifyToken();

    return () => {
      active = false;
    };
  }, [email, token]);

  return (
    <div className="space-y-4">
      <div className="panel rounded-[1.8rem] p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Email confirmation</p>
        <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
          {state === "loading" ? <p>{message}</p> : null}
          {state === "success" ? (
            <>
              <p className="status-note status-note-success">{message}</p>
              <p>
                Your account is now active. Continue to{" "}
                <Link href="/login" className="font-semibold text-[var(--brand-blue)]">
                  sign in
                </Link>
                .
              </p>
            </>
          ) : null}
          {state === "invalid" ? <p className="status-note status-note-error">{message}</p> : null}
          {state === "expired" ? <p className="status-note status-note-warning">{message}</p> : null}
          {state === "error" ? <p className="status-note status-note-error">{message}</p> : null}
        </div>
      </div>

      {state === "expired" || state === "invalid" || state === "error" ? (
        <ResendVerificationForm initialEmail={resolvedEmail} />
      ) : null}
    </div>
  );
}
