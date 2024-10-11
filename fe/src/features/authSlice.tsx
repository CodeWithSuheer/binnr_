import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { SignupFormData } from "../auth/Signup";
import { LoginFormData } from "../auth/Login";
import { ForgetPassData } from "../auth/ForgetPass";
import { VerificationScreenFormData } from "../auth/VerificationScreen";
import { ChangePasswordFormData } from "../auth/ChangePassword";

// API URLs
const signupUrl = "/api/auth/signup";
const resendApprovalLinkUrl = "/api/auth/resendApprovalLink";
const loginUrl = "/api/auth/login";
const changePasswordUrl = "/api/auth/changepassword";
const forgetPassUrl = "/api/auth/forgotpassword";

const resetPassUrl = "/api/users/updatePassword";

// Interfaces
interface User {
  login: boolean;
  body: {
    accesstoken: string;
    approval_token: string;
    createdAt: string;
    email: string;
    image: string;
    is_active: boolean;
    is_approved: string;
    is_deleted: boolean;
    mobile: string;
    name: string;
    password: string;
    status: boolean;
    timezone: string;
    updatedAt: string;
    user_type: number;
    _id: string;
  };
  message: string;
  status: number;
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
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
);

// RESEND APPROVAL ASYNC THUNK
export const resendApprovalLinkAsync = createAsyncThunk(
  "user/resendApprovalLinkAsync",
  async (formData: VerificationScreenFormData) => {
    try {
      const response = await axios.post(resendApprovalLinkUrl, formData);
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

// CHANGE PASSWORD ASYNC THUNK
export const changePasswordAsync = createAsyncThunk(
  "user/changePassword",
  async (formData: ChangePasswordFormData) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.put(changePasswordUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response slice", response);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error || "An error occurred.");
      throw error;
    }
  }
);


// FORGET ASYNC THUNK
export const forgetuserAsync = createAsyncThunk(
  "user/forget",
  async (formData: ForgetPassData) => {
    try {
      const response = await axios.put(forgetPassUrl, formData);
      console.log("response slice", response);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
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

      // CHANGE PASSWORD CASE
      .addCase(changePasswordAsync.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(changePasswordAsync.fulfilled, (state, _action) => {
        state.updateLoading = false;
      })

      // LOGIN ADD CASE
      .addCase(loginuserAsync.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginuserAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload;

        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("accessToken", action.payload?.body?.accesstoken);
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
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
