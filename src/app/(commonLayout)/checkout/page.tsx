"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handlePlaceOrder = async () => {
    if (!address) return alert("Please enter shipping address");

    const orderData = {
      items: items.map(item => ({
        medicineId: item.medicine.id,
        quantity: item.quantity
      })),
      shippingAddress: address,
      paymentMethod: "COD" // ডিফল্ট ক্যাশ অন ডেলিভারি
    };

    try {
      // API Call: await OrderService.createOrder(orderData);
      clearCart();
      router.push("/dashboard/orders?success=true");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle>Shipping Information</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label className="text-sm font-medium">Full Address</label>
            <Input 
              placeholder="House #, Road #, City" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.medicine.name} (x{item.quantity})</span>
              <span>৳{item.medicine.price * item.quantity}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>৳{totalPrice}</span>
          </div>
          <Button className="w-full mt-4" onClick={handlePlaceOrder}>Confirm Order</Button>
        </CardContent>
      </Card>
    </div>
  );
}