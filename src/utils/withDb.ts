import connectDB from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

interface Context {
    params: Record<string, string>;
}

interface WithDbHandler {
    (req: NextRequest, context: Context): Promise<NextResponse>;
}

export function withDb(handler: WithDbHandler) {
    return async (req: NextRequest, context: Context): Promise<NextResponse> => {
        try {
            await connectDB(); // Connect to the database

            // Call the actual handler with request and context
            return handler(req, context);
        } catch (error) {
            console.error("Database connection error:", error);
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    };
}
