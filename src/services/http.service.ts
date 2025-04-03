import { MESSAGE } from "@/constants/message";
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ✅ Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = error.response?.data || error.message;

    // console.error("API Error:", status, message);

    if (typeof window !== "undefined") {
      if (status === 401) {
        toast.error(MESSAGE.SESSION_EXPIRED);
        // localStorage.removeItem("token");
        // window.location.href = "/auth/login";
      } else {
        toast.error(
          typeof message === "string"
            ? message
            : ((message as { message?: string })?.message || MESSAGE.INTERNAL_ERROR)
        );
      }
    }

    return Promise.reject({ status, message });
  }
);

interface ApiResponse<T = any> {
  data?: T;
  status: number;
  message?: string;
  success?: boolean;
}


export const getData = async <T = any>(
  endpoint: string,
  params = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const postData = async <T = any>(
  endpoint: string,
  data: any
): Promise<ApiResponse<T>> => {
  try {
    const response:ApiResponse = await apiClient.post(endpoint, data);
    return { data: response.data, status: response.status, success:response.success , message:response?.message };
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const patchData = async <T = any>(
  endpoint: string,
  data: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.patch(endpoint, data);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return Promise.reject(error);
  }
};
export const putData = async <T = any>(
  endpoint: string,
  data: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.put(endpoint, data);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteData = async <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.delete(endpoint);
    return { data: response.data, status:response.status };
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default apiClient;
