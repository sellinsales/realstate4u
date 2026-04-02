import Link from "next/link";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/ui/logout-button";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/queue-housing", label: "Queue Housing" },
  { href: "/services", label: "Services" },
  { href: "/jobs", label: "Jobs" },
] as const;

export async function Navbar() {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--brand-line)] bg-white/78 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between gap-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-extrabold uppercase tracking-[0.22em] text-[var(--brand-blue)]">
            RealState4U
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-[var(--muted)] lg:flex">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[var(--brand-blue)]">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="btn-secondary hidden sm:inline-flex">
                Dashboard
              </Link>
              {isAdmin ? (
                <Link href="/admin" className="btn-secondary hidden sm:inline-flex">
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
      </div>
    </header>
  );
}
