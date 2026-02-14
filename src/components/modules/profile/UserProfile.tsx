"use client";

import React from "react";
import { useAuth } from "@/providers/auth-provider";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, Phone, ShieldCheck, UserCircle } from "lucide-react";
import { format } from "date-fns";
import { UserSchema } from "@/types/validations/user";


export default function UserProfile() {
  const { user } = useAuth() as { user: UserSchema | null };

  if (!user) return <p className="text-center p-10">Loading profile...</p>;

  // রোলের উপর ভিত্তি করে ব্যাজের কালার নির্ধারণ
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN": return <Badge className="bg-destructive text-white">Admin</Badge>;
      case "SELLER": return <Badge className="bg-blue-600 text-white">Seller</Badge>;
      default: return <Badge variant="secondary">Customer</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Card className="overflow-hidden border-none shadow-lg">
        {/* প্রোফাইল হেডার / কভার ফটো এরিয়া */}
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10" />
        
        <CardHeader className="relative pb-0">
          <div className="flex flex-col sm:flex-row items-center gap-6 -mt-16">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
              <AvatarImage src={user.image ?? ""} alt={user.name} />
              <AvatarFallback className="text-3xl bg-muted">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
                {getRoleBadge(user.role)}
                {user.emailVerified && (
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                )}
              </div>
              <CardDescription className="text-lg flex items-center justify-center sm:justify-start gap-1">
                <Mail className="w-4 h-4" /> {user.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* পার্সোনাল ডিটেইলস সেকশন */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Personal Information</h3>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <UserCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">Full Name</p>
                <p className="text-foreground">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">Phone Number</p>
                <p className="text-foreground">{user.phone ?? "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CalendarDays className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">Joined On</p>
                <p className="text-foreground">
                  {format(new Date(user.createdAt), "PPP")}
                </p>
              </div>
            </div>
          </div>

          {/* অ্যাকাউন্ট স্ট্যাটাস সেকশন */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Account Settings</h3>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 text-sm">
              <span className="font-medium">Account Status</span>
              <Badge variant={user.status === "ACTIVE" ? "outline" : "destructive"}>
                {user.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 text-sm">
              <span className="font-medium">Email Verification</span>
              <span className={user.emailVerified ? "text-green-600 font-bold" : "text-amber-600"}>
                {user.emailVerified ? "Verified" : "Unverified"}
              </span>
            </div>

            <div className="p-3 text-xs text-muted-foreground italic">
              Last updated: {format(new Date(user.updatedAt), "PPP p")}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}