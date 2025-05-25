"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input, Button, Card, CardContent, Divider, toast } from "@jamsr-ui/react";
import { GoogleIcon, Logo } from "../../../../public/svg";
import Link from "next/link";
import { loginSchema } from "@/schemas/loginSchema";
import { signIn } from "next-auth/react";

type SignInFormData = z.infer<typeof loginSchema>;

export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      toast.success("Login successful!");
      router.push("/");
    } catch {
      toast.error("Network error, please try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow bg-gray-100 dark:bg-gray-800">
        <CardContent>
          <div className="flex justify-center items-center p-1">
            <Logo  />
          </div>

          <h1 className="text-3xl tracking-tight font-bold text-center mb-6 dark:text-white">
            Login to Jamsrworld
          </h1>

          <Button size="lg" className="w-full flex items-center justify-center gap-3 text-lg font-semibold mb-6" onClick={() => signIn("google")}>
            <span className="w-5 h-5"><GoogleIcon /></span>
            <span>Continue with Google</span>
          </Button>

          <Divider
            classNames={{
              divider: "rounded bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700",
            }}
          >
            OR
          </Divider>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 mb-2 space-y-4">
            <div>
              <Input
                className="top-[-0.6px]"
                label="Email"
                type="email"
                size="lg"
                {...register("identifier")}
              />
              {errors.identifier && (
                <p className="text-sm text-red-500">{errors.identifier.message}</p>
              )}
            </div>

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
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className=" mb-1 flex justify-end items-center">
            <Link href="/forgot-password" className=" text-blue-700 hover:underline underline-offset-4  ">
            Forgot Password? 
            </Link>
          </div>

            <Button type="submit" className="mt-0 w-full" size="lg" color="primary">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="flex justify-center items-center">
            <Link href="/registration" className="   font-semibold text-gray-500  ">
            New to Jamsrworld? <span className="text-blue-700 hover:text-gray-700 dark:hover:text-gray-300"> Register</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
