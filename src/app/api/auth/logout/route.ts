import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true, message: "Logged out" });
    response.cookies.set("token", "", { expires: new Date(0), path: "/" }); // Expire the cookie
    return response;
}
