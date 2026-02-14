import * as z from "zod";

// ১. এনামগুলো ডিফাইন করুন (আপনার ব্যাকএন্ড অনুযায়ী)
export const UserRoleEnum = z.enum(["CUSTOMER", "SELLER", "ADMIN"]);
export const UserStatusEnum = z.enum(["ACTIVE", "BANNED"]);

// ২. মেইন ইউজার স্কিমা
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  image: z.string().nullish(), // null বা undefined দুইটাই হতে পারে
  role: UserRoleEnum.default("CUSTOMER"),
  phone: z.string().nullish(),
  status: UserStatusEnum.default("ACTIVE"),
  createdAt: z.coerce.date(), // স্ট্রিং থাকলেও ডেট অবজেক্টে কনভার্ট করবে
  updatedAt: z.coerce.date(),
});

// ৩. টাইপস্ক্রিপ্ট ইন্টারফেস এক্সপোর্ট করুন
export type UserSchema = z.infer<typeof userSchema>;