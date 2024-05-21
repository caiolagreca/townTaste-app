export interface IUserSignUp {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  address?: string;
  profilePhoto?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser {
  id: string; // UUID string
  firstName: string; // User's first name
  lastName: string; // User's last name
  age: number; // User's age
  email: string; // User's email address
  password: string; // User's hashed password
  role: "CUSTOMER" | "RESTAURANT" | "ADMIN"; // User roles, assuming these are the only roles
  phoneNumber: string; // User's phone number
  profilePhoto?: string | null; // Optional profile photo URL or null
  address?: string | null; // Optional address or null
  createdAt: Date; // ISO string of creation date
  updatedAt: Date; // ISO string of last update date
}

export interface IUserUpdate {
  password?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  address?: string;
  profilePhoto?: string;
}

export interface IJWTPayload {
  userId: string;
}

export interface IPasswordUpdate {
  currentPassword: string;
  newPassword: string;
}

export interface IResetPassword {
  token: string;
  newPassword: string;
}
