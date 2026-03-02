import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NoCartItem = () => {
    return (
        <div>
            <Card className="border-dashed bg-slate-50/50">
                <CardContent className="flex flex-col items-center justify-center py-20">
                    <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                        <ShoppingBag size={48} className="text-slate-300" />
                    </div>
                    <h2 className="text-xl font-semibold italic">Your cart is currently empty.</h2>
                    <p className="text-muted-foreground mb-6">Start adding OTC medicines to your cart!</p>
                    <Link href="/medicines">
                        <Button size="lg">Browse Products</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default NoCartItem;