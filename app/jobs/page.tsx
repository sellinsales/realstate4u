import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";

export default function JobsPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Phase 4 placeholder"
          title="Construction jobs will live here later."
          description="The hiring marketplace is planned, but it stays out of the launch path until the property engine is fully stable."
        />
        <EmptyState
          title="The jobs board is not live yet."
          copy="For now the product stays focused on property discovery, posting, and lead handling."
          action={
            <Link href="/post-property" className="btn-secondary">
              Post inventory
            </Link>
          }
        />
      </div>
    </main>
  );
}
