"use server";

import { revalidatePath } from "next/cache";
import httpRequest from "@/services/fetch.service";




export async function addUserAndRevalidate(data: any) {
  try {
    const response = httpRequest("/user",'POST',data);
    revalidatePath("/manage-user"); // Revalidate the cache for UserList
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}
export async function getUserProfile() {
  return httpRequest("/auth/me");
}

export const getAllUsersData = async () => {
  return httpRequest("/user");
};

export async function deleteUserProfile(id:string) {
// console.log(id)
// return
  const response =  httpRequest(`/user/${id}`,"DELETE");
  revalidatePath("/manage-user");
  return response
}


 