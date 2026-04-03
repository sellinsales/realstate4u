"use client";

import { useEngagement } from "@/components/providers/engagement-provider";
import { cn } from "@/lib/utils";

export function SavePropertyButton({
  propertyId,
  className,
  variant = "overlay",
}: {
  propertyId: string;
  className?: string;
  variant?: "overlay" | "inline";
}) {
  const { hasHydrated, savedPropertyIds, toggleSavedProperty } = useEngagement();
  const isSaved = savedPropertyIds.includes(propertyId);

  return (
    <button
      type="button"
      aria-pressed={isSaved}
      onClick={() => toggleSavedProperty(propertyId)}
      className={cn(
        variant === "overlay"
          ? "pill border-white/20 bg-white/88 text-[var(--brand-blue)] shadow-sm"
          : "btn-secondary",
        isSaved && "border-transparent bg-[var(--brand-blue)] text-white",
        className,
      )}
    >
      {hasHydrated ? (isSaved ? "Saved" : "Save") : "Save"}
    </button>
  );
}
