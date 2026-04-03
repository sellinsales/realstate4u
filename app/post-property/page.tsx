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
          title="Publish a property into the marketplace."
          description={`Signed in as ${session?.user.email}. Capture pricing, market routing, contact data, and media so the listing is ready for review.`}
          aside={
            <div className="panel rounded-[1.8rem] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Production checklist
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                <p>Use a clear title, real pricing, and at least one strong image URL.</p>
                <p>Pakistan listings should include a WhatsApp-ready contact number.</p>
                <p>Sweden rentals can include first-hand signals and queue selection notes.</p>
              </div>
            </div>
          }
        />
        <PostPropertyForm />
      </div>
    </main>
  );
}
