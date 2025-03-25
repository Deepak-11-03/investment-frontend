import connectDB from "@/config/db";
import { createAdmin } from "@/helpers/createAdmin";

export async function initializeServer() {
  try {
    await connectDB();
    await createAdmin();
    console.log(" Server Initialization Complete: Database Connected & Admin Created");
  } catch (error) {
    console.error(" Server Initialization Failed:", error);
  }
}
