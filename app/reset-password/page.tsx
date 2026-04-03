import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { PageIntro } from "@/components/ui/page-intro";

type ResetPasswordPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Reset password"
          title="Choose a new password for your marketplace account."
          description="Use a strong password that you do not reuse elsewhere. This link is time-limited for account safety."
          size="compact"
        />
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Security note</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
              <p>Password reset links expire automatically and can be used once.</p>
              <p>If your link is invalid or expired, request a fresh reset email.</p>
              <p>
                Need a new link?{" "}
                <Link href="/forgot-password" className="font-semibold text-[var(--brand-blue)]">
                  Request another reset
                </Link>
                .
              </p>
            </div>
          </div>
          {token ? (
            <ResetPasswordForm token={token} />
          ) : (
            <div className="panel rounded-[1.8rem] p-5">
              <p className="status-note status-note-error">This reset link is incomplete or missing a token.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
