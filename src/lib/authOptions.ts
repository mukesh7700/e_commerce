// src/lib/authOptions.ts
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/models/User";
import mongoose from "mongoose";
import { sendEmail } from "@/helper/sendEmail";
import React from "react";
import RegistrationSuccess from "../../emails/RegistrationEmail";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials.password) {
          throw new Error("Email and password are required");
        }

        await dbConnect();
        const user = await UserModel.findOne({ email: credentials.identifier });

        if (!user) throw new Error("No user found");
        if (!user.password) throw new Error("Use Google login for this account");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        const userDoc = user as User & { _id: mongoose.Types.ObjectId };

        return {
          id: userDoc._id.toString(),
          email: user.email,
          username: user.username,
          image: user.image ?? "/default-avatar.png",
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await dbConnect();
        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          const username = user.name || user.email || "User";

          await UserModel.create({
            username,
            email: user.email,
            image: user.image,
            password: "", // Social login
          });

          const emailComponent = React.createElement(RegistrationSuccess, { username });
          await sendEmail(user.email!, "Registration Successful", emailComponent);
        }
      }
      return true;
    },

    async jwt({ token, user }) {
  if (user) {
    token.sub = user.id;
    token.email = user.email;
    token.username = user.username;
    token.picture = user.image ?? "/default-avatar.png";
  }

  return token;
},

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.email = token.email as string; // ✅ Now email will be passed to session
        session.user.username = token.username as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.SECRET_KEY!,
};
