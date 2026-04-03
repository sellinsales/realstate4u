import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";

const serviceTracks = [
  {
    title: "Moving and relocation",
    description: "For movers, relocation teams, and tenant move-in support tied to property transactions.",
  },
  {
    title: "Cleaning and maintenance",
    description: "For vetted cleaners, repair teams, and recurring property upkeep under one service catalog.",
  },
  {
    title: "Inspection and readiness",
    description: "For inventory checks, staging support, and owner-ready handover workflows before occupancy.",
  },
] as const;

export default function ServicesPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Property services"
          title="Hire operational support without mixing service providers into property listings."
          description="This area is for movers, cleaners, maintenance teams, inspectors, and setup partners. Properties stay for sale or rent; services stay focused on work providers you can hire."
          actions={
            <>
              <Link href="/demand-board" className="btn-primary">
                Share service requirement
              </Link>
              <Link href="/properties" className="btn-secondary">
                Back to property search
              </Link>
            </>
          }
          size="compact"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {serviceTracks.map((track) => (
            <article key={track.title} className="panel rounded-[2rem] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Service track</p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--brand-blue)]">{track.title}</h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">{track.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
