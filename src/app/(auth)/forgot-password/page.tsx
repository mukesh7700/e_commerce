"use client"
import { Button, Card, CardContent, Input, toast } from '@jamsr-ui/react'
import React from 'react'
import { Logo } from '../../../../public/svg'
import Link from 'next/link'
import { forgotPasswordSchema } from '@/schemas/forgotPasswordSchema';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


type ForgetFormData = z.infer<typeof forgotPasswordSchema>;

const Page = () => {

const router = useRouter();

const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgetFormData) => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      toast.success("Otp sent successful!");
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch {
      toast.error("Network error, please try again");
    }
  };

  return (
    <div>
<div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow bg-gray-100 dark:bg-gray-800">
        <CardContent>
          <div className="flex justify-center items-center p-1">
            <Logo />
          </div>

          <h1 className="text-4xl tracking-tight font-bold text-center mb-2 dark:text-white">
            Forgot Password
          </h1>
          <p className='text-center'>Enter the email address associated with your account.</p>


          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 mb-2 space-y-4">
            <div>
              <Input
                className="top-[-0.6px]"
                label="Email"
                type="email"
                size="lg"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            
            
            <Button type="submit" className="mt-0 w-full" size="lg" color="primary">
              {isSubmitting ? "Submiting ..." : "Submit"}
            </Button>
          </form>
          <div className="flex justify-center items-center">
            <Link href="/registration" className="   font-semibold text-gray-500  ">
            Remember Password? <span className="text-blue-700 hover:text-gray-700 dark:hover:text-gray-300">Login</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

export default Page
