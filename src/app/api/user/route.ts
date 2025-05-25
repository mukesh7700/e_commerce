import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect"; // your MongoDB connect function
import User from "@/models/User"; // your Mongoose User model


export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Verify token
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY ?? "default_secret_key"
    ) as { id: string; email: string }; // match your sign-in payload

    // 3. Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 4. Return user info
    return NextResponse.json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { error: "Invalid token or server error" },
      { status: 500 }
    );
  }
}
