import Link from "next/link";
import { HomeActionLauncher } from "@/components/home/home-action-launcher";
import { HomeSearchHero } from "@/components/home/home-search-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { HOME_VERTICALS, OPERATOR_WORKFLOWS, PHASE_NOTES } from "@/lib/demo-data";

export default async function HomePage() {
  return (
    <main>
      <section className="section-spacing relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-75" aria-hidden="true" />
        <div className="page-shell relative space-y-6">
          <div className="panel rounded-[2rem] p-6 md:p-7">
            <div className="max-w-4xl">
              <span className="eyebrow">Marketplace quick start</span>
              <h1 className="mt-4 max-w-5xl text-[clamp(2rem,3.8vw,3.15rem)] leading-[1.04] font-semibold text-[var(--brand-blue)]">
                Start with search, posting, services, jobs, or open demand right away.
              </h1>
              <p className="mt-4 max-w-3xl text-[0.97rem] leading-8 text-[var(--muted)]">
                The homepage is now built to help people jump directly into what they came for instead of scrolling through extra hero content first.
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
            eyebrow="Useful details"
            title="Helpful points visitors can understand quickly."
            description="These quick notes keep the main marketplace clearer while showing people how the live routes work."
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
            eyebrow="Guides and ideas"
            title="Keep design ideas and inspiration separate from live marketplace search."
            description="Guides, house plans, and presentation ideas now sit in their own reading path so the main homepage stays focused on action."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/insights" className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Insights</p>
              <h3 className="utility-card-title mt-4">Design and listing guides</h3>
              <p className="utility-card-copy">
                Read housing presentation tips, welcome notes, and cleaner design guidance in one guide area.
              </p>
            </Link>
            <Link href="/house-designs" className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Layouts</p>
              <h3 className="utility-card-title mt-4">House plan concepts</h3>
              <p className="utility-card-copy">
                Review free marla, kanal, and farmhouse concepts before you brief an architect or designer.
              </p>
            </Link>
            <Link href="/register" className="panel utility-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Account</p>
              <h3 className="utility-card-title mt-4">Create account</h3>
              <p className="utility-card-copy">
                Save progress, post listings, manage inquiries, and return without starting over.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
