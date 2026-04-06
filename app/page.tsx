import Link from "next/link";
import { CeoMessage } from "@/components/home/ceo-message";
import { DesignGuidesSection } from "@/components/home/design-guides-section";
import { HouseDesignLibrary } from "@/components/house-designs/house-design-library";
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
              <h1 className="max-w-4xl text-[clamp(2.25rem,4.3vw,3.95rem)] leading-[1.01] font-semibold text-[var(--brand-blue)]">
                Find the right home, team, job, or market lead without the usual clutter.
              </h1>
              <p className="max-w-2xl text-[0.98rem] leading-8 text-[var(--muted)] md:text-[1rem]">
                Start with property search, move into house-plan ideas, share your requirement, or go straight to services and jobs from the same clean marketplace.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/properties" className="btn-primary">
                Search property
              </Link>
              <Link href="/smart-match" className="btn-secondary">
                Open AI Match
              </Link>
              <Link href="/house-designs" className="btn-secondary">
                View house plans
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

      <DesignGuidesSection />

      <HouseDesignLibrary limit={3} />

      <section className="section-spacing">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Popular paths"
            title="Choose the route that fits what you want to do today."
            description="Each route is arranged to help you compare options, contact the right people faster, and keep moving with less confusion."
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
            title="Move from search to action without leaving the same marketplace."
            description="Most people want to compare, contact, save, and come back later without starting from zero. The site is shaped around that real flow."
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
            title="Useful details at a glance."
            description="These quick highlights show what visitors can do here now in a simpler and more useful way."
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
            title="Go straight into the route you need."
            description="Use these direct links to move into search, posting, account access, and public demand without extra steps."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                Create your account to save progress, post listings, and manage inquiries from one place.
              </p>
            </Link>
            <Link href="/demand-board" className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Demand</p>
              <h3 className="utility-card-title mt-4">Open demand board</h3>
              <p className="utility-card-copy">
                Share requirements, review open market needs, and keep demand visible.
              </p>
            </Link>
            <Link href="/house-designs" className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Ideas</p>
              <h3 className="utility-card-title mt-4">House plan concepts</h3>
              <p className="utility-card-copy">
                Review free layout ideas for marla, kanal, and farmhouse homes before you build or renovate.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
