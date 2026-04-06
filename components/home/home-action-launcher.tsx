import Link from "next/link";
import { NavIcon } from "@/components/ui/nav-icon";

const launcherItems = [
  {
    href: "/properties",
    title: "Search property",
    description: "Browse homes, plots, offices, and rental listings.",
    icon: "search" as const,
  },
  {
    href: "/post-property",
    title: "Post listing",
    description: "Add a new property through the guided listing wizard.",
    icon: "list" as const,
  },
  {
    href: "/smart-match",
    title: "AI Match",
    description: "Shortlist better property options from your brief.",
    icon: "spark" as const,
  },
  {
    href: "/queue-housing",
    title: "Rental queue",
    description: "Review Sweden rental queue opportunities quickly.",
    icon: "queue" as const,
  },
  {
    href: "/demand-board",
    title: "Demand board",
    description: "Share what you need openly with the market.",
    icon: "demand" as const,
  },
  {
    href: "/services",
    title: "Home services",
    description: "Find movers, maintenance, and support teams.",
    icon: "service" as const,
  },
  {
    href: "/jobs",
    title: "Construction jobs",
    description: "Explore hiring and work opportunities.",
    icon: "jobs" as const,
  },
  {
    href: "/house-designs",
    title: "House plans",
    description: "See layout ideas for marla, kanal, and farmhouse homes.",
    icon: "plan" as const,
  },
] as const;

export function HomeActionLauncher() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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
