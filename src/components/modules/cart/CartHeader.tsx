"use client";

import { Button } from '@/components/ui/button';
import { CartService } from '@/services/cart';
import { useCartStore } from '@/store/useCartStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

const CartHeader = () => {

    // ৪. পুরো কার্ট ক্লিয়ার করার মিউটেশন

    const queryClient = useQueryClient();

    const { items } = useCartStore();

    const { mutate: clearCart, isPending: isClearing } =
        useMutation({
            mutationFn: () => CartService.clearCart(),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["cart"] });
                toast.success("cart cleared successfully");
            },
        });


    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <Link
                    href="/medicines"
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-2 transition-colors"
                >
                    <ArrowLeft size={14} /> Back to Medicines
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
                <p className="text-muted-foreground">
                    You have {items.length} items in your cart
                </p>
            </div>

            {items.length > 0 && (
                <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 border-destructive/20"
                    onClick={() => clearCart()}
                    disabled={isClearing}
                >
                    <Trash2 size={16} className="mr-2" /> Clear Cart
                </Button>
            )}
        </div>
    );
};

export default CartHeader;