import { create } from 'zustand';

// ১. আইটেমের জন্য টাইপ
interface CartItem {
  id: string;
  quantity: number;
  medicine: {
    id: string;
    name: string;
    price: number;
    image: string | null;
  };
}

// ২. এপিআই থেকে আসা রেসপন্স ডাটার টাইপ
interface CartResponse {
  id: string;
  userId: string;
  items: CartItem[];
}

// ৩. স্টোরের মূল ইন্টারফেস
interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  setCart: (cartData: CartResponse | null) => void; // any এর বদলে CartResponse
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  setCart: (cartData) => {
    // যদি cartData না থাকে তবে ডিফল্ট খালি অ্যারে
    const items = cartData?.items || [];
    
    // টাইপ সেফ রিডিউসার
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc, item) => acc + (item.quantity * item.medicine.price), 0);
    
    set({ items, totalItems, totalPrice });
  },

  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));