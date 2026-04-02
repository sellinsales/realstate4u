import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { DEMO_CREDENTIALS } from "@/lib/demo-data";
import { isDatabaseConfigured } from "@/lib/data";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const registered = params.registered === "1";
  const demoMode = !isDatabaseConfigured();

  return (
    <main className="section-spacing">
      <div className="page-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <span className="eyebrow">Authentication</span>
          <h1 className="text-5xl font-semibold text-[var(--brand-blue)]">Log in to manage listings, queue applications, and dashboard views.</h1>
          <p className="text-base leading-8 text-[var(--muted)]">
            Credentials auth is set up for the MVP. Move to a production secret and database before deployment.
          </p>
          {registered ? (
            <div className="panel rounded-[1.6rem] p-4 text-sm font-medium text-[var(--brand-green-deep)]">
              Account created. You can sign in now.
            </div>
          ) : null}
          {demoMode ? (
            <div className="panel rounded-[1.8rem] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Demo accounts
              </p>
              <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                {DEMO_CREDENTIALS.map((account) => (
                  <p key={account.email}>
                    {account.role}: {account.email} / {account.password}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
          <p className="text-sm text-[var(--muted)]">
            Need an account? <Link href="/register" className="font-semibold text-[var(--brand-blue)]">Register here</Link>.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
