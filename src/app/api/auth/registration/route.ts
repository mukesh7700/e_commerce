import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import RegistrationSuccess from "../../../../../emails/RegistrationEmail";
import { sendEmail } from "@/helper/sendEmail";
import React from "react";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
    }

    const emailComponent = React.createElement(RegistrationSuccess, {
      username,
    });

    const emailResponse = await sendEmail(
      email,
      "Registration Successful",
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
  } catch (error) {
    console.log("Error connecting to the database:", error);
    return Response.json(
      { success: false, message: "Database connection error" },
      { status: 500 }
    );
  }
}
