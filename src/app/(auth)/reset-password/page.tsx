"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button, Card, CardContent, toast } from "@jamsr-ui/react";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import {  Logo } from "../../../../public/svg";
import { useEffect, useState } from "react";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function SignUpPage() {
  const [token, setToken] = useState("")
  const router = useRouter();
    const searchParams = useSearchParams()

    useEffect(() => {
    const tokenParam = searchParams.get("token")
    if (!tokenParam) {
      router.push("/forgot-password")
      return
    }
    setToken(tokenParam)
  }, [searchParams, router])
 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    try {
      const res = await fetch(`/api/auth/reset-password?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to reset password")
      }
      toast.success("Password Reset Successful");
      router.push("/login");
    } catch  {
      toast.error("Network error, please try again");
     
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow bg-gray-100 dark:bg-gray-800">
        <CardContent>
          <div className="flex justify-center items-center p-1">
            <Logo />
          </div>
          
          <h1 className="text-3xl tracking-tight  font-bold text-center mb-6 dark:text-white">
           Reset Password
            
          </h1>
         

          

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 mb-2 space-y-4">
            
            <div>
              <Input
                className="top-[-0.6px]"
                label="Password"
                type="password"
                size="lg"
                isSecuredText
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <Input
                className="top-[-0.6px]"
                label="Confirm Password"
                type="password"
                size="lg"
                isSecuredText
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" size="lg" color="primary">
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
          <div className="flex justify-center items-center">
           <Button variant="text" size="lg" color="primary" disableAnimation disableRipple  onClick={() => router.push("/login")} className="hover:underline underline-offset-4" > Back to login</Button>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}