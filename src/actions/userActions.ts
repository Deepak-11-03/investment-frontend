"use server";

import { revalidatePath } from "next/cache";
import { createUser } from "@/services/user.service";

export async function addUserAndRevalidate(data: any) {
  try {
    const response = await createUser(data); // Call your user creation service
    revalidatePath("/manage-user"); // Revalidate the cache for UserList
    return response?.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}
