import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";

export default function ServicesPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Phase 4 placeholder"
          title="Home services will live here later."
          description="The route is already part of the information architecture so the platform can expand without breaking the brand or navigation model."
        />
        <EmptyState
          title="Services are intentionally deferred."
          copy="Phase 1 keeps the launch tight around properties, queue housing, leads, and admin tooling."
          action={
            <Link href="/properties" className="btn-primary">
              Explore properties instead
            </Link>
          }
        />
      </div>
    </main>
  );
}
