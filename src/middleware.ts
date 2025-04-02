import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";
    const publicRoutes = ["/auth/login"];

    console.log("🔹 Middleware triggered on:", path);

    let verifiedToken: any = null;

    if (token) {
        try {
            const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
            verifiedToken = await jwtVerify(token, secretKey);
        } catch (error: any) {
            console.error(" Token verification failed:", error.message);
            const response = NextResponse.redirect(new URL("/auth/login", request.nextUrl));
            response.cookies.set("token", "", { path: "/", httpOnly: true, secure: true, maxAge: 0 });
            return response;
        }
    }

    if (!verifiedToken && !path.startsWith("/auth/login")) {
        const response = NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        response.headers.set("x-auth-error", "Unauthorized access");
        return response;
    }

    if (!verifiedToken?.payload?.isAdmin && path.startsWith("/manage-user")) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (verifiedToken && publicRoutes.includes(path)) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/account", "/manage-user", "/api/user", "/auth/login"],
};
