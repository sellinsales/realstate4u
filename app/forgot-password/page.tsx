import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { PageIntro } from "@/components/ui/page-intro";

export default function ForgotPasswordPage() {
  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="Password reset"
          title="Send a secure password reset link to your account email."
          description="Use this flow if you cannot sign in. The reset link expires automatically and takes you back into the live marketplace account system."
          size="compact"
        />
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="panel rounded-[1.8rem] p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">Recovery flow</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
              <p>Enter the email used for your RealState4U account.</p>
              <p>If the account exists, a secure reset link will be sent to that inbox.</p>
              <p>
                Remembered your password?{" "}
                <Link href="/login" className="font-semibold text-[var(--brand-blue)]">
                  Return to sign in
                </Link>
                .
              </p>
            </div>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
}
