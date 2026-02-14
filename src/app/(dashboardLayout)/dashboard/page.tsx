"use client";

import { useAuth } from "@/providers/auth-provider";
import { UserRole } from "@/constants/role";
// import { Loader2 } from "lucide-react";
import AdminDashboardView from "@/components/modules/dashboard/AdminDashboardView";
import SellerDashboardView from "@/components/modules/dashboard/SellerDashboardView";
import { UserSchema } from "@/types/validations/user";
// import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function DashboardPage() {
  const { user } = useAuth()as { user: UserSchema | null };

//   if (isLoading) return <Loader2 className="animate-spin text-primary" size={40} />;

  // রোলের ওপর ভিত্তি করে কন্ডিশনাল রেন্ডারিং
  if (user?.role === UserRole.ADMIN) {
    return <AdminDashboardView />;
  }

  if (user?.role === UserRole.SELLER) {
    return <SellerDashboardView />;
  }

  return null; 
}