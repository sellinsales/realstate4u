"use client";

import { useState } from "react";

type ShareListingPanelProps = {
  title: string;
  city: string;
  country: string;
  shareUrl: string;
};

export function ShareListingPanel({ title, city, country, shareUrl }: ShareListingPanelProps) {
  const [copied, setCopied] = useState(false);
  const shareText = `${title} in ${city}, ${country}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`Take a look at ${shareText} on RealState4U.`);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(`RealState4U listing: ${title}`)}&body=${encodedText}%0A%0A${encodedUrl}`,
    },
  ] as const;

  return (
    <div className="panel rounded-[2rem] p-5">
      <p className="form-section-title">Share listing</p>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        Send this listing to Facebook, WhatsApp, LinkedIn, email, or copy the link for Instagram and other apps.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary px-4 py-3 text-sm"
          >
            {link.label}
          </a>
        ))}
        <button type="button" onClick={handleCopy} className="btn-primary px-4 py-3 text-sm">
          {copied ? "Copied link" : "Copy for Instagram"}
        </button>
      </div>
    </div>
  );
}
