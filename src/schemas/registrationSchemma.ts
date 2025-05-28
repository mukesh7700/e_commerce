import { z } from "zod";

export const userName = z
  .string()
  .min(2, "Username must be at least 2 characters ")
  .max(20, "Username must be at most 20 characters")
  

export const registrationSchema = z
  .object({
    username: userName,
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" })
      .max(6, { message: "Password must be at most 6 characters" }),
      
    email: z.string().email({ message: "Invalid email address" }),
    confirmPassword: z
      .string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
