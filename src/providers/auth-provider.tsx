"use client";

import React, { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

type Session = typeof authClient.$Infer.Session;

const AuthContext = createContext<{
  session: Session | null;
  user: Session["user"] | null;
} | null>(null);

export function AuthProvider({ 
  children, 
  initialSession 
}: { 
  children: React.ReactNode;
  initialSession: Session | null; 
}) {
  // We use 'initData' to sync the client hook with the server data instantly
  const { data : session } = authClient.useSession();
  const currentSession = session !== undefined ? session : initialSession;

  const value = {
    session: currentSession,
    user: currentSession?.user ?? null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};