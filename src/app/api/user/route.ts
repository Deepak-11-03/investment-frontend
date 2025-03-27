import connectDB from "@/config/db";
import User from "@/models/User";
import generatePassword from "@/utils/generatePassword";
import { NextRequest, NextResponse } from "next/server";
import Transaction from "@/models/Transaction";

import authOptions from "@/authOptions";
import { getServerSession } from "next-auth/next";
import { userAddValidation } from "@/utils/validation";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    await connectDB()

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

export async function GET() {

    try {
console.log('first')
        await connectDB();
        // const 
//    const cookie = (await cookies()).getAll()
// console.log(cookie)

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
            },
            {
                $addFields: {
                    totalCredit: {
                        $sum: {
                            $map: {
                                input: "$transactions",
                                as: "transaction",
                                in: { 
                                    $cond: [
                                        { $eq: ["$$transaction.type", "credit"] }, 
                                        { $toDouble: "$$transaction.amount" }, 
                                        0 
                                    ] 
                                }
                            }
                        }
                    },
                    totalDebit: {
                        $sum: {
                            $map: {
                                input: "$transactions",
                                as: "transaction",
                                in: { 
                                    $cond: [
                                        { $eq: ["$$transaction.type", "debit"] }, 
                                        { $toDouble: "$$transaction.amount" }, 
                                        0 
                                    ] 
                                }
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    totalAmount: { $subtract: ["$totalCredit", "$totalDebit"] }
                }
            },
            {
                $project: {
                    name: 1, // Keep only relevant fields
                    email: 1,
                    totalCredit: 1,
                    totalDebit: 1,
                    totalAmount: 1,
                    createdAt:1
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


