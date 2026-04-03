import { headers } from "next/headers";
import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { RecommendedPropertyGrid } from "@/components/smart/recommended-property-grid";
import { RecentlyViewedPanel } from "@/components/smart/recently-viewed-panel";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import {
  INVESTMENT_OPPORTUNITIES,
  MARKET_TRENDS,
  OPEN_DEMANDS,
} from "@/lib/community-data";
import { HERO_METRICS, HOME_VERTICALS, OPERATOR_WORKFLOWS, PHASE_NOTES } from "@/lib/demo-data";
import { getFeaturedProperties, getProperties } from "@/lib/data";
import { MARKET_CONFIG } from "@/lib/markets";
import { detectPreferredMarket, getPreferredMarketCopy, prioritizeByMarket } from "@/lib/market-personalization";

export default async function HomePage() {
  let homepageData:
    | {
        preferenceCopy: string | null;
        allProperties: Awaited<ReturnType<typeof getProperties>>;
        featured: Awaited<ReturnType<typeof getFeaturedProperties>>;
        orderedDemands: typeof OPEN_DEMANDS;
        orderedMarketEntries: Array<[keyof typeof MARKET_CONFIG, (typeof MARKET_CONFIG)[keyof typeof MARKET_CONFIG]]>;
        trendLead: (typeof MARKET_TRENDS)[number];
        opportunityLead: (typeof INVESTMENT_OPPORTUNITIES)[number];
        demandLead: (typeof OPEN_DEMANDS)[number];
      }
    | null = null;

  try {
    const headerStore = await headers();
    const preferredMarket = detectPreferredMarket(headerStore);
    const allProperties = prioritizeByMarket(await getProperties(), preferredMarket, (property) => property.marketCode);
    const featured = prioritizeByMarket(await getFeaturedProperties(), preferredMarket, (property) => property.marketCode);
    const orderedTrends = prioritizeByMarket(MARKET_TRENDS, preferredMarket, (item) => item.marketCode);
    const orderedOpportunities = prioritizeByMarket(INVESTMENT_OPPORTUNITIES, preferredMarket, (item) => item.marketCode);
    const orderedDemands = prioritizeByMarket(OPEN_DEMANDS, preferredMarket, (item) => item.marketCode);
    const orderedMarketEntries = prioritizeByMarket(
      Object.entries(MARKET_CONFIG) as Array<
        [keyof typeof MARKET_CONFIG, (typeof MARKET_CONFIG)[keyof typeof MARKET_CONFIG]]
      >,
      preferredMarket,
      ([code]) => code as keyof typeof MARKET_CONFIG,
    );

    homepageData = {
      preferenceCopy: getPreferredMarketCopy(preferredMarket),
      allProperties,
      featured,
      orderedDemands,
      orderedMarketEntries,
      trendLead: orderedTrends[0] ?? MARKET_TRENDS[0],
      opportunityLead: orderedOpportunities[0] ?? INVESTMENT_OPPORTUNITIES[0],
      demandLead: orderedDemands[0] ?? OPEN_DEMANDS[0],
    };
  } catch (error) {
    console.error("Homepage data load failed", error);
  }

  if (!homepageData) {
    return (
      <main className="section-spacing">
        <div className="page-shell space-y-8">
          <section className="page-intro">
            <div className="page-intro-grid page-intro-grid-single">
              <div className="page-intro-copy">
                <span className="eyebrow">Marketplace overview</span>
                <h1 className="page-title page-title-compact">
                  RealState4U is live with property search, account access, and market workflows.
                </h1>
                <p className="page-copy page-copy-compact">
                  The full homepage is being refreshed. Core marketplace functions remain available while the landing
                  layout is stabilized.
                </p>
                <div className="page-actions">
                  <Link href="/properties" className="btn-primary">
                    Explore properties
                  </Link>
                  <Link href="/login" className="btn-secondary">
                    Sign in
                  </Link>
                  <Link href="/register" className="btn-secondary">
                    Create account
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-3">
            {HERO_METRICS.map((metric) => (
              <StatCard key={metric.label} label={metric.label} value={metric.value} hint={metric.hint} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  const {
    preferenceCopy,
    allProperties,
    featured,
    orderedDemands,
    orderedMarketEntries,
    trendLead,
    opportunityLead,
    demandLead,
  } = homepageData;
  const highlightListing = featured[0];

  return (
    <main>
      <section className="section-spacing relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="page-shell relative grid gap-8 lg:grid-cols-[1fr_0.96fr] lg:items-start">
          <div className="space-y-6">
            <span className="eyebrow">Professional property marketplace</span>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl leading-[0.96] font-semibold text-[var(--brand-blue)] md:text-6xl">
                Search listings, publish opportunities, and respond to real property demand.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                RealState4U brings listings, public requirements, market signals, smart discovery, and operator-ready workflows into one organized marketplace.
              </p>
              {preferenceCopy ? (
                <div className="inline-flex rounded-full border border-[var(--brand-line)] bg-white/72 px-4 py-2 text-sm font-semibold text-[var(--brand-blue)]">
                  {preferenceCopy}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/properties" className="btn-primary">
                Explore properties
              </Link>
              <Link href="/demand-board" className="btn-secondary">
                Open demand board
              </Link>
              <Link href="/smart-match" className="btn-secondary">
                Try Smart Match
              </Link>
              <Link href="/post-property" className="btn-secondary">
                Post a property
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {HERO_METRICS.map((metric) => (
                <StatCard key={metric.label} label={metric.label} value={metric.value} hint={metric.hint} />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="panel rounded-[2rem] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Market today
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--brand-blue)]">
                {trendLead.title}
              </h2>
              <p className="mt-3 text-sm font-semibold text-[var(--brand-green-deep)]">{trendLead.signal}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{trendLead.summary}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <div className="panel rounded-[1.8rem] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                  Best opportunity now
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--brand-blue)]">
                  {opportunityLead.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{opportunityLead.whyNow}</p>
              </div>

              <div className="panel rounded-[1.8rem] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                  Open demand
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--brand-blue)]">
                  {demandLead.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{demandLead.summary}</p>
              </div>

              {highlightListing ? (
                <div className="panel rounded-[1.8rem] p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                    Highlighted listing
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-[var(--brand-blue)]">
                    {highlightListing.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {highlightListing.city}, {highlightListing.country}
                  </p>
                  <Link href={`/properties/${highlightListing.slug}`} className="btn-secondary mt-4">
                    View listing
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Operator workflow"
            title="A standardized flow from discovery to lead handling."
            description="The product is organized for real property operations: search, convert, and moderate supply without splitting market logic across separate sites."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {OPERATOR_WORKFLOWS.map((workflow) => (
              <article key={workflow.title} className="panel rounded-[2rem] p-6">
                <h3 className="text-3xl font-semibold text-[var(--brand-blue)]">{workflow.title}</h3>
                <p className="mt-4 text-base leading-7 text-[var(--muted)]">{workflow.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Open demand"
            title="A live board for needs, briefs, and property-related work."
            description="Share public demand for rentals, acquisitions, renovations, contractor work, or investment sourcing and keep the market conversation visible."
            action={
              <Link href="/demand-board" className="btn-primary">
                Share a demand
              </Link>
            }
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {orderedDemands.map((demand) => (
              <article key={demand.id} className="panel rounded-[2rem] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                  {demand.category}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[var(--brand-blue)]">{demand.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{demand.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="pill">{demand.location}</span>
                  <span className="pill">{demand.urgency}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <RecommendedPropertyGrid
            properties={allProperties}
            title="AI-ranked listings shaped by your browsing intent."
            description="Use Smart Match to keep refining what the platform should surface first, then return to a shortlist that stays relevant across visits."
          />
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Core verticals"
            title="One brand, multiple housing workflows."
            description="Each vertical shares the same navigation, data model, and brand system while market-specific rules stay modular under the surface."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {HOME_VERTICALS.map((vertical) => (
              <article key={vertical.title} className="panel rounded-[2rem] p-6">
                <h3 className="text-3xl font-semibold text-[var(--brand-blue)]">{vertical.title}</h3>
                <p className="mt-4 text-base leading-7 text-[var(--muted)]">{vertical.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Market rules"
            title="Country logic is part of the platform model, not an afterthought."
            description="Sweden, EU, and Pakistan each get the right acquisition and application flow while still living inside one marketplace."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {orderedMarketEntries.map(([code, market]) => (
              <article key={code} className="panel rounded-[2rem] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                  {market.accent}
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-[var(--brand-blue)]">{market.label}</h3>
                <p className="mt-4 text-base leading-7 text-[var(--muted)]">{market.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
                  {market.features.map((feature) => (
                    <li key={feature}>- {feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Operational focus"
            title="What makes this marketplace more usable right now."
            description="The product is being shaped around immediate demand visibility, faster trend recognition, and simpler sharing of real opportunities."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {PHASE_NOTES.map((note) => (
              <div key={note} className="panel rounded-[1.6rem] p-5 text-sm leading-7 text-[var(--muted)]">
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Featured inventory"
            title="Listings that reflect the live market model."
            description="These records cover Sweden queue housing, EU discovery journeys, and Pakistan lead-first contact patterns."
            action={
              <Link href="/properties" className="btn-secondary">
                View all properties
              </Link>
            }
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <RecentlyViewedPanel
            properties={allProperties}
            title="Come back to where you left off."
            description="RealState4U keeps your latest listing trail visible so discovery feels continuous instead of starting over each visit."
          />
        </div>
      </section>
    </main>
  );
}
