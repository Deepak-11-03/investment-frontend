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
          token: data.user.token,
          isAdmin: data.user.isAdmin, // Including JWT token if needed for API calls
        };
      },
    }),
  ],
};

export default authOptions;
