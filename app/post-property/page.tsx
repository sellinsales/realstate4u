import { PostPropertyForm } from "@/components/property/post-property-form";
import { auth } from "@/lib/auth";

export default async function PostPropertyPage() {
  const session = await auth();

  return (
    <main className="section-spacing">
      <div className="page-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <span className="eyebrow">New listing</span>
          <h1 className="text-5xl font-semibold text-[var(--brand-blue)]">Post a property for the Phase 1 marketplace.</h1>
          <p className="text-base leading-8 text-[var(--muted)]">
            Logged in as {session?.user.email}. This form stores listing basics, market flags, queue notes, and media URLs. Cloudinary upload flow can attach to the same payload next.
          </p>
        </div>
        <PostPropertyForm />
      </div>
    </main>
  );
}
