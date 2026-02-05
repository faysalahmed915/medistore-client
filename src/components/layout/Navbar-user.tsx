"use client";

import { useSession } from "@/hooks/use-session";

export function NavbarUser() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;

  return <div>{session ? session.user.email : "Login"}</div>;
}
