"use server";

import { revalidatePath } from "next/cache";
import { checkUser, createUser } from "@/services/user.service";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

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

export async function getUserProfile() {
  try {
    const response = await checkUser(); // Call your user creation service
    // revalidatePath("/"); // Revalidate the cache for UserList
    return response?.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}


 