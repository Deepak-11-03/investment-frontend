import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const cookies = cookie.parse(request.headers.get("cookie") || "");
    const token = cookies.token;
    const publicRoutes= ['/auth/login']

    console.log("🔹 Middleware triggered on:", path);

    let verifiedToken: any = null;

    if (token) {
        try {
            const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
            verifiedToken = await jwtVerify(token, secretKey);
        } catch (error: any) {
            console.error(" Token verification failed:", error.message);
            const response = NextResponse.redirect(new URL("/auth/login", request.nextUrl));
            response.headers.set("Set-Cookie", `token=; Path=/; HttpOnly; Secure; Max-Age=0`);
            return response;
        }
    }


    if (!verifiedToken && !path.startsWith("/auth/login")) {
        const response = NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        response.headers.set("x-auth-error", "Unauthorized access"); // Custom error header
        return response;
    }

    if (!verifiedToken?.payload?.isAdmin && path.startsWith("/manage-user")){
        return NextResponse.redirect(new URL("/", request.nextUrl)); // Redirect to home
    }
    
    if(verifiedToken && publicRoutes.includes(path)){
        return NextResponse.redirect(new URL("/", request.nextUrl)); // Redirect to home
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/profile",
        "/account",
        "/manage-user",
        "/api/user",
        "/auth/login"
    ],
};
