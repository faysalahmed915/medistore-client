import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    // আপনার এক্সপ্রেস ব্যাকএন্ডের মেইন ইউআরএল (যেমন: http://localhost:5000)
    // এটি Express এ ডাটা ফেচিং বা এপিআই কলের জন্য ব্যবহৃত হবে।
    BACKEND_URL: z.url(),

    // আপনার নেক্সট জেএস অ্যাপের ইউআরএল (যেমন: http://localhost:3000)
    // এটি মূলত রিডাইরেক্ট বা মেটাডাটা জেনারেশনে লাগে।
    FRONTEND_URL: z.url(),

    // আপনার এক্সপ্রেস ব্যাকএন্ডের এপিআই বেস পাথ (যেমন: http://localhost:5000/api/v1)
    // এটি ডাইনামিক ডাটা (মেডিসিন, অর্ডার) ফেচ করার জন্য ব্যবহৃত হয়।
    API_URL: z.url(),

    // Better Auth-এর এন্ডপয়েন্ট (যেমন: http://localhost:5000/api/auth)
    // এটি proxy.ts বা middleware-এ সেশন চেক করার জন্য (userService.getSession) ব্যবহৃত হয়।
    // Better Auth যদি এক্সপ্রেস ব্যাকএন্ডে থাকে, তবে এটি ব্যাকএন্ডেরই একটি পাথ হবে।
    AUTH_URL: z.url(),
  },

  client: {
    // ক্লায়েন্ট সাইড বা ব্রাউজারে টেস্ট করার জন্য এক্সামপল।
    // অবশ্যই NEXT_PUBLIC_ দিয়ে শুরু হতে হবে।
    NEXT_PUBLIC_TEST: z.string(),
  },

  runtimeEnv: {
    // এগুলি .env ফাইল থেকে ভ্যালুগুলো রিড করে runtime-এ প্রোভাইড করে।
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
  },
});