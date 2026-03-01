import { useQuery } from "@tanstack/react-query";
import { CartService } from "@/services/cart";
import { useAuth } from "@/providers/auth-provider";

export const useCart = () => {
  const { user } = useAuth();

  const totalItems =useQuery({
    queryKey: ["cart"], // এই কী (key) ব্যবহার করলে সব জায়গায় একই ডেটা পাওয়া যাবে
    queryFn: () => CartService.getMyCart(),
    enabled: !!user, // ইউজার লগইন না থাকলে কল হবে না
    staleTime: 1000 * 60 * 5, // ৫ মিনিট পর্যন্ত ডেটা 'টাটকা' থাকবে, বারবার কল হবে না
  }); 


  return totalItems
  // return useQuery({
  //   queryKey: ["cart"], // এই কী (key) ব্যবহার করলে সব জায়গায় একই ডেটা পাওয়া যাবে
  //   queryFn: () => CartService.getMyCart(),
  //   enabled: !!user, // ইউজার লগইন না থাকলে কল হবে না
  //   staleTime: 1000 * 60 * 5, // ৫ মিনিট পর্যন্ত ডেটা 'টাটকা' থাকবে, বারবার কল হবে না
  // });
};