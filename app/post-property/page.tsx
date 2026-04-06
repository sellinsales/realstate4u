import { PostPropertyForm } from "@/components/property/post-property-form";
import { PageIntro } from "@/components/ui/page-intro";
import { auth } from "@/lib/auth";
import { getFriendlyUserName } from "@/lib/utils";

export default async function PostPropertyPage() {
  const session = await auth();
  const friendlyName = getFriendlyUserName(session?.user.name, session?.user.email);

  return (
    <main className="section-spacing">
      <div className="page-shell space-y-8">
        <PageIntro
          eyebrow="New listing"
          title="Post a property through a simpler guided wizard."
          description={`Signed in as ${friendlyName}. Use presets, uploads, and guided steps to publish faster with fewer errors.`}
          aside={
            <div className="panel rounded-[1.8rem] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Production checklist
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                <p>Use a clear title, real pricing, and at least one strong uploaded image.</p>
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
