"use client";

import { useState } from "react";

type ResendVerificationFormProps = {
  initialEmail?: string;
};

export function ResendVerificationForm({ initialEmail = "" }: ResendVerificationFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");

    const response = await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = (await response.json().catch(() => null)) as { message?: string; error?: string } | null;
    setLoading(false);

    if (!response.ok) {
      setError(data?.error || "Unable to resend the confirmation email.");
      return;
    }

    setMessage(data?.message || "A new confirmation email has been sent.");
  }

  return (
    <form onSubmit={handleSubmit} className="panel form-panel">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Resend confirmation</p>
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
          Use this if the first account confirmation email did not arrive or has expired.
        </p>
      </div>
      <div>
        <label htmlFor="verificationEmail" className="field-label">
          Email
        </label>
        <input
          id="verificationEmail"
          name="email"
          type="email"
          defaultValue={initialEmail}
          className="field"
          required
        />
      </div>
      {message ? <p className="status-note status-note-success">{message}</p> : null}
      {error ? <p className="status-note status-note-error">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-secondary w-full">
        {loading ? "Sending..." : "Resend confirmation email"}
      </button>
    </form>
  );
}
