"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/components/ui/nav-items";
import { NavIcon } from "@/components/ui/nav-icon";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  isAuthenticated: boolean;
  isAdmin: boolean;
};

export function MobileMenu({ isAuthenticated, isAdmin }: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="nav-toggle lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div className="mobile-menu-shell lg:hidden" id="mobile-menu">
          <button
            type="button"
            className="absolute inset-0 bg-transparent"
            aria-label="Close menu"
            onClick={closeMenu}
          />

          <div className="mobile-menu-panel">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Navigation</p>
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "mobile-nav-link",
                    (pathname === item.href || pathname.startsWith(`${item.href}/`)) && "mobile-nav-link-active",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <NavIcon name={item.icon} />
                    <span>{item.label}</span>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Account</p>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={closeMenu} className="btn-secondary w-full">
                    Dashboard
                  </Link>
                  {isAdmin ? (
                    <Link href="/admin" onClick={closeMenu} className="btn-secondary w-full">
                      Admin
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn-primary w-full"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeMenu} className="btn-secondary w-full">
                    Sign In
                  </Link>
                  <Link href="/register" onClick={closeMenu} className="btn-primary w-full">
                    Create account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
