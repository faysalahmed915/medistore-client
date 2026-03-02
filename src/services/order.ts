import axiosInstance from "@/lib/axios";
import { Order, OrderFormValues } from "@/types/validations/order";


// এপিআই থেকে যে জেনেরিক রেসপন্স আসে তার জন্য একটি টাইপ
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const OrderService = {
  // orderData: any এর বদলে OrderFormValues ব্যবহার করা হলো
  createOrder: async (orderData: OrderFormValues): Promise<ApiResponse<Order>> => {
    const { data } = await axiosInstance.post<ApiResponse<Order>>("/api/orders", orderData);
    return data;
  },

  getMyOrders: async (): Promise<ApiResponse<Order[]>> => {
    const { data } = await axiosInstance.get<ApiResponse<Order[]>>("/api/orders/my-orders");
    return data;
  },
};