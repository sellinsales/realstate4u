"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");
    const email = String(formData.get("email") || "");

    if (password !== confirmPassword) {
      setLoading(false);
      setError("Password confirmation does not match.");
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      message?: string;
      error?: string;
      verificationRequired?: boolean;
      delivery?: string;
      email?: string;
    };
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Unable to create account.");
      return;
    }

    setMessage(data.message || "Account created.");
    setTimeout(() => {
      const params = new URLSearchParams({ registered: "1" });

      if (data.verificationRequired) {
        params.set("verify", "1");
        params.set("email", data.email || email);

        if (data.delivery === "pending") {
          params.set("delivery", "pending");
        }
      }

      router.push(`/login?${params.toString()}`);
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit} className="panel form-panel">
      <div>
        <label htmlFor="name" className="field-label">
          Full name
        </label>
        <input id="name" name="name" className="field" required />
      </div>
      <div>
        <label htmlFor="email" className="field-label">
          Email
        </label>
        <input id="email" name="email" type="email" className="field" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="field-label">
            Phone
          </label>
          <input id="phone" name="phone" className="field" required />
        </div>
        <div>
          <label htmlFor="country" className="field-label">
            Country
          </label>
          <input id="country" name="country" className="field" required />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="field-label">
          Password
        </label>
        <input id="password" name="password" type="password" className="field" required minLength={8} />
        <p className="field-hint">Use at least 8 characters for a production-ready account password.</p>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="field-label">
          Confirm password
        </label>
        <input id="confirmPassword" name="confirmPassword" type="password" className="field" required minLength={8} />
      </div>
      {message ? <p className="status-note status-note-success">{message}</p> : null}
      {error ? <p className="status-note status-note-error">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
