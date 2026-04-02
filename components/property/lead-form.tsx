"use client";

import { useState } from "react";

export function LeadForm({
  propertyId,
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      propertyId,
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      source: "WEB",
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { message?: string; error?: string };
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Could not send inquiry.");
      return;
    }

    event.currentTarget.reset();
    setMessage(data.message || `Inquiry sent for ${propertyTitle}.`);
  }

  return (
    <form onSubmit={handleSubmit} className="panel space-y-4 rounded-[2rem] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Your name" className="field" required />
        <input name="phone" placeholder="Phone" className="field" />
      </div>
      <input name="email" type="email" placeholder="Email" className="field" />
      <textarea
        name="message"
        rows={4}
        className="field"
        defaultValue={`I'm interested in ${propertyTitle}. Please share more details.`}
        required
      />
      {message ? <p className="text-sm font-medium text-[var(--brand-green-deep)]">{message}</p> : null}
      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
