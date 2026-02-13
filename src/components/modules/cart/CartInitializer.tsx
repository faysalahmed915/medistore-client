"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CartService } from "@/services/cart";
import { useCartStore } from "@/store/useCartStore";
import { useAuth } from "@/providers/auth-provider";

export const CartInitializer = () => {
  const { user } = useAuth();
  const setCart = useCartStore((state) => state.setCart);

  // ১. এপিআই থেকে কার্ট ডাটা ফেচ করা
  const { data: cartResponse } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.getMyCart(),
    enabled: !!user, // ইউজার লগইন থাকলে তবেই রান হবে
  });

  // ২. যখনই ডাটা আসবে, তখন Zustand স্টোর আপডেট করা
  useEffect(() => {
    if (cartResponse?.success && cartResponse.data) {
      setCart(cartResponse.data);
    }
  }, [cartResponse, setCart]);

  return null; // এটি কোনো UI রেন্ডার করবে না, শুধু ব্যাকগ্রাউন্ডে কাজ করবে
};