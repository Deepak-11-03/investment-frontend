import { Schema, model, models, Types, Document, Model } from "mongoose";

// interface for TypeScript
interface ITransaction extends Document {
    userId: Types.ObjectId;
    amount: string;
    type: "credit" | "debit";
    date: Date;
    // isDeleted: boolean;
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

// 🔹 Exclude __v when converting to JSON
TransactionSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Transaction: Model<ITransaction> = models.transactions || model<ITransaction>("transactions", TransactionSchema);

export default Transaction;