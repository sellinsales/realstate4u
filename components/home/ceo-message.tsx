import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const imagePath = "/ceo-asif-nazeer.jpg";

export function CeoMessage() {
  const localPath = path.join(process.cwd(), "public", "ceo-asif-nazeer.jpg");
  const hasPortrait = fs.existsSync(localPath);

  return (
    <section className="section-spacing">
      <div className="page-shell">
        <div className="panel grid gap-6 rounded-[2rem] p-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="overflow-hidden rounded-[1.7rem] border border-[var(--brand-line)] bg-white/80">
            {hasPortrait ? (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={imagePath}
                  alt="Asif Nazeer, CEO of RealState4U"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(45,141,115,0.18),transparent_35%),linear-gradient(180deg,#ffffff,#e9f6f1)]">
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">CEO message</p>
                  <p className="mt-4 text-5xl font-semibold text-[var(--brand-blue)]">AN</p>
                  <p className="mt-3 px-6 text-sm leading-7 text-[var(--muted)]">
                    Upload the provided portrait to <strong className="text-[var(--brand-blue)]">public/ceo-asif-nazeer.jpg</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <span className="eyebrow">Message from CEO</span>
            <div>
              <h2 className="section-title">A note from Asif Nazeer on why property search should feel simpler.</h2>
              <p className="section-copy">
                RealState4U is being built to make property decisions clearer for everyday buyers, renters, agents,
                and families. People should be able to search confidently, compare faster, connect with the right side,
                and keep returning to one marketplace that stays organized instead of confusing.
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-[var(--brand-line)] bg-white/72 p-5 text-sm leading-7 text-[var(--muted)]">
              <p>
                “A strong property marketplace should not overwhelm visitors. It should help them find the right home,
                the right service support, the right investment path, or the right opportunity with clarity and trust.”
              </p>
              <p className="mt-4 font-semibold text-[var(--brand-blue)]">Asif Nazeer, CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
