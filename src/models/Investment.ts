import { Schema, model, models, Types, Document } from "mongoose";

// interface for TypeScript
export interface ITransaction extends Document {
    userId: Types.ObjectId;
    amount: string;
    type: "credit" | "debit";
    date: Date;
}

// schema
const TransactionSchema = new Schema<ITransaction>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["credit", "debit"],
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);


const Transaction = models.transactions || model<ITransaction>("transactions", TransactionSchema);

export default Transaction;
