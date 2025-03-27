import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/authOptions";
import connectDB from "@/config/db";
import User from "@/models/User";
import { cookies } from "next/headers";


export async function GET(req: Request) {
  try {
    const cookie = (await cookies()).getAll()
    await connectDB();

    const session = await getServerSession(authOptions);
    console.log("Cookies:", cookie); // Debugging cookies

    console.log("SESSION IN API:", session); // Debugging session

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Fetch user based on session
    const user = await User.findOne({ email: session.user.email }).select("-password"); // Exclude password

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
