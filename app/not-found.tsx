import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";

export default function NotFound() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Not found"
          title="That page does not exist."
          description="Return to the homepage or jump back into the live marketplace routes."
        />
        <EmptyState
          title="The requested route could not be found."
          copy="Use the main navigation or go back to the homepage to continue browsing."
          action={
            <Link href="/" className="btn-primary">
              Go home
            </Link>
          }
        />
      </div>
    </main>
  );
}
