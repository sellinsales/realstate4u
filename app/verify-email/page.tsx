import Link from "next/link";
import { VerifyEmailPanel } from "@/components/auth/verify-email-panel";
import { PageIntro } from "@/components/ui/page-intro";

type VerifyEmailPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const email = typeof params.email === "string" ? params.email : "";

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Verify email"
          title="Confirm your email to activate the full RealState4U account flow."
          description="Email confirmation keeps account creation, password reset, and sign-in recovery tied to the correct user inbox."
          size="compact"
        />
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Next step</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
              <p>Open the confirmation link from your inbox to activate the account.</p>
              <p>If the link has expired, request a fresh confirmation email.</p>
              <p>
                Already confirmed?{" "}
                <Link href="/login" className="font-semibold text-[var(--brand-blue)]">
                  Continue to sign in
                </Link>
                .
              </p>
            </div>
          </div>
          <VerifyEmailPanel token={token} email={email} />
        </div>
      </div>
    </main>
  );
}
