import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/config/db";
import { verifyToken } from "@/middleware/verifyToken";
import { MESSAGE } from "@/constants/message";

export async function GET(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB is connected

    // 🔹 Get token from cookies in the request
    // 🔹 Verify token using middleware
    const authResponse:any = await verifyToken(req);

    if (!authResponse.success) return authResponse;

    // 🔹 Fetch user from database (excluding password)
    const user = await User.findById(authResponse.decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ success: false, message:MESSAGE.USER_NOT_FOUND }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: MESSAGE.INTERNAL_ERROR }, { status: 500 });
  }
}
