import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { PageIntro } from "@/components/ui/page-intro";
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
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Authentication"
          title="Log in to manage listings, queue applications, and dashboard views."
          description="Credentials auth is in place for the MVP, with demo fallback when the database is unavailable."
          aside={
            <div className="space-y-4">
              {registered ? (
                <div className="status-note status-note-success">
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
              ) : (
                <div className="status-note status-note-warning">
                  Live authentication is active. Use your real marketplace account credentials.
                </div>
              )}
            </div>
          }
        />

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-4">
            <div className="panel rounded-[1.8rem] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Why sign in
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                <p>Track inbound leads, manage published listings, and review queue applications.</p>
                <p>Admins can move directly into listing moderation and verification workflows.</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Need an account?{" "}
              <Link href="/register" className="font-semibold text-[var(--brand-blue)]">
                Register here
              </Link>
              .
            </p>
          </div>
        <LoginForm />
        </div>
      </div>
    </main>
  );
}
