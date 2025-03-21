import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";

    const isPublicPath =
        path === "/auth/login" || path === "/signup" || path === '/' || path === '/about' || path === '/contact-us '

    console.log("🔹 Middleware triggered on:", path);
    console.log("🔹 Token found:", Boolean(token));

    // 🔹 API Protection: Restrict access to protected API routes
    if (path.startsWith("/api/user") && !token) {
        console.log(" Unauthorized API request:", path);
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 400 });
    }

    //  If user is logged in and tries to access public pages, redirect to home
    if (isPublicPath && token) {
        const previousUrl = request.headers.get("referer") || "/";
        console.log(" Redirecting logged-in user from public path to '/'");
        return NextResponse.redirect(new URL(previousUrl, request.nextUrl));
    }

    //  If user is not logged in and tries to access protected pages, redirect to login
    if (!isPublicPath && !token) {
        console.log(" Redirecting unauthenticated user to '/auth/login'");
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    //  Allow request to continue
    return NextResponse.next();
}

// 🔹 Apply middleware to protect pages & API routes
export const config = {
    matcher: [
        // "/",            // Protect home page
        "/profile",     // Protect profile page
        "/auth/login",  // Public page
        "/signup",      // Public page
        "/manage-user", // Public page
        "/api/user",  //  Protect all API routes under "/api/"
    ],
};
