import { ErrorCode } from "./../../../../backend/src/exceptions/root";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ForgotPasswordResponse,
  ForgotPasswordUser,
  LoginResponse,
  LoginUser,
  ResetPasswordData,
  SignUpUser,
  SingUpResponse,
  UserState,
} from "@/types/userTypes";
import {
  forgotPasswordUser,
  loginUser,
  resetPasswordUser,
  signUpUser,
} from "@/services/authService";
import { number } from "yup";

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  appError: null,
  serverError: null,
};

export const loginAction = createAsyncThunk<
  LoginResponse, //The type of the expected response data if the login is successful.
  LoginUser, //The type of the argument userData that the thunk function will receive. It includes the user's email and password.
  { rejectValue: { message: string; errorCode?: number } } //The type of the value that will be passed to the rejectWithValue function in case of an error.
>("auth/login", async (userData, thunkAPI) => {
  //thunkAPI is an object that provides various utilities for interacting with the Redux store, including dispatch, getState, and rejectWithValue.
  try {
    const response = await loginUser(userData);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const signUpAction = createAsyncThunk<
  SingUpResponse,
  SignUpUser,
  { rejectValue: { message: string; errorCode?: number } }
>("auth/signup", async (userData, thunkAPI) => {
  try {
    const response = await signUpUser(userData);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const passwordResetTokenAction = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordUser,
  { rejectValue: { message: string; errorCode?: number } }
>("auth/forgotPassword", async (userData, thunkAPI) => {
  try {
    const response = await forgotPasswordUser(userData);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetPasswordAction = createAsyncThunk<
  void,
  ResetPasswordData,
  { rejectValue: { message: string; errorCode?: number } }
>("auth/resetPassword", async (data, thunkAPI) => {
  try {
    await resetPasswordUser(data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.appError = null;
        state.serverError = null;
      })
      .addCase(
        loginAction.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.appError = null;
          state.serverError = null;
        }
      )
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as {
          message: string;
          errorCode?: number;
        };
        if (payload?.errorCode === 1001) {
          state.appError = "User not found";
        } else if (payload?.errorCode === 1003) {
          state.appError = "Incorrect password";
        } else {
          state.appError = payload?.message || "Login failed";
        }
        state.serverError = action.error.message || null;
      });
    //signUp
    builder
      .addCase(signUpAction.pending, (state) => {
        state.loading = true;
        state.appError = null;
        state.serverError = null;
      })
      .addCase(
        signUpAction.fulfilled,
        (state, action: PayloadAction<SingUpResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.appError = null;
          state.serverError = null;
        }
      )
      .addCase(signUpAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.payload?.message;
        state.serverError = action?.payload?.message;
      });
    //Forgot Password
    builder
      .addCase(passwordResetTokenAction.pending, (state) => {
        state.loading = true;
        state.appError = null;
        state.serverError = null;
      })
      .addCase(
        passwordResetTokenAction.fulfilled,
        (state, action: PayloadAction<ForgotPasswordResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.appError = null;
          state.serverError = null;
        }
      )
      .addCase(passwordResetTokenAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.payload?.message;
        state.serverError = action?.payload?.message;
      });
    //Reset Password
    builder
      .addCase(resetPasswordAction.pending, (state) => {
        state.loading = true;
        state.appError = null;
        state.serverError = null;
      })
      .addCase(resetPasswordAction.fulfilled, (state) => {
        state.loading = false;
        state.appError = null;
        state.serverError = null;
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.payload?.message;
        state.serverError = action?.payload?.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
