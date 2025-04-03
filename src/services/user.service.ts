import { Login } from "@/types/type";
import { getData, patchData, postData } from "./http.service";
import { errorHandler } from "./error.service";
import { apiEndPoints } from "@/constants/apiEndPoints";




// Get all investments
export const createUser = async (data:any) => {
    try {
      const response = await postData(apiEndPoints.USER.CREATE,data);
      return response;
    } catch (error) {
      errorHandler(error);
    }
  };
  
export const userLogin = async (data:Login) => {
    try {
      const response = await postData(apiEndPoints.AUTH.LOGIN,data);
      return response;
    } catch (error:any) {
      return error.message
    }
  };
export const userLogout = async () => {
    try {
      const response = await postData(apiEndPoints.AUTH.LOGOUT,{});
      return response;
    } catch (error) {
      return error
    }
  };
export const addTransaction = async (data:any) => {
    try {
      const response = await postData(apiEndPoints.TRANSACTION.ADD, data)
      return response;
    } catch (error) {
      return error
    }
  };
export const updateTransaction = async (data:any,id:string) => {
    try {
      const response = await patchData(`${apiEndPoints.TRANSACTION.UPDATE}${id}`, data)
      return response;
    } catch (error) {
      return error
    }
  };

  export const checkUser = async () => {
    
    try {
      const response = await getData(apiEndPoints.AUTH.VALIDATE_ME);
      return response;
    } catch (error) {
      errorHandler(error);
    }
  };

  export const getAllUsers = async () => {
    
    try {
      const response = await getData(apiEndPoints.USER.GET);
      console.log(response)
      return response.data;
    } catch (error) {
      return error
    }
  };
  export const getUserById = async (id:string) => {
    
    try {
      const response = await getData(`${apiEndPoints.USER.PATCH}${id}`);
      return response.data;
    } catch (error) {
      return error
    }
  };