import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { verifyToken } from "@/middleware/verifyToken";
import mongoose from "mongoose";
import { MESSAGE } from "@/constants/message";


export async function GET(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB is connected

    const authResponse:any = await verifyToken(req);

    if (!authResponse.success) return authResponse;

      const users = await User.aggregate([
          {
              $match: { isAdmin: false, isDeleted: false, _id: new mongoose.Types.ObjectId(authResponse.decoded?.userId) } // Get only non-admin users
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
                remainingAmount: { $subtract: ["$totalCredit", "$totalDebit"] }
            }
          },
          {
              $project: {
                  name: 1, // Keep only relevant fields
                  email: 1,
                  phone: 1,
                  totalCredit: 1,
                  totalDebit: 1,
                  totalAmount: 1,
                  remainingAmount: 1,
                  transactions: 1,
                  createdAt: 1
              }
          },
      ]);

    if (!users || !users.length) {
      return NextResponse.json({ success: false, message: MESSAGE.USER_NOT_FOUND }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: users[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: MESSAGE.INTERNAL_ERROR }, { status: 500 });
  }
}
