import type { Route } from "next";

export type NavChildItem = {
  href: Route;
  label: string;
  description: string;
  icon: "search" | "spark" | "queue" | "list" | "service" | "jobs";
};

export type NavItem =
  | {
      href: Route;
      label: string;
      icon: "home" | "demand" | "spark";
      children?: undefined;
    }
  | {
      href?: undefined;
      label: string;
      icon: "search" | "service";
      children: NavChildItem[];
    };

export const mainNavItems: readonly NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  {
    label: "Search",
    icon: "search",
    children: [
      {
        href: "/properties",
        label: "Property Search",
        description: "Browse homes and commercial listings for sale or rent.",
        icon: "search",
      },
      {
        href: "/smart-match",
        label: "AI Match",
        description: "Get ranked property picks based on your brief and budget.",
        icon: "spark",
      },
      {
        href: "/queue-housing",
        label: "Rental Queue",
        description: "Review queue-ready rental opportunities and application flow.",
        icon: "queue",
      },
      {
        href: "/post-property",
        label: "Post Property",
        description: "Publish a listing and move it into the live marketplace.",
        icon: "list",
      },
    ],
  },
  { href: "/demand-board", label: "Demand Board", icon: "demand" },
  {
    label: "Services",
    icon: "service",
    children: [
      {
        href: "/services",
        label: "Home Services",
        description: "Find movers, maintenance teams, and property support vendors.",
        icon: "service",
      },
      {
        href: "/jobs",
        label: "Construction Jobs",
        description: "Explore hiring needs, site roles, and construction work.",
        icon: "jobs",
      },
    ],
  },
] as const;

export const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Property Search" },
  { href: "/smart-match", label: "AI Match" },
  { href: "/demand-board", label: "Demand Board" },
  { href: "/services", label: "Home Services" },
  { href: "/jobs", label: "Construction Jobs" },
] as const;

export const secondaryLinks = [
  { href: "/post-property", label: "Post property" },
  { href: "/login", label: "Log in" },
  { href: "/register", label: "Create account" },
] as const;
