import { LoginResponse } from "@/types/userTypes";
import { baseURL } from "@/utils/baseURL";
import axios from "axios";

export const loginUser = async (userData: any) => {
  const response = await axios.post<LoginResponse>(`${baseURL}/login`, {
    userData,
  });
  return response.data;
};
