import { PostPropertyForm } from "@/components/property/post-property-form";
import { PageIntro } from "@/components/ui/page-intro";
import { auth } from "@/lib/auth";

export default async function PostPropertyPage() {
  const session = await auth();

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="New listing"
          title="Post a property for the Phase 1 marketplace."
          description={`Logged in as ${session?.user.email}. Capture listing basics now, then layer in richer media and market-specific publishing rules later.`}
          aside={
            <div className="panel rounded-[1.8rem] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Production checklist
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                <p>Use clear titles, real pricing, and at least one strong image URL.</p>
                <p>Pakistan listings should include WhatsApp-ready contact details.</p>
                <p>Sweden rentals can add first-hand and queue notes immediately.</p>
              </div>
            </div>
          }
        />
        <PostPropertyForm />
      </div>
    </main>
  );
}
