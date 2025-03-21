import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

// Create Axios instance with type safety
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, 
});

// Response interceptor
// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => response.data,
//   (error: AxiosError) => {
//     // if (error?.response?.status === 401) {
//     //   // localStorage.clear(); 
//     //   // window.location.href = '/';
//     // }

//     console.error('API Error:', error.response?.status, error.response?.data || error.message);
//     return Promise.reject(error.response?.data || error.message);
//   }
// );


apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = error.response?.data || error.message;

    console.error("API Error:", status, message);

    // if (status === 401) {
    //   // 🔹 Show error toast for unauthorized access
    //   toast.error("Session expired. Please log in again.");

    //   // 🔹 Clear stored user data (if any)
    //   // localStorage.removeItem("token");
    //   // localStorage.removeItem("user");

    //   // // 🔹 Redirect to login page
    //   // window.location.href = "/auth/login";
    // }

    return Promise.reject(message);
  }
);


interface ApiResponse{
  data?:any,
  status:number,
  message:string
}

// ✅ Generic API helper functions
export const getData = async <T = any>(endpoint: string, params = {}): Promise<ApiResponse> => {
  try {
    return await apiClient.get(endpoint, { params });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postData = async <T = any>(endpoint: string, data: any): Promise<ApiResponse> => {
  // try {
    return await apiClient.post(endpoint, data);
  // } catch (error) {
  //   return Promise.reject(error);
  // }
};

export const putData = async <T = any>(endpoint: string, data: any): Promise<ApiResponse> => {
  try {
    return await apiClient.put(endpoint, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const patchData = async <T = any>(endpoint: string, data: any): Promise<ApiResponse> => {
  try {
    return await apiClient.patch(endpoint, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteData = async <T = any>(endpoint: string): Promise<T> => {
  try {
    return await apiClient.delete(endpoint);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default apiClient;
