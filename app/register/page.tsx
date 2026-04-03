import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { PageIntro } from "@/components/ui/page-intro";

export default function RegisterPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Create account"
          title="Create an account for buyers, renters, agents, and landlords."
          description="Registration stores the core details needed for inquiries, listings, queue applications, and dashboard access. Confirmed accounts are ready for secure sign-in, password recovery, and account notifications."
        />
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
              Account scope
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
              <p>Users can browse, send inquiries, and apply to queue-based rentals.</p>
              <p>Agents and landlords can attach listings and manage the dashboard workflow from the same account.</p>
              <p>Email confirmation and password recovery are built into the live account flow.</p>
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
