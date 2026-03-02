"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Loader2, CreditCard, Truck } from "lucide-react";

import { useCartStore } from "@/store/useCartStore";
import { OrderService } from "@/services/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutForm() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { items, totalPrice, clearCart } = useCartStore();

    // ১. অর্ডার তৈরি করার মিউটেশন
    const { mutate: placeOrder, isPending } = useMutation({
        mutationFn: OrderService.createOrder,
        onSuccess: (response) => {
            toast.success("Order placed successfully!");
            // সাকসেস হলে ক্যাশ ইনভ্যালিড করা যাতে ডাটা রিফ্রেশ হয়
            queryClient.invalidateQueries({ queryKey: ["cart"] }); 
            queryClient.invalidateQueries({ queryKey: ["my-orders"] }); // অর্ডার লিস্ট রিফ্রেশ করার জন্য যোগ করা হয়েছে
            clearCart(); 
            router.push(`/orders/success/${response.data.id}`); 
        },
        onError: (error: any) => {
            // ব্যাকএন্ড থেকে আসা সুনির্দিষ্ট এরর মেসেজ (যেমন: Insufficient stock) দেখাবে
            const message = error.response?.data?.message || "Order failed. Check stock.";
            toast.error(message);
        },
    });

    // ২. TanStack Form হ্যান্ডলিং
    const form = useForm({
        defaultValues: {
            shippingAddress: "",
            paymentMethod: "COD" as "COD" | "CARD", // ব্যাকএন্ড এনুম অনুযায়ী ক্যাপিটাল লেটার ব্যবহার নিশ্চিত করা হয়েছে
        },
        onSubmit: async ({ value }) => {
            if (items.length === 0) return toast.error("Your cart is empty");

            // ব্যাকএন্ডের payload এর সাথে হুবহু মিল রেখে ডাটা ফরম্যাট
            const orderPayload = {
                items: items.map((item) => ({
                    medicineId: item.medicine.id,
                    quantity: item.quantity,
                })),
                shippingAddress: value.shippingAddress,
                paymentMethod: value.paymentMethod, // সরাসরি COD বা CARD পাঠাবে
            };

            placeOrder(orderPayload);
        },
    });

    if (items.length === 0) return null;

    return (
        <Card className="border-primary/10 shadow-lg">            
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <CardContent className="space-y-6">
                    {/* শিপিং অ্যাড্রেস */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Full Delivery Address</Label>
                        <form.Field
                            name="shippingAddress"
                            validators={{
                                onChange: ({ value }) => (!value ? "Address is required" : undefined),
                            }}
                        >
                            {(field) => (
                                <>
                                    <Textarea
                                        id="address"
                                        placeholder="House#, Road#, Area, City..."
                                        className={field.state.meta.errors.length ? "border-destructive" : ""}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors && (
                                        <p className="text-xs text-destructive mt-1">
                                            {field.state.meta.errors.join(", ")}
                                        </p>
                                    )}
                                </>
                            )}
                        </form.Field>
                    </div>

                    {/* পেমেন্ট মেথড */}
                    <div className="space-y-3">
                        <Label>Payment Method</Label>
                        <form.Field name="paymentMethod">
                            {(field) => (
                                <RadioGroup
                                    value={field.state.value}
                                    onValueChange={(val) => field.handleChange(val as "COD" | "CARD")}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div>
                                        {/* value="COD" ব্যাকএন্ড এনুমের সাথে সরাসরি কানেক্টেড */}
                                        <RadioGroupItem value="COD" id="cod" className="peer sr-only" />
                                        <Label
                                            htmlFor="cod"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                        >
                                            <Truck className="mb-2 h-6 w-6" />
                                            <span className="text-xs font-medium">Cash on Delivery</span>
                                        </Label>
                                    </div>
                                    <div>
                                        {/* value="CARD" ব্যাকএন্ড এনুমের সাথে সরাসরি কানেক্টেড */}
                                        <RadioGroupItem value="CARD" id="card" className="peer sr-only" />
                                        <Label
                                            htmlFor="card"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                        >
                                            <CreditCard className="mb-2 h-6 w-6" />
                                            <span className="text-xs font-medium">Card Payment</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            )}
                        </form.Field>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 border-t pt-6">
                    <div className="flex justify-between w-full text-lg font-bold">
                        <span>Payable Amount</span>
                        <span className="text-primary">৳{totalPrice.toLocaleString()}</span>
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 text-md"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing Order...
                            </>
                        ) : (
                            "Confirm & Place Order"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}