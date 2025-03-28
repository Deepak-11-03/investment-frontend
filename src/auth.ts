import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null

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
})