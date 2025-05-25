import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/models/User";
import mongoose from "mongoose";

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
          image: user.image,
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
          await UserModel.create({
            username: user.name?.split(" ").join("") || user.email,
            email: user.email,
            image: user.image,
            password: "", // Social login
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
  if (account?.provider === "google") {
    await dbConnect();
    const dbUser = await UserModel.findOne({ email: token.email });

    if (dbUser) {
      
      token.username = dbUser.username;
      token.picture = dbUser.image ?? undefined;
    }
  } else if (user) {
    // Manual login
    token.sub = user.id;
    token.email = user.email;
    token.username = user.username;
    token.picture = user.image ?? undefined;
  }

  return token;
}
,
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
