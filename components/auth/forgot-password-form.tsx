"use client";

import { useState } from "react";

export function ForgotPasswordForm() {
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

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = (await response.json().catch(() => null)) as { message?: string; error?: string } | null;
    setLoading(false);

    if (!response.ok) {
      setError(data?.error || "Unable to send a password reset link.");
      return;
    }

    setMessage(data?.message || "If an account exists for that email, a password reset link has been sent.");
  }

  return (
    <form onSubmit={handleSubmit} className="panel form-panel">
      <div>
        <label htmlFor="forgotPasswordEmail" className="field-label">
          Email
        </label>
        <input id="forgotPasswordEmail" name="email" type="email" className="field" required />
      </div>
      {message ? <p className="status-note status-note-success">{message}</p> : null}
      {error ? <p className="status-note status-note-error">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Sending reset link..." : "Send reset link"}
      </button>
    </form>
  );
}
