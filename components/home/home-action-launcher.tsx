import Link from "next/link";
import { NavIcon } from "@/components/ui/nav-icon";

const launcherItems = [
  {
    href: "/properties?listingType=BUY",
    title: "Buy property",
    description: "Open homes, plots, and commercial inventory for sale.",
    icon: "search" as const,
  },
  {
    href: "/properties?listingType=RENT",
    title: "Rent property",
    description: "Jump straight into rental apartments, homes, and rooms.",
    icon: "queue" as const,
  },
  {
    href: "/properties?propertyType=PLOT",
    title: "Plots and land",
    description: "Compare residential and investment plots without extra steps.",
    icon: "plan" as const,
  },
  {
    href: "/sell",
    title: "Sell or list",
    description: "Publish a sale or rent listing through the guided wizard.",
    icon: "list" as const,
  },
  {
    href: "/smart-match",
    title: "Smart Match",
    description: "Shortlist stronger property fits from your budget and brief.",
    icon: "spark" as const,
  },
] as const;

export function HomeActionLauncher() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {launcherItems.map((item) => (
        <Link key={item.href} href={item.href} className="panel home-launcher-card">
          <span className="home-launcher-icon">
            <NavIcon name={item.icon} className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="home-launcher-title">{item.title}</p>
            <p className="home-launcher-copy">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
