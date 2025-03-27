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

export const getAllUsersData = async () => {
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          cache: "no-store",
          credentials: "include",
          //  next: { revalidate: 60 } 
      });

      if (!res.ok) {
          console.error("Error response:", res.status, res.statusText);
          return []; // Ensure it returns an array
      }

      const data = await res.json();
      return Array.isArray(data?.data) ? data.data : []; // Ensure it returns an array
  } catch (error) {
      console.error("Error fetching users:", error);
      return []; // Return an empty array in case of an error
  }
};

export async function getUserProfile() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      cache: "no-store",
      credentials: "include",
      // next: { revalidate: 60 }  // Include cookies if needed
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data || {};
  } catch (error) {
    return null;
  }
}


 