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
  { email: string; password: string }
>("auth/login", async (userData, thunkAPI) => {
  try {
    const response = await loginUser(userData);
    console.log("login redux", response);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data);
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
        (state, actiom: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = actiom.payload.user;
          state.token = actiom.payload.token;
          state.appError = null;
          state.serverError = null;
        }
      )
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.error?.message;
        state.serverError = action?.error?.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
