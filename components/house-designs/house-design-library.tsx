import Link from "next/link";
import { HOUSE_DESIGNS, type HouseDesignIdea } from "@/lib/house-designs";

function PlanPreview({ idea }: { idea: HouseDesignIdea }) {
  return (
    <div className="rounded-[1.6rem] border border-[var(--brand-line)] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(231,244,242,0.9))] p-4">
      <svg viewBox="0 0 200 208" className="w-full text-[var(--brand-blue)]" role="img" aria-label={`${idea.title} layout preview`}>
        <rect x="4" y="4" width="192" height="200" rx="18" fill="rgba(255,255,255,0.84)" stroke="rgba(24,86,122,0.22)" strokeWidth="2.5" />
        {idea.rooms.map((room) => (
          <g key={`${idea.slug}-${room.label}`}>
            <rect
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              rx="12"
              fill="rgba(24,86,122,0.08)"
              stroke="rgba(24,86,122,0.26)"
              strokeWidth="1.8"
            />
            <text
              x={room.x + room.width / 2}
              y={room.y + room.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill="currentColor"
              style={{ fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              {room.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function HouseDesignLibrary({
  limit,
  showHeader = true,
}: {
  limit?: number;
  showHeader?: boolean;
}) {
  const ideas = typeof limit === "number" ? HOUSE_DESIGNS.slice(0, limit) : HOUSE_DESIGNS;

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-6">
        {showHeader ? (
          <div className="max-w-3xl">
            <span className="eyebrow">House design ideas</span>
            <h2 className="section-title">Layout ideas for 5 marla, 7 marla, 10 marla, 1 kanal, and farmhouse homes.</h2>
            <p className="section-copy">
              Use these free concept plans to compare room flow, parking, lounge placement, family use, and plot potential before you brief an architect or designer.
            </p>
          </div>
        ) : null}

        <div className="grid gap-5 xl:grid-cols-2">
          {ideas.map((idea) => (
            <article key={idea.slug} className="panel grid gap-5 rounded-[2rem] p-5 md:grid-cols-[0.92fr_1.08fr] md:items-start">
              <PlanPreview idea={idea} />
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill">{idea.plotSize}</span>
                  <span className="pill">{idea.category}</span>
                  <span className="pill">{idea.floors}</span>
                </div>
                <div>
                  <h3 className="utility-card-title">{idea.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{idea.summary}</p>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[var(--brand-blue)]">
                  <span>{idea.bedrooms} bedrooms</span>
                  <span>{idea.bathrooms} bathrooms</span>
                  <span>{idea.idealFor}</span>
                </div>
                <div className="rounded-[1.4rem] border border-[var(--brand-line)] bg-white/72 p-4">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--brand-green)]">Why people like this</p>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--muted)]">
                    {idea.highlights.map((highlight) => (
                      <li key={highlight}>- {highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/post-property" className="btn-primary">
            Post a property
          </Link>
          <Link href="/demand-board" className="btn-secondary">
            Share a design requirement
          </Link>
        </div>
      </div>
    </section>
  );
}
