import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/config/db";
import { getServerSession } from "next-auth";
import authOptions from "@/authOptions";

export async function GET(req: Request) {
  try {
      await connectDB()

    //   const token = (await cookies()).get("token")?.value;
      
    //   if (!token) {
    //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    //     }

    // // Verify token
    // const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // if (!decoded || !decoded.userId) {
    //   return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    // }

  const session = await getServerSession(authOptions);

    if (session?.user.isAdmin === false) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    console.log(session,'ssssssssssssssssssss')

    // Fetch user from database
    const user = await User.findOne().select("-password"); // Exclude password

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
