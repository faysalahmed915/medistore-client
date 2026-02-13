"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // Redirect after success
          router.refresh();      // Clear Next.js server cache
        },
      },
    });
  };

  return (
    <Button onClick={handleSignOut}
    className="text-amber-600"
    variant="ghost" 
    >
      Sign Out
    </Button>
  );
}