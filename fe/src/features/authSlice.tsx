import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { SignupFormData } from "../auth/Signup";
import { LoginFormData } from "../auth/Login";
import { ForgetPassData } from "../auth/ForgetPass";

// API URLs
const signupUrl = "/api/users/signup";
const loginUrl = "/api/users/login";
const updateUrl = "/api/users/updateUserInformation";
const logoutUrl = "/api/users/logout";
const forgetPassUrl = "/api/users/sendResetPasswordOTP";
const resetPassUrl = "/api/users/updatePassword";

// Interfaces
interface User {
  login: boolean;
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    id: string;
  };
}

// CREATE ASYNC THUNK
export const createuserAsync = createAsyncThunk(
  "user/create",
  async (formData: SignupFormData) => {
    try {
      const response = await axios.post(signupUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

// LOGIN ASYNC THUNK
export const loginuserAsync = createAsyncThunk(
  "user/login",
  async (formData: LoginFormData) => {
    try {
      const response = await axios.post(loginUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

// UPDATE ASYNC THUNK
export const updateuserAsync = createAsyncThunk(
  "user/update",
  async (formData: any) => {
    try {
      const response = await axios.post(updateUrl, formData);
      // toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

// Logout Function
export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.delete(logoutUrl);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

// FORGET ASYNC THUNK
export const forgetuserAsync = createAsyncThunk(
  "user/forget",
  async (formData: ForgetPassData) => {
    try {
      const response = await axios.post(forgetPassUrl, formData);
      // toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

// RESET ASYNC THUNK
export const resetPassAsync = createAsyncThunk(
  "user/reset",
  async (resetPasswordData: any) => {
    const { id, resetPassword } = resetPasswordData;
    try {
      const response = await axios.post<any>(resetPassUrl, {
        id,
        resetPassword,
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
);

// INITIAL STATE
interface AuthState {
  user: User | null;
  loading: boolean;
  signupLoading: boolean;
  loginLoading: boolean;
  forgetLoading: boolean;
  updateLoading: boolean;
  forgetPasswordEmail: string | null;
  resetPassword: string | null;
  validateToken: string | null;
}

const initialState: AuthState = {
  // loading states
  loading: false,
  signupLoading: false,
  loginLoading: false,
  forgetLoading: false,
  updateLoading: false,

  // other states
  user: null,
  forgetPasswordEmail: null,
  resetPassword: null,
  validateToken: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // SIGN UP ADD CASE
      .addCase(createuserAsync.pending, (state) => {
        state.signupLoading = true;
      })
      .addCase(createuserAsync.fulfilled, (state, _action) => {
        state.signupLoading = false;
      })

      // UPDATE CASE
      .addCase(updateuserAsync.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateuserAsync.fulfilled, (state, _action) => {
        state.updateLoading = false;
      })

      // LOGIN ADD CASE
      .addCase(loginuserAsync.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginuserAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload;
      })

      // FORGET PASSWORD ADD CASE
      .addCase(forgetuserAsync.pending, (state) => {
        state.forgetLoading = true;
      })
      .addCase(forgetuserAsync.fulfilled, (state) => {
        state.forgetLoading = false;
      })
      .addCase(forgetuserAsync.rejected, (state) => {
        state.forgetLoading = false;
      })

      // logout
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
