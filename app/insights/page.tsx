import Link from "next/link";
import { CeoMessage } from "@/components/home/ceo-message";
import { DesignGuidesSection } from "@/components/home/design-guides-section";
import { PageIntro } from "@/components/ui/page-intro";

export default function InsightsPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Insights and guides"
          title="Useful housing ideas, presentation tips, and design direction."
          description="Use this guide area for inspiration, design ideas, and better listing presentation without getting in the way of live property search."
          actions={
            <>
              <Link href="/properties" className="btn-primary">
                Back to search
              </Link>
              <Link href="/house-designs" className="btn-secondary">
                Open house plans
              </Link>
            </>
          }
          size="compact"
        />
      </div>
      <CeoMessage />
      <DesignGuidesSection />
    </main>
  );
}
