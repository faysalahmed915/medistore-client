"use client";

import { useQuery } from "@tanstack/react-query";
import { OrderService } from "@/services/order";
import {
  Package,
  Calendar,
  MapPin,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import OrderHistorySkeleton from "./OrderHistorySkeleton";
import NoOrder from "./NoOrder";
import MyOrders from "./MyOrders";

// অর্ডার স্ট্যাটাস অনুযায়ী কালার কোড
const OrderStatusConfig = {
  PLACED: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: Package },
  PROCESSING: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock },
  SHIPPED: { color: "bg-purple-100 text-purple-700 border-purple-200", icon: Truck },
  DELIVERED: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
  CANCELLED: { color: "bg-red-100 text-red-700 border-red-200", icon: AlertCircle },
};

export default function OrderHistory() {
  const { data, isLoading, isError } =
    useQuery({
      queryKey: ["my-orders"],
      queryFn: () => OrderService.getMyOrders(),
      // retry: true,
    });

  const orders = data?.data || [];

  console.log(orders);

  // if (isLoading) return <OrderHistorySkeleton />;

  // if (isError) return <div className="text-center py-20 text-destructive">Failed to load orders.</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Package className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">My Order History</h1>
      </div>

      {isLoading && <OrderHistorySkeleton />}

      {orders.length === 0 ? (
        <NoOrder />
      ) : (
        <MyOrders orders={orders} OrderStatusConfig={OrderStatusConfig} />
      )}
    </div>
  );
}

