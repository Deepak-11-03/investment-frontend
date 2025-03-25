import connectDB from "@/config/db";
import User from "@/models/User";
import generatePassword from "@/utils/generatePassword";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import Transaction from "@/models/Investment";
import { userAddValidation } from "./validation";
import authOptions from "@/authOptions";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { NextApiRequest } from "next";

export async function POST(req: Request,res:Response) {


    const session = await getServerSession(authOptions);

    if (session?.user.isAdmin === false) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsedData = userAddValidation.safeParse(body);

    if (!parsedData.success) {
        return NextResponse.json(
            { success: false, message: "Validation Error", errors: parsedData.error.errors },
            { status: 400 }
        );
    }

    const { name, email, phone, amount, date } = parsedData.data;

    // const token = (await cookies()).get("next-auth.session-token")?.value;
    
    // console.log((await cookies()).getAll(), 'token', process.env.JWT_SECRET)
    // Verify token


    const userExist = await User.findOne({ email: email, phone: phone });

    if (userExist) {
        return NextResponse.json({ success: false, message: "User with this email or phone number is already exist" }, { status: 400 });
    }

    const password = generatePassword(name, phone)

    const user = await User.create({ name, phone, email, password })

    if (amount) {
        await Transaction.create({ userId: user._id, amount, date, type: "credit" })
    }

    return NextResponse.json({ success: true, message: "User created", data: {...user} }, { status: 200 });

}

export async function GET(req: NextApiRequest) {

    try {

        await connectDB();

        const token = (await cookies()).get("next-auth.session-token")?.value;

        console.log('ttttttttssssssssssssssssssssssss', token)
        console.log('first')

        // const token = (await cookies()).get("token")?.value;
        // if (!token) {
        //   return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        // }

        // // Verify token
        // const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        // if (!decoded || !decoded.userId) {
        //   return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
        // }


        // const adminUser = await User.findOne({_id:decoded?.userId,isAdmin:true})

        // if(!adminUser){
        //     return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
        // }

        // { $match: { _id: new mongoose.Types.ObjectId(userId) } },
        const users = await User.aggregate([
            {
                $match: { isAdmin: false } // Get only non-admin users 
            },
            {
                $lookup: {
                    from: "transactions", // Match with the transactions collection
                    localField: "_id",
                    foreignField: "userId",
                    as: "transactions"
                }
            }
        ]);



        // if (!user) {
        //     return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        // }
        return NextResponse.json({ success: true, data: users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
