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
          title="A hiring layer for developers and contractors is planned next."
          description="The jobs marketplace will sit beside properties and services so operators can manage supply, staffing, and partner demand in one brand ecosystem."
          actions={
            <>
              <Link href="/properties" className="btn-secondary">
                View properties
              </Link>
              <Link href="/post-property" className="btn-primary">
                List property
              </Link>
            </>
          }
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {jobTracks.map((track) => (
            <article key={track.title} className="panel rounded-[2rem] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Planned vertical
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--brand-blue)]">{track.title}</h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">{track.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
