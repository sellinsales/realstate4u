import Image from "next/image";
import Link from "next/link";
import { primaryLinks, secondaryLinks } from "@/components/ui/nav-items";
import { MARKET_CONFIG } from "@/lib/markets";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1.05fr_0.78fr_0.88fr_1fr]">
        <div className="space-y-5">
          <Link href="/" className="brand-lockup" aria-label="RealState4U home">
            <span className="brand-mark-shell">
              <Image
                src="/logo-mark.png"
                alt=""
                width={126}
                height={154}
                className="brand-mark"
              />
            </span>
            <span className="brand-copy">
              <span className="brand-name">RealState4U</span>
              <span className="brand-tag">Search, sell, and rent property</span>
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
            RealState4U keeps the main experience centered on property search, seller-side listing flow, and faster buyer contact.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/properties" className="btn-secondary">
              Search property
            </Link>
            <Link href="/post-property" className="btn-primary">
              List property
            </Link>
          </div>
        </div>

        <div>
          <p className="footer-heading">Explore</p>
          <div className="footer-links">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-heading">Markets</p>
          <div className="space-y-4">
            {Object.entries(MARKET_CONFIG).map(([code, market]) => (
              <div key={code} className="space-y-1">
                <p className="text-sm font-semibold text-[var(--brand-blue)]">{market.label}</p>
                <p className="text-sm leading-6 text-[var(--muted)]">{market.accent}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel rounded-[2rem] p-6">
          <p className="footer-heading">Seller workflow</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
            <p>Approved agents and landlords can move from account setup to posting through the guided listing wizard.</p>
            <p>New listings stay pending until admin review, so the live marketplace stays cleaner for buyers and renters.</p>
          </div>
          <div className="mt-5 footer-links">
            {secondaryLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--brand-line)]">
        <div className="page-shell flex flex-col gap-2 py-5 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>Powered by <a href="https://www.softthinkers.com" target="_blank" rel="noreferrer" className="font-semibold text-[var(--brand-blue)]">SoftThinkers</a></p>
          <a
            href="https://www.softthinkers.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--brand-blue)]"
          >
            www.softthinkers.com
          </a>
        </div>
      </div>
    </footer>
  );
}
