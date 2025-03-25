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

        // Return the user object containing necessary details
        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          token: data.token,
          isAdmin: data.user.isAdmin, // Including JWT token if needed for API calls
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days session
    updateAge: 60 * 60, // Update session age every 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.isAdmin= user.isAdmin;
        token.token = user?.token; // Pass JWT token for API requests
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string | undefined;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isAdmin= token.isAdmin as boolean | undefined;
        session.user.token = (token.token as string) || "";
        // session.user.token = token.token as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  // secret:process.env.JWT_SECRET
};

export default authOptions;
