import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// লোডিং স্কেলিটন
export default function OrderHistorySkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-6">
      <Skeleton className="h-10 w-64 mb-8" />
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6 space-y-4">
          <div className="flex justify-between"><Skeleton className="h-6 w-32" /><Skeleton className="h-6 w-20" /></div>
          <Skeleton className="h-20 w-full" />
          <div className="flex justify-between"><Skeleton className="h-6 w-24" /><Skeleton className="h-6 w-32" /></div>
        </Card>
      ))}
    </div>
  );
}