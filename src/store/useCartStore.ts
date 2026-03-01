import { create } from 'zustand';

interface CartItem {
  id: string;
  quantity: number;
  createdAt: string; // [নোট: নিশ্চিত করুন আপনার ব্যাকএন্ড থেকে createdAt আসছে]
  medicine: {
    id: string;
    name: string;
    price: number;
    image: string | null;
  };
}

interface CartResponse {
  id: string;
  userId: string;
  items: CartItem[];
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  setCart: (cartData: CartResponse | null) => void; 
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  setCart: (cartData) => {
    const rawItems = cartData?.items || [];
    
    // তৈরি হওয়ার সময় অনুযায়ী সর্টিং (Ascending Order - পুরাতন থেকে নতুন)
    const sortedItems = [...rawItems].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    const totalItems = sortedItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = sortedItems.reduce((acc, item) => acc + (item.quantity * item.medicine.price), 0);
    
    set({ items: sortedItems, totalItems, totalPrice });
  },

  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));