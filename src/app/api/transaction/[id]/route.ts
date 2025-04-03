import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { verifyToken } from "@/middleware/verifyToken";
import { userUpdateValidation } from "@/utils/validation";
import { MESSAGE } from "@/constants/message";



export async function PATCH(req: NextRequest) {
    try {
        await connectDB();

        const urlParts = req.nextUrl.pathname.split("/");
        const id = urlParts[urlParts.length - 1];

        if (!id) {
            return NextResponse.json({ success: false, message: MESSAGE.USERID_REQUIRED }, { status: 400 });
        }

        const authResponse: any = await verifyToken(req);
        if (!authResponse.success) return authResponse;

        if (!authResponse.decoded) {
            return NextResponse.json({ success: false, message: MESSAGE.INVALID_TOKEN }, { status: 403 });
        }

        const body = await req.json();
        const parsedData = userUpdateValidation.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json(
                { success: false, message: MESSAGE.VALIDATION_ERROR, errors: parsedData.error.errors },
                { status: 400 }
            );
        }

        // body data

        const { name, email, phone } = parsedData.data;

        // checking if is authorized to update 
        if (id !== authResponse.decoded?.userid) {
            return NextResponse.json({ success: false, message: MESSAGE.ADMIN_ACCESS_REQUIRED }, { status: 403 });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: MESSAGE.USER_NOT_FOUND }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: MESSAGE.USER_DELETED, data: updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: MESSAGE.INTERNAL_ERROR }, { status: 500 });
    }
}