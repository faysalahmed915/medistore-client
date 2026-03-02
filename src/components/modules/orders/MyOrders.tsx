import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin } from 'lucide-react';
import React from 'react';

const MyOrders = ({orders, OrderStatusConfig}) => {
    return (
        <div className="space-y-6">
          {orders.map((order: any) => {
            const StatusIcon = OrderStatusConfig[order.status as keyof typeof OrderStatusConfig]?.icon || Clock;

            return (
              <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="bg-slate-50/50 pb-4">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</p>
                      <p className="font-mono text-sm font-bold">#{order.id.slice(-8).toUpperCase()}</p>
                    </div>

                    <Badge variant="outline" className={`${OrderStatusConfig[order.status as keyof typeof OrderStatusConfig]?.color} flex gap-1 items-center px-3 py-1`}>
                      <StatusIcon size={14} />
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold">Ordered On</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold">Shipping Address</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{order.shippingAddress}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{item.medicine.name}</span>
                          <span className="text-muted-foreground">x {item.quantity}</span>
                        </div>
                        <span className="font-medium">৳{(item.unitPrice * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Payment Method: <span className="font-bold text-slate-700">{order.paymentMethod}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Amount</p>
                      <p className="text-xl font-black text-primary">৳{order.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
    );
};

export default MyOrders;