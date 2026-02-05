"use client";

import { authClient } from "@/lib/auth-client";

// Rename the import so it doesn't clash with your function name
const { useSession: useBetterAuthSession } = authClient;

export function useSession() {
  // Now it calls the library hook, not itself
  return useBetterAuthSession();
}