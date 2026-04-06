import { GuideShortcutCard, ImageTileCard } from "@/components/home/marketplace-cards";
import { PageIntro } from "@/components/ui/page-intro";
import { GUIDE_SHORTCUTS, POPULAR_AREAS } from "@/lib/marketplace-home-data";

export default function AreaGuidesPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Area guides"
          title="Area guides, price trends, and society maps"
          description="Use area-focused shortcuts to compare locations before you move into full property search."
          size="compact"
        />
        <div className="market-guide-grid">
          {GUIDE_SHORTCUTS.map((guide) => (
            <GuideShortcutCard key={guide.title} {...guide} />
          ))}
        </div>
        <div className="market-tile-grid market-tile-grid-six">
          {POPULAR_AREAS.map((area) => (
            <ImageTileCard key={area.title} {...area} />
          ))}
        </div>
      </div>
    </main>
  );
}
