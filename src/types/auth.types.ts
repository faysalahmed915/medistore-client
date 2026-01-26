import { z } from "zod";

/**
 * Zod schema for register form validation
 * - Single source of truth for validation + types
 */
export const registerFormSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.email(),
  password: z.string().min(8, "Minimum length is 8"),
});

/**
 * TypeScript type inferred directly from Zod schema
 * This guarantees runtime + compile-time consistency
 */
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
