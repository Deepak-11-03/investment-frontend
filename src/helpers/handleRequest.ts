import { ApiResponse } from "@/types/type";
import { toast } from "sonner";


const handleApiRequest = async <T = any>(
  apiFunction: (data: any) => Promise<any>,
  data: any,
  onSuccess?: (response: T) => void
) => {
  try {
    const response:ApiResponse = await apiFunction(data);
    if (response?.data) {
      onSuccess?.(response.data); // Call success callback if provided
    } else {
      toast.error(response?.message || "Something went wrong!");
    }
  } catch (error: any) {
    toast.error(error?.message || "API request failed!");
  }
};
export default handleApiRequest