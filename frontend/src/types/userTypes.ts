export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  address?: string;
  profilePhoto?: string;
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
