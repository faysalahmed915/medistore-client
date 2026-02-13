"use client";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetDescription
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash2 } from "lucide-react";




export function CartDrawer({ children }: { children: React.ReactNode }) {
    const { items, totalPrice, clearCart } = useCartStore();

    

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag size={20} /> Your Cart
                    </SheetTitle>
                    <SheetDescription>
                        Review the medicines in your cart before proceeding to checkout.
                    </SheetDescription>
                </SheetHeader>

                <Separator className="my-4" />

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                        <ShoppingBag size={48} strokeWidth={1} className="mb-2 opacity-20" />
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="h-16 w-16 rounded bg-slate-100 flex-shrink-0 overflow-hidden">
                                            {item.medicine.image && (
                                                <img src={item.medicine.image} alt={item.medicine.name} className="object-cover h-full w-full" />
                                            )}
                                        </div>
                                        <div className="flex-1 text-sm">
                                            <h4 className="font-medium line-clamp-1">{item.medicine.name}</h4>
                                            <p className="text-muted-foreground">
                                                {item.quantity} x ৳{item.medicine.price}
                                            </p>
                                        </div>
                                        <div className="font-semibold">
                                            ৳{item.quantity * item.medicine.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="space-y-4 pt-6">
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>৳{totalPrice}</span>
                            </div>
                            <SheetFooter className="flex-col sm:flex-col gap-2">
                                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                                    Proceed to Checkout
                                </Button>
                                <Button variant="ghost" className="w-full text-red-500 hover:text-red-600" onClick={clearCart}>
                                    <Trash2 size={16} className="mr-2" /> Clear Cart
                                </Button>
                            </SheetFooter>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}