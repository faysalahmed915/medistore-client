"use client";

import { useQuery } from "@tanstack/react-query";
import { OrderService } from "@/services/order";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  Package2
} from "lucide-react";
import OrderHistorySkeleton from "./OrderHistorySkeleton";
import NoOrder from "./NoOrder";
import MyOrders from "./MyOrders";
import PendingOrders from "./pendingOrders";

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
  // console.log(isError);

  const orders = data?.data || [];


  const completedOrders = orders.filter((order) => order.orderStatus === "DELIVERED");
  const pendingOrders = orders.filter((order) => order.orderStatus !== "DELIVERED");

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Package2 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Orders on Progress</h1>
      </div>

      {isLoading && <OrderHistorySkeleton />}

      {orders.length === 0 ? (
        <NoOrder />
      ) : (
        <>
          <div>
            {pendingOrders.length > 0 && (
              <PendingOrders pendingOrders={pendingOrders} OrderStatusConfig={OrderStatusConfig} />
            )}
          </div>

          <div>
            <MyOrders completedOrders={completedOrders} OrderStatusConfig={OrderStatusConfig} />
          </div>
        </>
      )}
    </div>
  );
}

