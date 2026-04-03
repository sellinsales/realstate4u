import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";

const jobTracks = [
  {
    title: "Site and trade hiring",
    description: "For contractors, builders, and specialist trades working across active developments and refurbishments.",
  },
  {
    title: "Project staffing",
    description: "For construction managers, coordinators, and supervisors tied to large residential and mixed-use delivery.",
  },
  {
    title: "Developer recruitment",
    description: "For real estate groups that need one hiring surface alongside listings, services, and partner discovery.",
  },
] as const;

export default function JobsPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Construction jobs"
          title="Find project roles, trade work, and construction hiring in a dedicated jobs layer."
          description="Jobs are role-based opportunities for workers, contractors, and project teams. They stay separate from property listings so visitors can move directly into hiring and staffing workflows."
          actions={
            <>
              <Link href="/demand-board" className="btn-primary">
                Share hiring need
              </Link>
              <Link href="/properties" className="btn-secondary">
                Back to property search
              </Link>
            </>
          }
          size="compact"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {jobTracks.map((track) => (
            <article key={track.title} className="panel rounded-[2rem] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Hiring track</p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--brand-blue)]">{track.title}</h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">{track.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
