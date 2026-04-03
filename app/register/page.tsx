import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { PageIntro } from "@/components/ui/page-intro";

export default function RegisterPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Create account"
          title="Register as a buyer, renter, or landlord for the MVP."
          description="Phase 1 keeps registration intentionally lean while storing enough profile data for listings, leads, and queue applications."
        />
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
              Account scope
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
              <p>Users can browse, send inquiries, and apply to queue-based rentals.</p>
              <p>Agents and landlords can later attach listings and manage their dashboard workflow.</p>
              <p>
                Already registered?{" "}
                <Link href="/login" className="font-semibold text-[var(--brand-blue)]">
                  Sign in
                </Link>
                .
              </p>
            </div>
          </div>
        <RegisterForm />
        </div>
      </div>
    </main>
  );
}
