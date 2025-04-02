import { Login } from "@/types/type";
import apiClient, { getData, postData } from "./http.service";
import { errorHandler } from "./error.service";




// Get all investments
export const createUser = async (data:any) => {
    try {
      const response = await postData('/user',data);
      return response;
    } catch (error) {
      errorHandler(error);
    }
  };
  
export const userLogin = async (data:Login) => {
    try {
      const response = await postData('/auth/login',data);
      return response;
    } catch (error:any) {
      return error.message
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
export const addTransaction = async (data:any) => {
    try {
      const response = await postData('/transaction', data)
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
      errorHandler(error);
    }
  };

  export const getAllUsers = async () => {
    
    try {
      const response = await getData(`/user`);
      console.log(response)
      return response.data;
    } catch (error) {
      return error
    }
  };
  export const getUserById = async (id:string) => {
    
    try {
      const response = await getData(`/user/${id}`);
      return response.data;
    } catch (error) {
      return error
    }
  };

  export const getToken = async()=>{
    try {
      const res= await getData("/auth/get-token")
      return res;
    } catch (error) {
      return error
    }
  }