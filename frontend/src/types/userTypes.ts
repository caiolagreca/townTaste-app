import { store } from "@/redux/store";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  age?: number;
  phoneNumber?: string;
  address?: string;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
  appError: any;
  serverError: any;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface SignUpUser {
  email: string;
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  password: string;
  confirmPassword: string;
}

export interface SingUpResponse {
  user: User;
}

//Inferring these types from the store itself means that they correctly update as you add more state slices or modify middleware settings.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
