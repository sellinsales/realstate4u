import Image from "next/image";
import Link from "next/link";

const designGuides = [
  {
    title: "Warm natural homes",
    summary:
      "Buyers are responding well to calmer interiors with oak tones, layered stone, soft fabrics, and sunlight-driven layouts.",
    guide:
      "If you are posting a home, lead with natural textures, living areas, and material detail shots rather than empty wide photos only.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Flexible family layouts",
    summary:
      "Homes that show work corners, adaptable bedrooms, and storage clarity feel more practical and easier to imagine living in.",
    guide:
      "Show how the space works day to day: study corner, dining flow, storage wall, balcony use, or family room connection.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Modern 3D-style presentation",
    summary:
      "Crisp architectural visuals, staged lighting, and premium exterior angles help newer developments feel more credible and future-ready.",
    guide:
      "For projects and premium homes, use cleaner hero shots, dusk lighting, and render-quality presentation instead of crowded collage layouts.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export function DesignGuidesSection() {
  return (
    <section className="section-spacing">
      <div className="page-shell space-y-6">
        <div className="max-w-3xl">
          <span className="eyebrow">Design ideas</span>
          <h2 className="section-title">Home presentation ideas that make listings feel more current and premium.</h2>
          <p className="section-copy">
            These guides help agents, landlords, and developers present homes in a more attractive way while helping
            buyers and renters quickly understand the style and quality of a place.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {designGuides.map((guide) => (
            <article key={guide.title} className="panel overflow-hidden rounded-[1.9rem]">
              <div className="relative h-60">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 p-5">
                <h3 className="utility-card-title">{guide.title}</h3>
                <p className="text-sm leading-7 text-[var(--muted)]">{guide.summary}</p>
                <div className="rounded-[1.25rem] border border-[var(--brand-line)] bg-white/72 p-4 text-sm leading-7 text-[var(--muted)]">
                  <strong className="text-[var(--brand-blue)]">Guide:</strong> {guide.guide}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/post-property" className="btn-primary">
            Post with better presentation
          </Link>
          <Link href="/properties" className="btn-secondary">
            Browse live listings
          </Link>
        </div>
      </div>
    </section>
  );
}
