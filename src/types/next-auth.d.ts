import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      image?: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    picture?: string | null;
  }
}
