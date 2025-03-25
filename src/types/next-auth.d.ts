import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend User type
declare module "next-auth" {
  interface User extends DefaultUser {
    _id?: string;
    token: string;
    isAdmin?: boolean;
  }

  interface Session extends DefaultSession {
    user: User;
  }

  interface JWT {
    _id: string;
    token: string;
  }
}
