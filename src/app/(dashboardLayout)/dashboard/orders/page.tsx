"use client";

import { useQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderService } from "@/services/order";
import { Order } from "@/types/validations/order";

export default function MyOrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => OrderService.getMyOrders(),
  });

  if (isLoading) return <p>Loading orders...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.data.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">{order.id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>৳{order.totalAmount}</TableCell>
                <TableCell>
                  <Badge variant={order.orderStatus === 'DELIVERED' ? 'default' : 'secondary'}>
                    {order.orderStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}