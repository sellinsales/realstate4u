import { ImageTileCard } from "@/components/home/marketplace-cards";
import { PageIntro } from "@/components/ui/page-intro";
import { PROJECT_OPPORTUNITIES } from "@/lib/marketplace-home-data";

export default function ProjectsPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Projects"
          title="New projects and investment opportunities"
          description="Browse current project-style investment opportunities, then jump into property search for surrounding inventory."
          size="compact"
        />
        <div className="market-tile-grid market-tile-grid-four">
          {PROJECT_OPPORTUNITIES.map((project) => (
            <ImageTileCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </main>
  );
}
