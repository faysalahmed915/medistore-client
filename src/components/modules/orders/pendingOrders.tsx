/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/types/validations/order';
import { Calendar, Clock, MapPin, CheckCircle2, Package } from 'lucide-react';

const ORDER_STEPS = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"];

const PendingOrders = ({ pendingOrders, OrderStatusConfig }: any) => {
    return (
        <div className="space-y-8">

            <div className="flex items-center gap-3 mb-8">
                <Package className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">Orders on Progress</h1>
            </div>

            {pendingOrders.map((order: Order) => {
                const StatusIcon = OrderStatusConfig[order.orderStatus as keyof typeof OrderStatusConfig]?.icon || Clock;

                // বর্তমান স্ট্যাটাস অনুযায়ী প্রোগ্রেস ইনডেক্স বের করা
                const currentStepIndex = ORDER_STEPS.indexOf(order.orderStatus);

                return (
                    <Card key={order.id} className="overflow-hidden border-l-4 border-l-primary shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="bg-muted/30 pb-4">
                            <div className="flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${OrderStatusConfig[order.orderStatus]?.color.replace('text-', 'bg-').replace('600', '100')}`}>
                                        <StatusIcon size={20} className={OrderStatusConfig[order.orderStatus]?.color} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</p>
                                        <p className="font-mono text-sm font-bold">#{order.id.slice(-8).toUpperCase()}</p>
                                    </div>
                                </div>

                                <Badge variant="secondary" className="capitalize px-4 py-1">
                                    Expected in 2-3 Days
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-8">
                            {/* --- Progress Bar / Stepper Section --- */}
                            <div className="relative mb-12 px-2">
                                <div className="flex justify-between items-center w-full relative z-10">
                                    {ORDER_STEPS.map((step, index) => {
                                        const isCompleted = index <= currentStepIndex;
                                        const isActive = index === currentStepIndex;

                                        return (
                                            <div key={step} className="flex flex-col items-center gap-2">
                                                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isCompleted ? "bg-primary border-primary text-white" : "bg-background border-muted-foreground/30 text-muted-foreground"
                                                    } ${isActive ? "ring-4 ring-primary/20 scale-110" : ""}`}>
                                                    {isCompleted ? <CheckCircle2 size={16} /> : <span className="text-xs">{index + 1}</span>}
                                                </div>
                                                <p className={`text-[10px] md:text-xs font-bold uppercase tracking-tighter ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>
                                                    {step}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Background Connecting Line */}
                                <div className="absolute top-4 left-0 w-full h-0.5 bg-muted -z-0"></div>
                                {/* Animated Progress Line */}
                                <div
                                    className="absolute top-4 left-0 h-[2px] bg-primary transition-all duration-700 ease-in-out -z-0"
                                    style={{ width: `${(currentStepIndex / (ORDER_STEPS.length - 1)) * 100}%` }}
                                ></div>
                            </div>

                            {/* Order Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold">Order Date</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold">Delivery To</p>
                                        <p className="text-sm text-muted-foreground line-clamp-1">{order.shippingAddress}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4 opacity-50" />

                            {/* Item Summary */}
                            <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg space-y-2">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">{item.medicine.name} <span className="text-xs italic ml-1">(x{item.quantity})</span></span>
                                        <span className="font-semibold">৳{(item.unitPrice * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center pt-2 border-t mt-2">
                                    <span className="text-sm font-bold">Payable Total</span>
                                    <span className="text-lg font-black text-primary">৳{order.totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default PendingOrders;