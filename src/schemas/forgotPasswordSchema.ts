import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  
});
