"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Package, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent,  } from "@/components/ui/card";
import { OrderService } from "@/services/order";
import { Loader2 } from "lucide-react";

export default function OrderSuccessPage() {
    const { id } = useParams();
    const router = useRouter();

    // অর্ডারের ডিটেইলস ফেচ করা
    const { data: response, isLoading } = useQuery({
        queryKey: ["order", id],
        queryFn: () => OrderService.getOrderById(id as string),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-primary h-12 w-10" />
                <p className="mt-4 text-muted-foreground">Fetching order details...</p>
            </div>
        );
    }

    const order = response?.data;
    // const { totalAmount, paymentMethod} = order;

    console.log("order", order);

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <Card className="border-none shadow-none text-center">
                <CardContent className="space-y-6">
                    {/* Success Animation/Icon */}
                    <div className="flex justify-center">
                        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                            <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Order Placed Successfully!</h1>
                        <p className="text-muted-foreground">
                            Thank you for your purchase. Your order ID is <span className="font-mono font-bold text-foreground">#{id}</span>
                        </p>
                    </div>

                    {/* Order Brief Summary */}
                    <Card className="bg-muted/50 border-none">
                        <CardContent className="p-6 grid grid-cols-2 gap-4 text-left">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total Amount</p>
                                <p className="text-xl font-black">৳{order?.totalAmount.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Payment Method</p>
                                <p className="font-medium">{order?.paymentMethod === "COD" ? "Cash on Delivery" : "Paid via Card"}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button
                            variant="outline"
                            className="flex-1 gap-2"
                            onClick={() => router.push("/my-orders")}
                        >
                            <Package size={18} /> View My Orders
                        </Button>
                        <Button
                            className="flex-1 gap-2"
                            onClick={() => router.push("/medicines")}
                        >
                            <Home size={18} /> Continue Shopping <ArrowRight size={18} />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}