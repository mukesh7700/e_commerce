import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import OTPModel from "@/models/OTP";
import { generateOTP } from "@/utils/generateOTP";
import OTPEmail from "../../../../../emails/OTPEmail";
import React from "react";
import { sendEmail } from "@/helper/sendEmail";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();

    const { email } = body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const otp = generateOTP();

    // Remove existing OTPs for that email
    await OTPModel.deleteMany({ email });

    // Save new OTP
    await OTPModel.create({
      email,
      code: otp,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    });

    const emailComponent = React.createElement(OTPEmail, {
      email,
      otp,
    });

    const emailResponse = await sendEmail(
      email,
      "password reset OTP",
      emailComponent
    );

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }
    return Response.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
