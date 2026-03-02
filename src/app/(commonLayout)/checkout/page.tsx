"use client"
import NoCartItem from '@/components/modules/cart/NoCartItem';
import CheckoutForm from '@/components/modules/orders/CheckoutForm';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import React from 'react';

const CheckOutPage = () => {
  const { data: cartResponse } = useCart();

  // কার্টে কয়টি আইটেম আছে তার হিসাব (Derived State)
  const cartItemCount = cartResponse?.data?.items?.length || 0;
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-xl mb-2 mx-auto font-bold">Shipping & Payment</CardTitle>
      </CardHeader>

      {cartItemCount === 0 ? <NoCartItem /> : <CheckoutForm />}
    </div>
  );
};

export default CheckOutPage;