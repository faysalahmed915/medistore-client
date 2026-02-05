"use client";

import { authClient } from "@/lib/auth-client";

// import { createAuthClient } from "better-auth/react";

const { useSession } = authClient;

export function User() {
    const {
        data: session,
        isPending, //loading state
        error, //error object 
        refetch //refetch the session
    } = useSession()

if (isPending) return <div>Loading...</div>

    return {
        session,
        isPending,
        error,
        refetch
    }
}