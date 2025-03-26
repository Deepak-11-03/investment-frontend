// import { NextMiddlewareWithAuth } from './../node_modules/next-auth/src/next/middleware';
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from 'jose'
// import { getToken } from 'next-auth/jwt';
// export {default} from 'next-auth/middleware'

// // export {auth as middleware}  


// const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "");

// export async function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname;
//     const token = request.cookies.get("next-auth.session-token")?.value || "";

//     const a = await getToken({req:request})
//     console.log(a,'aaaaaaaaaaaaaaaa',token)

//     const isPublicPath =path === "/auth/login" || path === "/signup" || path === '/' || path === '/about' || path === '/contact-us '

//     let userData: any = null;

//     // Verify JWT Token
//     if (token) {
//         try {
//             const tokenData = await jwtVerify(token, SECRET_KEY); // Decode token
//             userData = tokenData.payload
//         } catch (error) {
//             console.log(error,'ssssssssssssssssssssss')
//             return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
//         }
//     }

//     if (path === "/manage-user" && (!userData || !userData.isAdmin)) {
//         return NextResponse.redirect(new URL("/", request.nextUrl)); // Redirect to home
//     }



//     // restrict access to protected API routes
//     if (path.startsWith("/api/user") && !token) {
//         console.log(" Unauthorized API request:", path);
//         return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 400 });
//     }

//     //  If user is logged in and tries to access public pages, redirect to home
//     if (isPublicPath && token) {
//         const previousUrl = request.headers.get("referer") || "/";
//         console.log(" Redirecting logged-in user from public path to '/'");
//         return NextResponse.redirect(new URL("/", request.nextUrl));
//     }

//     //  If user is not logged in and tries to access protected pages, redirect to login
//     if (!isPublicPath && !token) {
//         console.log(" Redirecting unauthenticated user to '/auth/login'");
//         return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
//     }

//     //  Allow request to continue
//     return NextResponse.next();
// }

// // middleware to protect pages & API routes


// // export async function middleware

// export const config = {
//     matcher: [
//         // "/",            // Protect home page
//         "/profile",     // Protect profile page
//         "/auth/login",  // Public page
//         "/signup",      // Public page
//         "/manage-user", // Public page
//         "/api/user",  //  Protect all API routes under "/api/"
//     ],
// };




import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";
const SECRET_KEY = process.env.JWT_SECRET || "";


export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const path = request.nextUrl.pathname;
    const token = request.nextauth.token;


    const isPublicPath =
      path === "/auth/login" ||
      path === "/signup" ||
      path === "/" ||
      path === "/about" ||
      path === "/contact-us";


    if (path === "/manage-user" && (!token?.isAdmin)) {
      return NextResponse.redirect(new URL("/", request.nextUrl)); // Redirect to home
    }

    if (path === "/auth/login" && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl)); // Redirect to home
      }

    // restrict access to protected API routes
    // if (path.startsWith("/api/user") && !token) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized" },
    //     { status: 400 }
    //   );
    // }

    // If user is logged in and tries to access public pages, redirect to home
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    // Allow request to continue
    return NextResponse.next();
  },
  {
    callbacks: {
        authorized: ({ token }) => {
            return !!token; // Ensure token exists before allowing access
          },
    },
    secret: SECRET_KEY,
    pages: {
      signIn: "/auth/login",
    },
  },
);

export const config = {
  matcher: [
    "/account",
    "/manage-user",
    // "/api/user",
    "/auth/login",
    "/api/auth/me",
    "/api/user",
    "/signup",
  ],
};