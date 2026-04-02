"use client";

import { useState } from "react";
import { buildWhatsAppUrl } from "@/lib/utils";

export function WhatsAppButton({
  propertyId,
  propertyTitle,
  phone,
}: {
  propertyId: string;
  propertyTitle: string;
  phone: string;
}) {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    void fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        propertyId,
        name: "WhatsApp visitor",
        message: `WhatsApp interest for ${propertyTitle}`,
        source: "WHATSAPP",
      }),
    });

    window.open(buildWhatsAppUrl(phone, propertyTitle), "_blank", "noopener,noreferrer");
    setBusy(false);
  }

  return (
    <button type="button" onClick={handleClick} className="btn-primary w-full" disabled={busy}>
      {busy ? "Opening..." : "Contact on WhatsApp"}
    </button>
  );
}
