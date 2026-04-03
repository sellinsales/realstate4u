"use client";

import { useState } from "react";

export function QueueApplyButton({
  propertyId,
  canApply,
  loginHref,
}: {
  propertyId: string;
  canApply: boolean;
  loginHref: string;
}) {
  const [note, setNote] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleApply() {
    setLoading(true);
    setMessage(null);
    setError(null);

    const response = await fetch("/api/queue-applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        propertyId,
        note,
      }),
    });

    const data = (await response.json()) as { message?: string; error?: string };
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Could not submit application.");
      return;
    }

    setMessage(data.message || "Application submitted.");
  }

  if (!canApply) {
    return (
      <a href={loginHref} className="btn-secondary w-full">
        Log in to apply
      </a>
    );
  }

  return (
    <div className="panel form-panel">
      <div>
        <p className="form-section-title">Queue application</p>
        <p className="field-hint">Add context for the landlord shortlist or queue review.</p>
      </div>
      <textarea
        rows={3}
        className="field"
        placeholder="Add a short note about your application"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      {message ? <p className="status-note status-note-success">{message}</p> : null}
      {error ? <p className="status-note status-note-error">{error}</p> : null}
      <button type="button" onClick={handleApply} disabled={loading} className="btn-primary w-full">
        {loading ? "Submitting..." : "Apply to queue"}
      </button>
    </div>
  );
}
