import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { COOKIE_TOKEN } from "@/constants/constant";
import { MESSAGE } from "@/constants/message";

export async function verifyToken(req: NextRequest) {
    try {
        // Get token from cookies
        const token = req.cookies.get(COOKIE_TOKEN)?.value;

        if (!token) {
            return NextResponse.json({ success: false, message: MESSAGE.TOKEN_REQUIRED }, { status: 401 });
        }

        // Verify token
        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!);
        } catch (error: any) {
            return NextResponse.json({ success: false, message: MESSAGE.INVALID_TOKEN }, { status: 401 });
        }

        if (!decoded?.userId) {
            return NextResponse.json({ success: false, message: MESSAGE.INVALID_TOKEN_WITHOUT_USERID }, { status: 401 });
        }

        return { success: true, decoded };
    } catch (error) {
        return NextResponse.json({ success: false, message: MESSAGE.INTERNAL_ERROR}, { status: 500 });
    }
}
