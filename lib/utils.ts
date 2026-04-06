import { clsx, type ClassValue } from "clsx";
import { AccountApprovalStatus, UserRole } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(value: number, currency = "EUR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRelativeDate(input: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(input));
}

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildWhatsAppUrl(phone: string, propertyTitle: string) {
  const message = encodeURIComponent(`I'm interested in ${propertyTitle}`);
  return `https://wa.me/${phone}?text=${message}`;
}

export function readSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function getFriendlyUserName(name?: string | null, email?: string | null) {
  const rawValue = (name || email || "").trim();

  if (!rawValue) {
    return "there";
  }

  const normalized = rawValue.includes("@") ? rawValue.split("@")[0] : rawValue;
  const cleaned = normalized
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "there";
  }

  const firstWord = cleaned.split(" ")[0];
  return firstWord.slice(0, 1).toUpperCase().concat(firstWord.slice(1));
}

export function formatUserRole(role: UserRole) {
  switch (role) {
    case UserRole.AGENT:
      return "Agent";
    case UserRole.LANDLORD:
      return "Landlord";
    case UserRole.ADMIN:
      return "Admin";
    default:
      return "User";
  }
}

export function canPublishListings(role?: UserRole | null, approvalStatus?: AccountApprovalStatus | null) {
  if (!role) {
    return false;
  }

  if (role === UserRole.ADMIN) {
    return true;
  }

  return (
    (role === UserRole.AGENT || role === UserRole.LANDLORD) &&
    approvalStatus === AccountApprovalStatus.APPROVED
  );
}
