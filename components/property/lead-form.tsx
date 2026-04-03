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
    <form onSubmit={handleSubmit} className="panel form-panel">
      <div>
        <p className="form-section-title">Lead capture</p>
        <h2 className="mt-3 text-2xl font-semibold text-[var(--brand-blue)]">Send an inquiry</h2>
        <p className="field-hint">
          Your message is stored against the listing so the owner or agent can qualify interest and follow up.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Full name" className="field" required />
        <input name="phone" placeholder="Phone number" className="field" />
      </div>
      <input name="email" type="email" placeholder="Email address" className="field" />
      <textarea
        name="message"
        rows={4}
        className="field"
        defaultValue={`I'm interested in ${propertyTitle}. Please share more details.`}
        required
      />
      {message ? <p className="status-note status-note-success">{message}</p> : null}
      {error ? <p className="status-note status-note-error">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
