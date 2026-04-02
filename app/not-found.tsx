import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-spacing">
      <div className="page-shell">
        <div className="panel rounded-[2rem] p-8 text-center">
          <span className="eyebrow">Not found</span>
          <h1 className="mt-5 text-5xl font-semibold text-[var(--brand-blue)]">That page does not exist.</h1>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            Return to the homepage or browse the available property routes.
          </p>
          <Link href="/" className="btn-primary mt-6">
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
