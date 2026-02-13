
import ViewMedicineDetails from "@/components/modules/medicines/ViewMedicineDetails";
import { Metadata } from "next";

// TypeScript interface for the page props
interface MedicinePageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Metadata Generation (Dynamic SEO)
 * ইউজার যখন লিঙ্ক শেয়ার করবে তখন ঔষধের আইডি বা নাম প্রিভিউতে দেখাবে
 */
export async function generateMetadata({ params }: MedicinePageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Medicine Details | KoreDao`,
    description: `View full details of medicine ID: ${id}`,
  };
}

/**
 * Main Dynamic Page Component
 */
export default async function MedicineIdPage({ params }: MedicinePageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <main className="container mx-auto py-8 md:py-12">
        <ViewMedicineDetails id={id} />
      </main>
    </div>
  );
}