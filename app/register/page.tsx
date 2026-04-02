import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <span className="eyebrow">Create account</span>
          <h1 className="text-5xl font-semibold text-[var(--brand-blue)]">Register as a buyer, renter, or landlord for the MVP.</h1>
          <p className="text-base leading-8 text-[var(--muted)]">
            The Phase 1 auth model keeps registration simple and stores a user profile alongside the login credentials.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Already registered? <Link href="/login" className="font-semibold text-[var(--brand-blue)]">Sign in</Link>.
          </p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
