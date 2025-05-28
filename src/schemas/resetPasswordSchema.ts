import { z } from "zod";

export const resetPasswordSchema = z
  .object({
     password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" })
      .max(6, { message: "Password must be at most 6 characters" }),
      
    confirmPassword: z
      .string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });