import Link from "next/link";
import { HomeActionLauncher } from "@/components/home/home-action-launcher";
import { HomeSearchHero } from "@/components/home/home-search-hero";
import { PropertyCard } from "@/components/property/property-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getFeaturedProperties } from "@/lib/data";

const marketRoutes = [
  {
    title: "Pakistan sale listings",
    description: "Open active homes, plots, and villas for sale with call and WhatsApp-ready contact.",
    href: "/properties?marketCode=PAKISTAN&listingType=BUY",
  },
  {
    title: "Sweden rentals",
    description: "Browse queue-aware apartments and rental homes in Stockholm, Gothenburg, and more.",
    href: "/properties?marketCode=SWEDEN&listingType=RENT",
  },
  {
    title: "EU buy and rent",
    description: "Compare family flats, offices, and cross-market inventory inside one cleaner search route.",
    href: "/properties?marketCode=EU",
  },
] as const;

const sellerActions = [
  {
    title: "Post a sale listing",
    description: "Use the guided wizard with presets, uploads, and validation instead of filling a raw form.",
    href: "/post-property",
  },
  {
    title: "Get matched faster",
    description: "Use Smart Match when you want ranked property options from budget, city, and property goals.",
    href: "/smart-match",
  },
  {
    title: "Register as agent or landlord",
    description: "Create a seller account, get admin approval, then publish live sale and rent inventory.",
    href: "/register",
  },
] as const;

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <main>
      <section className="section-spacing relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-75" aria-hidden="true" />
        <div className="page-shell relative space-y-6">
          <div className="panel rounded-[2rem] p-6 md:p-7">
            <div className="max-w-4xl">
              <span className="eyebrow">Property marketplace</span>
              <h1 className="mt-4 max-w-5xl text-[clamp(1.85rem,3.3vw,2.85rem)] leading-[1.08] font-semibold text-[var(--brand-blue)]">
                Search, buy, rent, and list property without getting lost in extra sections first.
              </h1>
              <p className="mt-4 max-w-3xl text-[0.97rem] leading-8 text-[var(--muted)]">
                Start from live property search, sale listings, rental listings, or seller actions right away.
              </p>
            </div>
            <div className="mt-6">
              <HomeActionLauncher />
            </div>
          </div>

          <HomeSearchHero />
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Featured listings"
            title="Open current property listings from the live marketplace."
            description="Start with a few strong listings, then move into full search when you want more options."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Link href="/properties" className="btn-primary">
              View all listings
            </Link>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Market routes"
            title="Jump straight into the market you want."
            description="Open a market-specific route instead of re-filtering from scratch every time."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {marketRoutes.map((route) => (
              <Link key={route.href} href={route.href} className="panel utility-card">
                <h3 className="utility-card-title">{route.title}</h3>
                <p className="utility-card-copy">{route.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Seller tools"
            title="Everything needed to move listings into the marketplace."
            description="Post inventory, get approval, and help buyers move from search to contact without friction."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {sellerActions.map((action) => (
              <Link key={action.href} href={action.href} className="panel utility-card">
                <h3 className="utility-card-title">{action.title}</h3>
                <p className="utility-card-copy">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
