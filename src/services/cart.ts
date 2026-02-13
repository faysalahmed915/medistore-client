import axiosInstance from "@/lib/axios";

export const CartService = {
  // কার্টে নতুন ঔষধ যোগ করা বা কোয়ান্টিটি আপডেট করা
  addToCart: async (medicineId: string, quantity: number) => {
    const { data } = await axiosInstance.post("/api/customer/cart", {
      medicineId,
      quantity,
    });
    return data;
  },

  // ইউজারের বর্তমান কার্টের সব আইটেম নিয়ে আসা
  getMyCart: async () => {
    const { data } = await axiosInstance.get("/api/cart");
    return data;
  },

  // কার্ট থেকে নির্দিষ্ট কোনো আইটেম রিমুভ করা
  removeItem: async (itemId: string) => {
    const { data } = await axiosInstance.delete(`/api/cart/${itemId}`);
    return data;
  },

  // সরাসরি কার্ট আইটেমের কোয়ান্টিটি আপডেট করা (যদি প্রয়োজন হয়)
  updateQuantity: async (itemId: string, quantity: number) => {
    const { data } = await axiosInstance.patch(`/api/cart/${itemId}`, {
      quantity,
    });
    return data;
  },
};