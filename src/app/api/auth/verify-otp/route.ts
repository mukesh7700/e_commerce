import  jwt  from 'jsonwebtoken';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OTP from "@/models/OTP";
import User from "@/models/User";

export async function POST(request: Request) {
   try {
    await dbConnect();
    const { otp, email } = await request.json();

    if (!otp || !email) {
      return NextResponse.json({ message: "OTP and email are required" }, { status: 400 });
    }

    const otpDoc = await OTP.findOne({ code: otp, email });

    if (!otpDoc) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    if (otpDoc.expiresAt < new Date()) {
      return NextResponse.json({ message: "OTP has expired" }, { status: 400 });
    }

     const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await OTP.deleteOne({ _id: otpDoc._id });

    const secret = process.env.SECRET_KEY;
    if (!secret) {
      console.error("SECRET_KEY is not defined in environment variables.");
      return NextResponse.json({ message: "Server misconfiguration" }, { status: 500 });
    }

    const resetToken = jwt.sign({ userId: user._id  }, secret, { expiresIn: '15m' });

    return NextResponse.json({ message: "OTP verified", token: resetToken }, { status: 200 });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}