"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCartStore } from "@/store/useCartStore";
import { CartService } from "@/services/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import NoCartItem from "./NoCartItem";
import CartHeader from "./CartHeader";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function CartDetails() {
  const queryClient = useQueryClient();
  const { items, totalPrice } = useCartStore();

  // সিলেক্টেড আইটেম আইডিগুলো রাখার জন্য স্টেট
  const [selectedIds, setSelectedIds] = useState<string[]>(items.map(i => i.id));

  const { mutate: updateQty, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      CartService.updateQuantity(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Quantity update failed!"),
  });

  // পরিবর্তন: সিলেক্টেড আইটেমগুলোর সাব-টোটাল ক্যালকুলেশন
  const selectedItems = items.filter(item => selectedIds.includes(item.id));
  const selectedTotal = selectedItems.reduce((acc, curr) => acc + (curr.quantity * curr.medicine.price), 0);

  // পরিবর্তন: চেক বক্স হ্যান্ডলার
  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // ৩. আইটেম রিমুভ করার মিউটেশন
  const { mutate: removeItem, isPending: isRemoving } = useMutation({
    mutationFn: (id: string) => CartService.removeItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart");
    },
  });



  return (
    <div className="container mx-auto px-4 py-10 min-h-[80vh]">
      {/* Header Section */}
      <CartHeader />

      {items.length === 0 ? (
        <NoCartItem />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
                    {/* পরিবর্তন: কার্ডের ভেতরে সিলেক্ট অপশন/চেকবক্স */}
                    <div className="flex items-center px-2">
                      <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onCheckedChange={() => toggleSelect(item.id)}
                      />
                    </div>
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
                  <span>৳{selectedTotal.toLocaleString()}</span>
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
                    ৳{selectedTotal.toLocaleString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                {!selectedItems.length ?<Button className="w-full h-12 text-md font-semibold bg-slate-900 shadow-lg" size="lg">
                  Select Items to CheckOut
                </Button> : <Link href={{ pathname: '/checkout', query: { ids: selectedIds.join(',') } }} className="w-full">
                  <Button className="w-full h-12 text-md font-semibold bg-slate-900 shadow-lg" size="lg">
                    Checkout Now
                  </Button>
                </Link>}

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