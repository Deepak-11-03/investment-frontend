import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { verifyToken } from "@/middleware/verifyToken";
import { transactionValidation, userUpdateValidation } from "@/utils/validation";
import Transaction from "@/models/Transaction";
import { MESSAGE } from "@/constants/message";



export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // verify token
        const authResponse: any = await verifyToken(req);
        if (!authResponse.success) return authResponse;

        // checking if is authorized to update 
        if (!authResponse.decoded?.isAdmin) {
            return NextResponse.json({ success: false, message: MESSAGE.ADMIN_ACCESS_REQUIRED }, { status: 403 });
        }

        const body = await req.json();
        const parsedData = transactionValidation.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json(
                { success: false, message: MESSAGE.VALIDATION_ERROR, errors: parsedData.error.errors },
                { status: 400 }
            );
        }

        const { amount, date, type ,userId } = parsedData.data;  

        if(!userId){
            return NextResponse.json({ success: false, message: MESSAGE.USERID_REQUIRED }, { status: 400 });
        }

        const validUser = await User.findOne({ _id: userId ,isAdmin:false,isDeleted:false})

        if (!validUser || userId === authResponse.decoded?.userId){
            return NextResponse.json({ success: false, message: MESSAGE.INVALID_USERID }, { status: 400 });
        }

        const transaction = await Transaction.create({ userId: userId,amount,type,date})

        return NextResponse.json({ success: true, message: MESSAGE.TRANSACTION_ADDED, data: transaction }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message:MESSAGE.INTERNAL_ERROR  }, { status: 500 });
    }
}