import { Card, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NoOrder = () => {
    return (
        <Card className="text-center py-16 border-dashed">
          <CardContent>
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium">No orders found</h2>
            <p className="text-muted-foreground mb-6">You haven&apos;t placed any orders yet.</p>
            <Link href="/medicines">
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Start Shopping
              </button>
            </Link>
          </CardContent>
        </Card>
    );
};

export default NoOrder;