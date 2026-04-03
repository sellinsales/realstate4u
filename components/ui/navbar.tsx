import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { DesktopNavLinks } from "@/components/ui/desktop-nav-links";
import { MarketPulseStrip } from "@/components/ui/market-pulse-strip";
import { LogoutButton } from "@/components/ui/logout-button";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { MARKET_FLASHES } from "@/lib/community-data";

export async function Navbar() {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--brand-line)] bg-white/82 backdrop-blur-2xl">
      <MarketPulseStrip items={MARKET_FLASHES} />
      <div className="page-shell flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="brand-lockup" aria-label="RealState4U home">
            <span className="brand-mark-shell">
              <Image
                src="/logo-mark.png"
                alt=""
                width={126}
                height={154}
                priority
                className="brand-mark"
              />
            </span>
            <span className="brand-copy">
              <span className="brand-name">RealState4U</span>
              <span className="brand-tag">Cross-market property operations</span>
            </span>
          </Link>
          <DesktopNavLinks />
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="btn-secondary">
                Dashboard
              </Link>
              {isAdmin ? (
                <Link href="/admin" className="btn-secondary">
                  Admin
                </Link>
              ) : null}
              <div className="hidden rounded-full border border-[var(--brand-line)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--brand-blue)] md:block">
                {session.user.email}
              </div>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary">
                Log in
              </Link>
              <Link href="/register" className="btn-primary hidden sm:inline-flex">
                Create account
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {session?.user ? (
            <Link href="/dashboard" className="btn-secondary px-4 py-3 text-sm">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="btn-secondary px-4 py-3 text-sm">
              Log in
            </Link>
          )}
          <MobileMenu isAuthenticated={Boolean(session?.user)} isAdmin={isAdmin} />
        </div>
      </div>
    </header>
  );
}
