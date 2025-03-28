import connectDB from "@/config/db";
import User from "@/models/User";
import { generateToken } from "@/utils/generateToken";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    await connectDB()
    const { email, password } = await req.json();
    const user = await User.findOne({email})

    if(!user){
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if(user.password !== password){
        return NextResponse.json({ success: false, message: "Invalid login credentials" }, { status: 404 });
    }
    
    const token = generateToken(user?._id,email,user.isAdmin)

    

    const response = NextResponse.json(
        { success: true, message: "Login Success", user:{name:user?.name, email:user.email,isAdmin:user.isAdmin,_id:user?._id,token} }, 
        { status: 200 }
    );

    response.cookies.set("token", token, {
        httpOnly:process.env.NODE_ENV === "production",  // Prevents JavaScript access (XSS protection)
        secure: process.env.NODE_ENV === "production", // Secure flag in production
        sameSite: "strict",  // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/", 
    });

    return response;
}
