import { headers } from "next/headers";
import { DemandHub } from "@/components/community/demand-hub";
import { PageIntro } from "@/components/ui/page-intro";
import {
  INVESTMENT_OPPORTUNITIES,
  MARKET_TRENDS,
  OPEN_DEMANDS,
} from "@/lib/community-data";
import { detectPreferredMarket, getPreferredMarketCopy, prioritizeByMarket } from "@/lib/market-personalization";

export default async function DemandBoardPage() {
  const headerStore = await headers();
  const preferredMarket = detectPreferredMarket(headerStore);
  const preferenceCopy = getPreferredMarketCopy(preferredMarket);
  const orderedDemands = prioritizeByMarket(OPEN_DEMANDS, preferredMarket, (item) => item.marketCode);
  const orderedTrends = prioritizeByMarket(MARKET_TRENDS, preferredMarket, (item) => item.marketCode);
  const orderedOpportunities = prioritizeByMarket(INVESTMENT_OPPORTUNITIES, preferredMarket, (item) => item.marketCode);

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Demand and market board"
          title="Open requirements, market signals, and investment opportunities."
          description="Share what is needed, see what is moving, and surface useful opportunities without turning the page into an oversized static hero."
          size="compact"
        />
        {preferenceCopy ? <div className="status-note status-note-warning">{preferenceCopy}</div> : null}

        <DemandHub seededDemands={orderedDemands} />

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
            {orderedTrends.map((trend) => (
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
            {orderedOpportunities.map((opportunity) => (
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
