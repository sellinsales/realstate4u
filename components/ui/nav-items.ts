import type { Route } from "next";

export type NavIconName =
  | "home"
  | "search"
  | "spark"
  | "demand"
  | "service"
  | "jobs"
  | "queue"
  | "list"
  | "plan"
  | "project"
  | "guide"
  | "commercial"
  | "plot"
  | "apartment"
  | "villa"
  | "farm"
  | "map"
  | "chart";

export type NavItem = {
  href: Route;
  label: string;
  icon: NavIconName;
};

export const mainNavItems: readonly NavItem[] = [
  { href: "/buy", label: "Buy", icon: "search" },
  { href: "/rent", label: "Rent", icon: "queue" },
  { href: "/projects", label: "Projects", icon: "project" },
  { href: "/area-guides", label: "Area Guides", icon: "guide" },
  { href: "/commercial", label: "Commercial", icon: "commercial" },
  { href: "/plot-finder", label: "Plot Finder", icon: "plot" },
] as const;

export const primaryLinks = [
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/projects", label: "Projects" },
  { href: "/area-guides", label: "Area Guides" },
  { href: "/commercial", label: "Commercial" },
  { href: "/plot-finder", label: "Plot Finder" },
] as const;

export const secondaryLinks = [
  { href: "/post-property", label: "Post Listing" },
  { href: "/login", label: "Sign In" },
  { href: "/register", label: "Create account" },
] as const;
