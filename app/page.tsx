import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { HERO_METRICS, HOME_VERTICALS, OPERATOR_WORKFLOWS, PHASE_NOTES } from "@/lib/demo-data";
import { getFeaturedProperties } from "@/lib/data";

export default async function HomePage() {
  const featured = await getFeaturedProperties();

  return (
    <main>
      <section className="section-spacing relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="page-shell relative grid gap-8 lg:grid-cols-[1fr_0.96fr] lg:items-start">
          <div className="space-y-6">
            <span className="eyebrow">Professional property marketplace</span>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl leading-[0.96] font-semibold text-[var(--brand-blue)] md:text-6xl">
                Search property, publish listings, and manage real housing demand from one place.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                RealState4U brings property search, account access, lead handling, and market workflows into one clean
                marketplace for buyers, renters, landlords, and agents.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/properties" className="btn-primary">
                Explore properties
              </Link>
              <Link href="/post-property" className="btn-secondary">
                Post a property
              </Link>
              <Link href="/login" className="btn-secondary">
                Sign in
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
                Marketplace focus
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--brand-blue)]">
                Property search, demand capture, and account workflows are live.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                The platform is now stable for browsing, account creation, lead handling, and listing operations while
                the broader landing experience continues to be refined.
              </p>
            </div>

            <div className="panel rounded-[1.8rem] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Core actions
              </p>
              <div className="mt-4 grid gap-3">
                <Link href="/register" className="btn-secondary">
                  Create account
                </Link>
                <Link href="/forgot-password" className="btn-secondary">
                  Reset password
                </Link>
                <Link href="/demand-board" className="btn-secondary">
                  Open demand board
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Operator workflow"
            title="A standardized flow from search to response."
            description="The marketplace is organized for live property operations: discover, convert, moderate, and manage access without splitting the experience across multiple systems."
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
            eyebrow="Core verticals"
            title="One brand, clearly separated user paths."
            description="Properties stay focused on sale and rent inventory, while services, jobs, and demand remain separate workflows under the same marketplace brand."
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
            eyebrow="Operational focus"
            title="What is active in the platform right now."
            description="These notes reflect the practical marketplace features that are already available and stable."
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
            title="Active listings from the current marketplace data."
            description="These listings are pulled from the same property flow used across search, account actions, and lead handling."
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
    </main>
  );
}
