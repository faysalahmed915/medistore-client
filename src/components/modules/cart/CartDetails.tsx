/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { ShoppingBag, Trash2, ArrowLeft, Plus, Minus, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCartStore } from "@/store/useCartStore";
import { CartService } from "@/services/cart"; // ১. আপনার দেওয়া কার্ট সার্ভিস ইমপোর্ট
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner"; // এরর বা সাকসেস মেসেজের জন্য

export default function CartDetails() {
  const queryClient = useQueryClient();
  const { items, totalPrice } = useCartStore();

  // ২. কোয়ান্টিটি আপডেট করার মিউটেশন (প্লাস/মাইনাস)
  const { mutate: updateQty, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      CartService.updateQuantity(id, quantity),
    onSuccess: () => {
      // এটি করার ফলে CartInitializer অটোমেটিক ব্যাকএন্ড থেকে নতুন ডাটা আনবে
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Quantity update failed!"),
  });

  // ৩. আইটেম রিমুভ করার মিউটেশন
  const { mutate: removeItem, isPending: isRemoving } = useMutation({
    mutationFn: (id: string) => CartService.removeItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart");
    },
  });

  // ৪. পুরো কার্ট ক্লিয়ার করার মিউটেশন
  const { mutate: clearCart, isPending: isClearing } =
    useMutation({
      mutationFn: () => CartService.clearCart(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success("cart cleared successfully");
      },
    });



  return (
    <div className="container mx-auto px-4 py-10 min-h-[80vh]">
      {/* Header Section */}
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
            disabled = {isClearing}
          >
            <Trash2 size={16} className="mr-2" /> Clear Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
                    <div className="relative h-24 w-24 rounded-lg bg-slate-100 overflow-hidden shrink-0 border">
                      {item.medicine.image ? (
                        <img
                          src={item.medicine.image}
                          alt={item.medicine.name}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[10px] text-slate-400">No Image</div>
                      )}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{item.medicine.name}</h3>
                          <Badge variant="secondary" className="mt-1 capitalize">
                            OTC Medicine
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-bold text-lg hidden sm:block">
                            ৳{(item.quantity * item.medicine.price).toLocaleString()}
                          </p>
                          {/* ৫. রিমুভ বাটন যা ব্যাকএন্ডে হিট করবে */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                            disabled={isRemoving}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                        <p className="text-sm text-muted-foreground">
                          ৳{item.medicine.price} / unit
                        </p>

                        {/* ৬. প্লাস-মাইনাস লজিক */}
                        <div className="flex items-center border rounded-md bg-white shadow-sm">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={item.quantity <= 1 || isUpdating}
                            onClick={() => updateQty({ id: item.id, quantity: item.quantity - 1 })}
                          >
                            <Minus size={12} />
                          </Button>

                          <span className="px-3 text-sm font-medium w-8 text-center">
                            {isUpdating ? <Loader2 size={10} className="animate-spin mx-auto" /> : item.quantity}
                          </span>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={isUpdating}
                            onClick={() => updateQty({ id: item.id, quantity: item.quantity + 1 })}
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:col-span-4">
            <Card className="sticky top-24 shadow-md border-primary/10">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>৳{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-base font-bold">Total Amount</p>
                    <p className="text-[10px] text-muted-foreground italic">Inc. all applicable taxes</p>
                  </div>
                  <span className="text-2xl font-black text-primary">
                    ৳{totalPrice.toLocaleString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full h-12 text-md font-semibold bg-slate-900 shadow-lg" size="lg">
                  Checkout Now
                </Button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">🛡️ Secure Payment</span>
                  <span>•</span>
                  <span>Verified Pharmacy</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}