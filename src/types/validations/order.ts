import * as z from "zod";

// ১. পেমেন্ট মেথড এনাম (আপনার প্রিজমা অনুযায়ী)
const paymentMethodEnum = z.enum(["COD", "CARD"]);

// ২. প্রতিটি আইটেমের জন্য স্কিমা (Direct Buy বা Cart দুই ক্ষেত্রেই লাগবে)
export const orderItemSchema = z.object({
  medicineId: z.string().min(1, "Medicine ID is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
});

// ৩. মেইন অর্ডার ফর্ম স্কিমা (চেকআউট পেজের জন্য)
export const orderSchema = z.object({
  shippingAddress: z.string().min(10, "Shipping address must be detailed (at least 10 chars)"),
  paymentMethod: paymentMethodEnum.default("COD"),
  items: z.array(orderItemSchema).min(1, "At least one item is required to place an order"),
});

// ৪. টাইপ এক্সপোর্ট (Zustand বা API কল করার জন্য)
export type OrderFormValues = z.infer<typeof orderSchema>;

// ৫. অর্ডারের ফুল টাইপ (ড্যাশবোর্ডে ডাটা রেন্ডার করার জন্য)
export type Order = {
  id: string;
  orderStatus: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: "COD" | "CARD";
  userId: string;
  items: Array<{
    id: string;
    quantity: number;
    unitPrice: number;
    medicine: {
      id: string;
      name: string;
      image?: string;
    };
  }>;
  createdAt: Date | string;
  updatedAt: Date | string;
};