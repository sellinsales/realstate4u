"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryLinks } from "@/components/ui/nav-items";
import { cn } from "@/lib/utils";

export function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-2 lg:flex">
      {primaryLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn("nav-link", isActive && "nav-link-active")}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
