import { LoginResponse, LoginUser, SignUpUser } from "@/types/userTypes";
import { baseURL } from "@/utils/baseURL";
import axios from "axios";

export const loginUser = async (userData: LoginUser) => {
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

export const signUpUser = async (userData: SignUpUser) => {
  try {
    const response = await axios.post<SignUpUser>(
      `${baseURL}auth/signup`,
      userData
    );
    console.log("resposta: ", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data || "Login failed";
    } else {
      throw new Error("Network error or server is not responding");
    }
  }
};
