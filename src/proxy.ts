import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { UserRole } from "./constants/role";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log(`[PROXY_LOG]: Intercepting -> ${pathname}`);

  // রিকোয়েস্ট থেকে সরাসরি কুকি স্ট্রিং নিন
  // const cookieString = request.headers.get("cookie") || "";
  
  console.log(`[PROXY_DEBUG]: Path: ${pathname}`);

  // let isAuthenticated = false;
  // let isAdmin = false;

  const { data } = await userService.getSession();
  const user = data?.user;

  console.log("Session Data:", data); 

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // if (data) {
  //   isAuthenticated = true;
  //   isAdmin = data.user.role === UserRole.ADMIN;
  // }

  //* User in not authenticated at all
  // if (!isAuthenticated) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // শুধুমাত্র ADMIN এবং SELLER ড্যাশবোর্ডে ঢুকতে পারবে
  if (pathname.startsWith("/dashboard")) {
    const hasAccess = user.role === UserRole.ADMIN || user.role === "SELLER";
    
    if (!hasAccess) {
      // কাস্টমার ড্যাশবোর্ড দেখার ট্রাই করলে হোমপেজে পাঠিয়ে দিন
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};