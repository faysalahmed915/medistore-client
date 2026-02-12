"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function QueryProviders({ children }: { children: ReactNode }) {
  // useState ব্যবহার করা হয় যাতে প্রতি রেন্ডারে নতুন ক্লায়েন্ট তৈরি না হয়
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}