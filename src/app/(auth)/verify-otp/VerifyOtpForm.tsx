"use client";
import {
  Button,
  Card,
  CardContent,
  toast,
} from "@jamsr-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Logo } from "../../../../public/svg";
import Link from "next/link";
import { otpSchema } from "@/schemas/otpSchema";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type VerifyFormData = z.infer<typeof otpSchema>;

const VerifyOtpForm = () => {
  const [email, setEmail] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (!emailParam) {
      router.push("/forgot-password");
    } else {
      setEmail(emailParam);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const otp = otpValues.join("");
    setValue("otp", otp);
  }, [otpValues, setValue]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (index < 5 && value) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otpValues];
      if (otpValues[index]) {
        newOtp[index] = "";
        setOtpValues(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtpValues(newOtp);
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, 6);
      setOtpValues(newOtp);
      newOtp.forEach((digit, i) => {
        if (otpRefs.current[i]) {
          otpRefs.current[i]!.value = digit;
        }
      });
      otpRefs.current[5]?.focus();
    }
  };

  const onSubmit = async (data: VerifyFormData) => {
    if (!email) return;

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: data.otp, email }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      toast.success("Otp verified successfully!");
      router.push(`/reset-password?token=${result.token}`);
    } catch {
      toast.error("Network error, please try again");
    }
  };

  const resendOtp = async () => {
    if (!email) return;
    try {
      setResendDisabled(true);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to resend OTP");
        return;
      }

      toast.success("OTP resent to your email!");
    } catch {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setTimeout(() => setResendDisabled(false), 30000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow bg-gray-100 dark:bg-gray-800">
        <CardContent>
          <div className="flex justify-center items-center p-1">
            <Logo />
          </div>

          <h1 className="text-4xl tracking-tight font-bold text-center mb-2 dark:text-white">
            Verify OTP
          </h1>
          <p className="text-center">Enter the 6-digit code sent to {email}</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 mb-2 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                OTP Code
              </label>
              <div className="flex gap-2 justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otpValues[i]}
                    className="w-12 h-12 text-center border dark:border-gray-500 rounded-md text-lg font-semibold focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    onPaste={handleOtpPaste}
                    ref={(el) => {
                      otpRefs.current[i] = el;
                    }}
                  />
                ))}
              </div>
              {errors.otp && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <Button type="submit" className="mt-0 w-full" size="lg" color="primary">
              {isSubmitting ? "Submitting ..." : "Submit"}
            </Button>
          </form>
          <div className="text-center">
            <h1>
              Didn&apos;t receive the code?
              <Button
                variant="text"
                disableAnimation
                disableRipple
                className="px-0 hover:underline"
                onClick={resendOtp}
                disabled={resendDisabled}
              >
                Resend OTP
              </Button>
            </h1>
            <Link
              href="/forgot-password"
              className="font-semibold text-gray-500"
            >
              <span className="text-blue-500 hover:text-blue-700 dark:hover:text-gray-300">
                Back to Forgot Password
              </span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtpForm;
