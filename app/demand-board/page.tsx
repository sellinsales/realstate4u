import { DemandHub } from "@/components/community/demand-hub";
import { PageIntro } from "@/components/ui/page-intro";
import {
  INVESTMENT_OPPORTUNITIES,
  MARKET_TRENDS,
  OPEN_DEMANDS,
} from "@/lib/community-data";

export default function DemandBoardPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Demand and market board"
          title="Share open requirements, see market demand, and track current investment opportunities."
          description="This is the public-facing layer for what people need right now: rentals, services, construction work, investor briefs, and market opportunities worth watching."
        />

        <DemandHub seededDemands={OPEN_DEMANDS} />

        <section className="space-y-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
              Market today
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-blue)]">
              What is moving in the market right now.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {MARKET_TRENDS.map((trend) => (
              <article key={trend.title} className="panel rounded-[2rem] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                  {trend.market}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[var(--brand-blue)]">{trend.title}</h3>
                <p className="mt-3 text-sm font-semibold text-[var(--brand-green-deep)]">{trend.signal}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{trend.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
              Investment watch
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-blue)]">
              Stronger investment opportunities to evaluate now.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {INVESTMENT_OPPORTUNITIES.map((opportunity) => (
              <article key={opportunity.title} className="panel rounded-[2rem] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                  {opportunity.market}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[var(--brand-blue)]">{opportunity.title}</h3>
                <p className="mt-3 text-sm font-semibold text-[var(--brand-green-deep)]">{opportunity.profile}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  <strong className="text-[var(--brand-blue)]">Why now:</strong> {opportunity.whyNow}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  <strong className="text-[var(--brand-blue)]">Watch for:</strong> {opportunity.watchFor}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
