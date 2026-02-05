"use client";

import { useAuth } from "@/providers/auth-provider";

export function UserTest() {
  const { user } = useAuth(); 

//   console.log(user);

  if (!user) return <button>Sign In</button>;

  return (
    <div>
      <p>Hello, {user.name}</p>
    </div>
  );
}