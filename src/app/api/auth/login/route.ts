// src/app/api/sign-in/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const { identifier, password } = body;

    const user = await User.findOne({ email: identifier });
    if (!user || !user.password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email,     username: user.username,
    image: user.image, },
      process.env.SECRET_KEY ?? "default_secret_key_change_this",
      { expiresIn: "1d" }
    );

    const response = NextResponse.json(
      {
        message: "Signin successful",
        success: true,
        user: {
      id: user._id,
      email: user.email,
      username: user.username,
      image: user.image ?? "/default-avatar.png", 
    },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/", // ✅ MUST MATCH!
  maxAge: 60 * 60 * 24, // 1 day (optional for clarity)
});


    return response;

  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
