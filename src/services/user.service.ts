import { Login } from "@/types/type";
import apiClient, { getData, postData } from "./http.service";
import { errorHandler } from "./error.service";




// Get all investments
export const createUser = async (data:any) => {
    try {
      const response = await postData('/user',data);
      console.log(response,'ssssssss')
      return response;
    } catch (error) {
      errorHandler(error);
    }
  };
  
export const userLogin = async (data:Login) => {
    try {
      const response = await postData('/auth/login',data);
      return response;
    } catch (error) {
      return error
    }
  };
export const userLogout = async () => {
    try {
      const response = await postData('/auth/logout',{});
      return response;
    } catch (error) {
      return error
    }
  };

  export const checkUser = async () => {
    try {
      const response = await getData(`/auth/me`);
      return response;
    } catch (error) {
      return error
    }
  };