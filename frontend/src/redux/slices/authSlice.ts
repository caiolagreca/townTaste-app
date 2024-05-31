import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginResponse, UserState } from "@/types/userTypes";
import { loginUser } from "@/services/authService";

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  appError: null,
  serverError: null,
};

export const loginAction = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: { message: string; errorCode?: number } }
>("auth/login", async (userData, thunkAPI) => {
  try {
    const response = await loginUser(userData);
    return response;
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
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
