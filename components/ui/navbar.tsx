import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { DesktopNavLinks } from "@/components/ui/desktop-nav-links";
import { LogoutButton } from "@/components/ui/logout-button";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { getFriendlyUserName } from "@/lib/utils";

export async function Navbar() {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";
  const friendlyName = session?.user ? getFriendlyUserName(session.user.name, session.user.email) : null;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--brand-line)] bg-white/95 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-5 md:gap-8">
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
              <span className="brand-tag">Property marketplace</span>
            </span>
          </Link>
          <div className="hidden lg:flex">
            <DesktopNavLinks />
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
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
              <div className="hidden rounded-full border border-[var(--brand-line)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--brand-blue)] xl:block">
                Welcome, {friendlyName}
              </div>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary">
                Sign In
              </Link>
              <Link href="/post-property" className="btn-secondary hidden lg:inline-flex">
                Post Listing
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
              Sign In
            </Link>
          )}
          <MobileMenu isAuthenticated={Boolean(session?.user)} isAdmin={isAdmin} />
        </div>
      </div>
    </header>
  );
}
