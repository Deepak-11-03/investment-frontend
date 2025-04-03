import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message);
        }

        return {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          token: data.user.token,
          isAdmin: data.user.isAdmin, // Including JWT token if needed for API calls
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",

  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.isAdmin; // Store user role
        token.token = user.token; // Store user role
      }
      return token;
    },
    async session({ session, token }) {
// console.log('session', session, token)
      session.user = {
        id: token.id as string ,
        email: token.email,
        isAdmin: token.isAdmin as boolean | undefined, // Ensure correct role is set
        token: typeof token.token === "string" ? token.token : "", // Ensure token is always a string with a fallback
      };
      return session;
    },

  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.JWT_SECRET
};

export default authOptions;
