import connectDB from "@/config/db";
import { COOKIE_TOKEN } from "@/constants/constant";
import { MESSAGE } from "@/constants/message";
import User from "@/models/User";
import { generateToken } from "@/utils/generateToken";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    await connectDB()
    const { email, password } = await req.json();
    const user = await User.findOne({ email })

    if (!user?._id) {
        return NextResponse.json({ success: false, message: MESSAGE.USER_NOT_FOUND }, { status: 404 });
    }

    if (user.password !== password) {
        return NextResponse.json({ success: false, message: MESSAGE.INVALID_CREDENTIALS }, { status: 404 });
    }

    const token = generateToken(user._id.toString(), email, user?.isAdmin)



    const response = NextResponse   .json(
        { success: true, message: MESSAGE.LOGIN_SUCCESS, data:{ name:user?.name,email:user?.email,isAdmin:user?.isAdmin, token} },
        { status: 200 }
    );

    response.cookies.set(COOKIE_TOKEN, token, {
        httpOnly: process.env.NODE_ENV === "production",  // Prevents JavaScript access (XSS protection)
        secure: process.env.NODE_ENV === "production", // Secure flag in production
        sameSite: "strict",  // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
    });

    return response;
}