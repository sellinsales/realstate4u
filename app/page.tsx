import Link from "next/link";
import { CeoMessage } from "@/components/home/ceo-message";
import { HomeSearchHero } from "@/components/home/home-search-hero";
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
                Find property, service teams, jobs, and live market demand from one clean search-led homepage.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)] md:text-[1.02rem]">
                Start with what you need right now: a home to buy or rent, a team to hire, a job to apply for, or a
                demand brief to share with the market.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/properties" className="btn-primary">
                Search property
              </Link>
              <Link href="/smart-match" className="btn-secondary">
                Open AI Match
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

          <HomeSearchHero />
        </div>
      </section>

      <CeoMessage />

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Popular paths"
            title="Choose the route that matches what you are trying to do."
            description="Each part of the site is built around a user goal, so visitors can move directly into search, hiring, or demand instead of reading through platform explanations first."
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
            eyebrow="How people use it"
            title="Move from search to action without leaving the marketplace."
            description="The main experience is designed around what visitors usually want next: find options, compare them, contact the right side, and keep returning to the same shortlist or workflow."
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
            eyebrow="Helpful signals"
            title="Useful marketplace details at a glance."
            description="These highlights help visitors understand what they can already do here today without turning the homepage into an internal status dashboard."
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
            eyebrow="Go directly"
            title="Start with the area that fits your goal."
            description="These links take you straight into the main live journeys: property search, posting, account access, and public demand."
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
