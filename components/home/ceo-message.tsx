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
        <div className="panel welcome-note-shell">
          <div className="welcome-note-avatar">
            {hasPortrait ? (
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={imagePath}
                  alt="Asif Nazeer, CEO of RealState4U"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle_at_top_left,rgba(45,141,115,0.18),transparent_35%),linear-gradient(180deg,#ffffff,#e9f6f1)] text-[1.45rem] font-semibold text-[var(--brand-blue)]">
                AN
              </div>
            )}
          </div>

          <div className="space-y-3">
            <span className="eyebrow">Welcome message</span>
            <div>
              <h2 className="welcome-note-title">Welcome to a simpler way to search property and act with confidence.</h2>
              <p className="welcome-note-copy">
                This marketplace is designed to help you find the right home, compare better options, and move faster
                toward the next decision without unnecessary clutter.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-[var(--brand-line)] bg-white/72 p-4 text-sm leading-7 text-[var(--muted)]">
              <p>
                &ldquo;A strong property marketplace should help people discover the right opportunity with clarity,
                trust, and a smoother path from search to response.&rdquo;
              </p>
              <p className="mt-3 font-semibold text-[var(--brand-blue)]">Asif Nazeer</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">CEO, RealState4U</p>
              {!hasPortrait ? (
                <p className="mt-3 text-xs leading-6">
                  Add the portrait to <strong className="text-[var(--brand-blue)]">public/ceo-asif-nazeer.jpg</strong>.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
