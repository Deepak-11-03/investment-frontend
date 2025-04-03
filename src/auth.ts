import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {handlers,signIn,signOut,auth} = NextAuth({
  providers: [
    Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
            headers: { "Content-Type": "application/json" }
            });
    
            const user = await res.json();
    
            if (res.ok && user) {
            return user;
            }
            return null;
        } 
    })
  ]
})
