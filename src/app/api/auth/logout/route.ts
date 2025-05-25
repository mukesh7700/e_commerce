import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("Logout: trying to clear token");

    const response = NextResponse.json(
      { message: "Logout successful", success: true },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/", // Must match login
      expires: new Date(0), // expire now
    });

    console.log("Logout: token cleared");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Logout failed", success: false },
      { status: 500 }
    );
  }
}
