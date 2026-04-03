import { SmartMatchStudio } from "@/components/smart/smart-match-studio";
import { getProperties } from "@/lib/data";

export default async function SmartMatchPage() {
  const properties = await getProperties();

  return (
    <main className="section-spacing">
      <div className="page-shell">
        <SmartMatchStudio properties={properties} />
      </div>
    </main>
  );
}
