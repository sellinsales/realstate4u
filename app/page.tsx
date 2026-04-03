import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { HERO_METRICS, HOME_VERTICALS, PHASE_NOTES } from "@/lib/demo-data";
import { getFeaturedProperties } from "@/lib/data";
import { MARKET_CONFIG } from "@/lib/markets";

export default async function HomePage() {
  const featured = await getFeaturedProperties();

  return (
    <main>
      <section className="section-spacing relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="page-shell relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-8">
            <span className="eyebrow">Multi-vertical housing ecosystem</span>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl leading-[0.94] font-semibold text-[var(--brand-blue)] md:text-7xl">
                RealState4U is building one platform for housing, queue rentals, and market-specific property leads.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Phase 1 ships the property marketplace core for Sweden, EU, and Pakistan with queue housing basics, auth, admin review, and direct inquiry handling.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/properties" className="btn-primary">
                Explore properties
              </Link>
              <Link href="/post-property" className="btn-secondary">
                Post a property
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {HERO_METRICS.map((metric) => (
                <StatCard key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </div>
          </div>

          <div className="panel rounded-[2.3rem] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
              MVP focus
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-[var(--brand-blue)]">
              Properties first. Services and jobs stay scaffolded until later phases.
            </h2>
            <div className="mt-8 space-y-4">
              {PHASE_NOTES.map((note) => (
                <div key={note} className="rounded-[1.5rem] border border-[var(--brand-line)] bg-white/70 p-4 text-sm leading-7 text-[var(--muted)]">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Core verticals"
            title="One brand, multiple housing workflows."
            description="Each vertical shares the same brand system, while market-specific rules stay modular under the surface."
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
            {Object.entries(MARKET_CONFIG).map(([code, market]) => (
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
            eyebrow="Featured inventory"
            title="Starter listings for the MVP flow."
            description="These sample records cover Sweden queue housing, EU marketplace discovery, and Pakistan lead-first contact journeys."
            action={
              <Link href="/properties" className="btn-secondary">
                View all listings
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
    </main>
  );
}
