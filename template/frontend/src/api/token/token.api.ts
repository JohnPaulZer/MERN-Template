import axiosInstance from "@/axios/axios-instance";

export const refreshTokenApi = async () => {
  const response = await axiosInstance.post("/token/refresh");
  return response.data;
};
