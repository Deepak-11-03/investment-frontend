import connectDB from "@/config/db";
import { verifyToken } from "@/middleware/verifyToken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const authResponse: any = await verifyToken(req);

        if (!authResponse.success) return authResponse;

        if (!authResponse?.decoded?.isAdmin) {
            return NextResponse.json({ success: false, message: "Unauthorized, You don't have permission" }, { status: 401 });
        }

        await User.findByIdAndUpdate(params.id, { $set: { isDeleted :true }},{new:true}) 

        return NextResponse.json({ success: true, data: {} }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}