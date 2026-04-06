import Link from "next/link";
import { HomeSearchHero } from "@/components/home/home-search-hero";
import {
  FeaturedListingCard,
  GuideShortcutCard,
  IconShortcutCard,
  ImageTileCard,
} from "@/components/home/marketplace-cards";
import { getProperties } from "@/lib/data";
import {
  CITY_SHORTCUTS,
  GUIDE_SHORTCUTS,
  POPULAR_AREAS,
  PROJECT_OPPORTUNITIES,
  PROPERTY_TYPE_SHORTCUTS,
} from "@/lib/marketplace-home-data";

export default async function HomePage() {
  const featuredListings = (await getProperties()).slice(0, 8);

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <HomeSearchHero />

        <section className="market-section">
          <div className="market-section-head">
            <h2 className="market-section-title">Featured Properties</h2>
            <Link href="/properties" className="market-inline-link">
              View All Listings
            </Link>
          </div>
          <div className="market-listing-grid">
            {featuredListings.map((property) => (
              <FeaturedListingCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        <section className="market-section">
          <div className="market-section-head">
            <h2 className="market-section-title">Popular Areas</h2>
          </div>
          <div className="market-tile-grid market-tile-grid-six">
            {POPULAR_AREAS.map((area) => (
              <ImageTileCard key={area.title} {...area} />
            ))}
          </div>
        </section>

        <section className="market-section">
          <div className="market-section-head">
            <h2 className="market-section-title">New Projects &amp; Investment Opportunities</h2>
          </div>
          <div className="market-tile-grid market-tile-grid-four">
            {PROJECT_OPPORTUNITIES.map((project) => (
              <ImageTileCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        <section className="market-section">
          <div className="market-section-head">
            <h2 className="market-section-title">Explore by Property Type</h2>
          </div>
          <div className="market-icon-grid">
            {PROPERTY_TYPE_SHORTCUTS.map((item) => (
              <IconShortcutCard key={item.label} {...item} />
            ))}
          </div>
        </section>

        <section className="market-section">
          <div className="market-section-head">
            <h2 className="market-section-title">Explore by City</h2>
          </div>
          <div className="market-tile-grid market-tile-grid-six">
            {CITY_SHORTCUTS.map((city) => (
              <ImageTileCard key={city.title} {...city} />
            ))}
          </div>
        </section>

        <section className="market-section">
          <div className="market-section-head">
            <h2 className="market-section-title">Area Guides / Price Trends / Society Maps</h2>
          </div>
          <div className="market-guide-grid">
            {GUIDE_SHORTCUTS.map((guide) => (
              <GuideShortcutCard key={guide.title} {...guide} />
            ))}
          </div>
        </section>

        <section className="market-cta-panel">
          <div>
            <p className="market-cta-label">Investment CTA</p>
            <h2 className="market-cta-title">Looking for the best investment opportunity?</h2>
          </div>
          <div className="market-cta-actions">
            <Link href="/projects" className="market-cta-link">
              Browse Projects
            </Link>
            <Link href="/plot-finder" className="market-cta-link">
              Explore Plots
            </Link>
            <Link href="/area-guides" className="market-cta-link">
              See Top Areas
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
