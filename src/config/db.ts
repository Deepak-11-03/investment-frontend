import { MESSAGE } from "@/constants/message";
import { createAdmin } from "@/helpers/createAdmin";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(MESSAGE.DB_URL_NOT_PROVIDED);
}

let cached = (global as any).mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: process.env.DB_NAME
      } as any)
      .then(async(mongoose) => {
        await createAdmin()
        return mongoose
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
