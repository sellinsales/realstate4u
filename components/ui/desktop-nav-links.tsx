"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/components/ui/nav-items";
import { NavIcon } from "@/components/ui/nav-icon";
import { cn } from "@/lib/utils";

export function DesktopNavLinks() {
  const pathname = usePathname();
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {mainNavItems.map((item) => {
        const isActive = item.href
          ? item.href === "/"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`)
          : (item.children?.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`)) ?? false);

        if (item.href) {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn("nav-link", isActive && "nav-link-active")}
            >
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          );
        }

        const open = openLabel === item.label;

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setOpenLabel(item.label)}
            onMouseLeave={() => setOpenLabel((current) => (current === item.label ? null : current))}
          >
            <button
              type="button"
              className={cn("nav-link nav-group-trigger", isActive && "nav-link-active")}
              aria-expanded={open}
              onClick={() => setOpenLabel((current) => (current === item.label ? null : item.label))}
            >
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
              <svg
                className={cn("h-3.5 w-3.5 text-[var(--muted)] transition-transform", open && "rotate-180")}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m4 6 4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {open ? (
              <div className="nav-dropdown">
                {item.children.map((child) => {
                  const childActive = pathname === child.href || pathname.startsWith(`${child.href}/`);

                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn("nav-dropdown-link", childActive && "nav-dropdown-link-active")}
                    >
                      <span className="nav-dropdown-icon">
                        <NavIcon name={child.icon} />
                      </span>
                      <span className="min-w-0">
                        <span className="nav-dropdown-label">{child.label}</span>
                        <span className="nav-dropdown-copy">{child.description}</span>
                      </span>
                      <span className="nav-dropdown-arrow">
                        <NavIcon name="arrow" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
