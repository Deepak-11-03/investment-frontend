import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { verifyToken } from "@/middleware/verifyToken";
import mongoose from "mongoose";
import { userUpdateValidation } from "@/utils/validation";




export async function GET(req: NextRequest) {

    try {

        await connectDB();

        const urlParts = req.nextUrl.pathname.split("/");
        const id = urlParts[urlParts.length - 1];


        if (!id) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        }

        const authResponse: any = await verifyToken(req);

        if (!authResponse.success) return authResponse;

        if (!authResponse.decoded?.isAdmin) {
            return NextResponse.json({ success: false, message: "Unauthorized: Admin access required" }, { status: 403 });
        }

        const users = await User.aggregate([
            {
                $match: { isAdmin: false, isDeleted: false, _id: new mongoose.Types.ObjectId(id) } // Get only non-admin users
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
                    transactions: 1,
                    createdAt: 1
                }
            },
        ]);

        // if (!users.length) {
        //     return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        // }
        return NextResponse.json({ success: true, data: users[0] }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

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
export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const urlParts = req.nextUrl.pathname.split("/");
        const id = urlParts[urlParts.length - 1];

        if (!id) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        }

        const authResponse: any = await verifyToken(req);
        if (!authResponse.success) return authResponse;

        if (!authResponse.decoded?.isAdmin) {
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
