import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const showError = (error: unknown) => {
  console.error(error);
  if (error && typeof error === "object" && "message" in error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error(axiosError.message || "An unexpected error occurred.");
    }
  } else {
    toast.error("An unexpected error occurred.");
  }
};
