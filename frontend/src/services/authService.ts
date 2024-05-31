import { LoginResponse } from "@/types/userTypes";
import { baseURL } from "@/utils/baseURL";
import axios from "axios";

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${baseURL}auth/login`,
      userData
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data || "Login failed";
    } else {
      throw new Error("Network error or server is not responding");
    }
  }
};
