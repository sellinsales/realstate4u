import { HouseDesignLibrary } from "@/components/house-designs/house-design-library";
import { PageIntro } from "@/components/ui/page-intro";

export default function HouseDesignsPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="House plans"
          title="Explore layout ideas before you build, renovate, or buy."
          description="Browse free concept layouts for 5 marla, 7 marla, 10 marla, 1 kanal, and farmhouse homes so you can compare room flow, family use, and plot potential more clearly."
        />
      </div>
      <HouseDesignLibrary showHeader={false} />
    </main>
  );
}
