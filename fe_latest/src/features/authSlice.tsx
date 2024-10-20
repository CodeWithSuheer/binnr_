import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { SignupFormData } from "../auth/Signup";
import { LoginFormData } from "../auth/Login";
import { ForgetPassData } from "../auth/ForgetPass";
import { VerificationScreenFormData } from "../auth/VerificationScreen";
import { ChangePasswordFormData } from "../auth/ChangePassword";
import {
  DeleteAccountFormData,
  UpdateProfileFormData,
} from "../sections/landingPage/UserDetails";

// API URLs
const signupUrl = "/api/auth/signup";
const resendApprovalLinkUrl = "/api/auth/resendApprovalLink";
const loginUrl = "/api/auth/login";
const profileUrl = "/api/auth/profile";
const deleteProfileUrl = "/api/auth/account";

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
      toast.error(error.response.data.message);
    }
  }
);

// GET USER PROFILE ASYNC THUNK
export const getUserProfileAsync = createAsyncThunk(
  "user/getUserProfile",
  async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("response slice", response);
      // toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error || "An error occurred.");
      throw error;
    }
  }
);

// UPDATE PROFILE ASYNC THUNK
export const updateProfileAsync = createAsyncThunk(
  "user/updateProfile",
  async (formData: UpdateProfileFormData) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.put(profileUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response slice", response);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred.");
      throw error;
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
      toast.error(error.response?.data?.message || "An error occurred.");
      throw error;
    }
  }
);

// DELETE PROFILE ASYNC THUNK
export const deleteProfileAsync = createAsyncThunk(
  "user/delete",
  async (formData: DeleteAccountFormData) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.delete(deleteProfileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
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
  userData: User | null;
  loading: boolean;
  signupLoading: boolean;
  loginLoading: boolean;
  forgetLoading: boolean;
  changePassLoading: boolean;
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
  changePassLoading: false,

  // other states
  user: null,
  userData: null,
  forgetPasswordEmail: null,
  resetPassword: null,
  validateToken: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set user data when called
    },
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
        state.changePassLoading = true;
      })
      .addCase(changePasswordAsync.fulfilled, (state, _action) => {
        state.changePassLoading = false;
      })

      // LOGIN ADD CASE
      .addCase(loginuserAsync.pending, (state) => {
        state.loginLoading = true;
      })

      .addCase(loginuserAsync.fulfilled, (state, action) => {
        state.loginLoading = false;

        // Check if action.payload has the necessary properties before updating state and localStorage
        if (
          action.payload &&
          action.payload.body &&
          action.payload.body.accesstoken
        ) {
          state.user = action.payload;

          // Store user data and access token in localStorage only if they are defined
          localStorage.setItem("user", JSON.stringify(action.payload));
          localStorage.setItem("accessToken", action.payload.body.accesstoken);
        } else {
          // Optionally, you can handle the case where login was unsuccessful or data is incomplete
          console.warn(
            "Login failed or received incomplete data:",
            action.payload
          );
        }
      })

      // UPDATE PROFILE ADD CASE
      .addCase(updateProfileAsync.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload;

        localStorage.setItem("user", JSON.stringify(action.payload));
        // localStorage.setItem("accessToken", action.payload?.body?.accesstoken);
      })

      // GET USER PROFILE ADD CASE
      .addCase(getUserProfileAsync.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(getUserProfileAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload;

        localStorage.setItem("userProfile", JSON.stringify(action.payload));
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
      });
  },
});

export const { reset, setUser } = authSlice.actions;

export default authSlice.reducer;
