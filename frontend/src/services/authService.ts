import {
  ForgotPasswordResponse,
  ForgotPasswordUser,
  LoginResponse,
  LoginUser,
  ResetPasswordData,
  SignUpUser,
  SingUpResponse,
} from "@/types/userTypes";
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
      if (error.response.status === 429) {
        throw {
          message: "Too many login attempts. Please try again after 1 minute.",
        };
      } else if (error.response.data.attemptsLeft !== undefined) {
        throw new Error(
          `${error.response.data.message}. You have ${error.response.data.attemptsLeft} attempts left.`
        );
      }
      throw error.response.data || "Login failed";
    } else {
      throw new Error("Network error or server is not responding");
    }
  }
};

export const signUpUser = async (userData: SignUpUser) => {
  try {
    const response = await axios.post<SingUpResponse>(
      `${baseURL}auth/signup`,
      userData
    );
    console.log("resposta: ", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error SignUpUser: ", error.response.data);
    if (error.response && error.response.data) {
      throw error.response.data || "SignUp failed";
    } else {
      throw new Error("Network error or server is not responding");
    }
  }
};

export const forgotPasswordUser = async (data: ForgotPasswordUser) => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(
      `${baseURL}auth/forgot-password`,
      data
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data || "SignUp failed";
    } else {
      throw new Error("Network error or server is not responding");
    }
  }
};

export const resetPasswordUser = async (data: ResetPasswordData) => {
  try {
    await axios.post(`${baseURL}auth/reset-password`, data);
  } catch (error: any) {
    console.log("error resetPasswordUser: ", error.response.data);
    if (error.response && error.response.data) {
      throw error.response.data || "Reset password failed";
    } else {
      throw new Error("Network error or server is not responding");
    }
  }
};
