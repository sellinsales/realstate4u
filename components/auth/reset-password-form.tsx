"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ResetPasswordFormProps = {
  token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setLoading(false);
      setError("Password confirmation does not match.");
      return;
    }

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    });

    const data = (await response.json().catch(() => null)) as { message?: string; error?: string } | null;
    setLoading(false);

    if (!response.ok) {
      setError(data?.error || "Unable to reset the password.");
      return;
    }

    setMessage(data?.message || "Password updated successfully.");
    setTimeout(() => {
      router.push("/login?reset=1");
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit} className="panel form-panel">
      <div>
        <label htmlFor="resetPassword" className="field-label">
          New password
        </label>
        <input id="resetPassword" name="password" type="password" className="field" required minLength={8} />
      </div>
      <div>
        <label htmlFor="resetConfirmPassword" className="field-label">
          Confirm new password
        </label>
        <input
          id="resetConfirmPassword"
          name="confirmPassword"
          type="password"
          className="field"
          required
          minLength={8}
        />
      </div>
      {message ? <p className="status-note status-note-success">{message}</p> : null}
      {error ? <p className="status-note status-note-error">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Updating password..." : "Update password"}
      </button>
    </form>
  );
}
