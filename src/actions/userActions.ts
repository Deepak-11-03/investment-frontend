"use server";

import { revalidatePath } from "next/cache";
import httpRequest from "@/services/fetch.service";
import { apiEndPoints } from "@/constants/apiEndPoints";




export async function addUserAndRevalidate(data: any) {
  try {
    const response = await httpRequest(apiEndPoints.USER.CREATE,'POST',data);
    const userData = response?._doc || response;
    revalidatePath("/manage-user"); // Revalidate the cache for UserList
    return userData;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}
export async function getUserProfile() {
  return httpRequest(apiEndPoints.AUTH.VALIDATE_ME);
}

export const getAllUsersData = async () => {
  return httpRequest(apiEndPoints.USER.GET);
};
export const getMyAccountData = async () => {
  return httpRequest(apiEndPoints.AUTH.MY_PROFILE);

};

export async function deleteUserProfile(id:string) {
// console.log(id)
// return
  const response =  httpRequest(`${apiEndPoints.USER.PATCH}${id}`,"DELETE");
  revalidatePath("/manage-user");
  return response
}


 