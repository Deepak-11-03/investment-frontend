import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { verifyToken } from "@/middleware/verifyToken";
import { userUpdateValidation } from "@/utils/validation";



export async function PATCH(req: NextRequest) {
    try {
        await connectDB();

        const urlParts = req.nextUrl.pathname.split("/");
        const id = urlParts[urlParts.length - 1];

        if (!id) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        }

        const authResponse: any = await verifyToken(req);
        if (!authResponse.success) return authResponse;

        if (!authResponse.decoded) {
            return NextResponse.json({ success: false, message: "Unauthorized: Invalid token" }, { status: 403 });
        }

        const body = await req.json();
        const parsedData = userUpdateValidation.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json(
                { success: false, message: "Validation Error", errors: parsedData.error.errors },
                { status: 400 }
            );
        }

        // body data

        const { name, email, phone } = parsedData.data;

        // checking if is authorized to update 
        if (id !== authResponse.decoded?.userid) {
            return NextResponse.json({ success: false, message: "Unauthorized: Admin access required" }, { status: 403 });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "User soft deleted successfully", data: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}