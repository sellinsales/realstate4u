"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { MarketFlash } from "@/lib/community-data";

export function MarketPulseStrip({ items }: { items: MarketFlash[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [items.length]);

  const active = items[index];

  if (!active) {
    return null;
  }

  return (
    <div className="market-pulse-strip">
      <div className="page-shell flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="market-pulse-tag">{active.tag}</span>
          <p className="market-pulse-copy">{active.title}</p>
        </div>
        <Link href={active.href} className="market-pulse-link">
          Explore
        </Link>
      </div>
    </div>
  );
}
