import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function verifyToken(req: NextRequest) {
    try {
        // Get token from cookies
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized: No token provided" }, { status: 401 });
        }

        // Verify token
        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!);
        } catch (error: any) {
            return NextResponse.json({ success: false, message: "Unauthorized: Invalid token" }, { status: 401 });
        }

        if (!decoded?.userId) {
            return NextResponse.json({ success: false, message: "Unauthorized: Token missing user ID" }, { status: 401 });
        }

        return { success: true, decoded };
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
