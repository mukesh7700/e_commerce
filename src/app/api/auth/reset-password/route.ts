import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

type ResetTokenPayload = {
  userId: string;
};
export async function POST(req: NextRequest) {
  await dbConnect();

  const { password } = await req.json();
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is missing" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as ResetTokenPayload;
    
      const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
     const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });

    }

    

   
   catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }
}
