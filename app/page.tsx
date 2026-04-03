import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { HERO_METRICS, HOME_VERTICALS, OPERATOR_WORKFLOWS, PHASE_NOTES } from "@/lib/demo-data";

export default async function HomePage() {
  return (
    <main>
      <section className="section-spacing relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="page-shell relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-5">
            <span className="eyebrow">Professional property marketplace</span>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-[clamp(2.7rem,5.2vw,4.9rem)] leading-[0.94] font-semibold text-[var(--brand-blue)]">
                A clearer marketplace for property search, listings, leads, and housing operations.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)] md:text-[1.02rem]">
                RealState4U gives buyers, renters, landlords, and agents one structured place to search inventory,
                publish listings, qualify demand, and manage account-driven workflows without cluttered navigation.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/properties" className="btn-primary">
                Search property
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

          <div className="utility-grid">
            <div className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Marketplace focus
              </p>
              <h2 className="utility-card-title mt-3">
                Property, services, jobs, and public demand each stay on their own track.
              </h2>
              <p className="utility-card-copy">
                Property search remains focused on buy and rent inventory. Home services handle vendors and work teams.
                Construction jobs stay candidate-facing. Demand Board keeps open requirements visible without mixing
                them into search results.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <div className="panel utility-card">
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
                    Share a requirement
                  </Link>
                </div>
              </div>
              <div className="panel utility-card">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                  Marketplace structure
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                  <li>Property Search is for sale and rent inventory only.</li>
                  <li>Home Services is for contractors, maintenance teams, and vendors.</li>
                  <li>Construction Jobs is for hiring and work opportunities.</li>
                </ul>
              </div>
            </div>

            <div className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Production-ready now
              </p>
              <p className="utility-card-copy">
                Live account creation, password reset, search, posting, queue-aware rentals, and inquiry capture are
                already in the operating flow. The design pass here keeps those live paths visually aligned.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Operator workflow"
            title="A standardized flow from search to response."
            description="The marketplace is organized for live property operations: discover, qualify, moderate, and manage access without splitting the experience across multiple systems."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {OPERATOR_WORKFLOWS.map((workflow) => (
              <article key={workflow.title} className="panel utility-card">
                <h3 className="utility-card-title">{workflow.title}</h3>
                <p className="utility-card-copy">{workflow.description}</p>
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
              <article key={vertical.title} className="panel utility-card">
                <h3 className="utility-card-title">{vertical.title}</h3>
                <p className="utility-card-copy">{vertical.description}</p>
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
            eyebrow="Next step"
            title="Go directly into the live marketplace flows."
            description="Use the core routes below to search inventory, publish listings, create accounts, and manage property demand without depending on homepage-only data blocks."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/properties" className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Search</p>
              <h3 className="utility-card-title mt-4">Find property</h3>
              <p className="utility-card-copy">
                Browse current buy and rent inventory by market, city, and property type.
              </p>
            </Link>
            <Link href="/post-property" className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Publish</p>
              <h3 className="utility-card-title mt-4">Post property</h3>
              <p className="utility-card-copy">
                Create a listing, add media, and move it into the live marketplace workflow.
              </p>
            </Link>
            <Link href="/register" className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Access</p>
              <h3 className="utility-card-title mt-4">Create account</h3>
              <p className="utility-card-copy">
                Register buyers, renters, landlords, and agents with the new live auth flow.
              </p>
            </Link>
            <Link href="/demand-board" className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Demand</p>
              <h3 className="utility-card-title mt-4">Open demand board</h3>
              <p className="utility-card-copy">
                Share requirements, review open market needs, and keep demand visible.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
