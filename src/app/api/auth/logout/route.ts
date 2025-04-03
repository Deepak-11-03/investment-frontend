import { MESSAGE } from "@/constants/message";
import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true, message: MESSAGE.LOGOUT_SUCCESS });
    response.cookies.set("token", "", { expires: new Date(0), path: "/" }); // Expire the cookie
    return response;
}
