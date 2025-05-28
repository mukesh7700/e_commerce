import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" })
      .max(6, { message: "Password must be at most 6 characters" }),
      
});
