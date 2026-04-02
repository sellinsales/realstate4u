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

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { message?: string; error?: string };
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Unable to create account.");
      return;
    }

    setMessage(data.message || "Account created.");
    setTimeout(() => {
      router.push("/login?registered=1");
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit} className="panel space-y-4 rounded-[2rem] p-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[var(--brand-blue)]">
          Full name
        </label>
        <input id="name" name="name" className="field" required />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[var(--brand-blue)]">
          Email
        </label>
        <input id="email" name="email" type="email" className="field" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[var(--brand-blue)]">
            Phone
          </label>
          <input id="phone" name="phone" className="field" required />
        </div>
        <div>
          <label htmlFor="country" className="mb-2 block text-sm font-semibold text-[var(--brand-blue)]">
            Country
          </label>
          <input id="country" name="country" className="field" required />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[var(--brand-blue)]">
          Password
        </label>
        <input id="password" name="password" type="password" className="field" required minLength={6} />
      </div>
      {message ? <p className="text-sm font-medium text-[var(--brand-green-deep)]">{message}</p> : null}
      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
