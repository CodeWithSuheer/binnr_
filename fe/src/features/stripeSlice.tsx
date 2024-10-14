import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const createSubscriptionPlan = "/api/subscription/";


// CREATE SUBSCRIPTION ASYNC THUNK
export const createSubscriptionPlanAsync = createAsyncThunk(
  "stripe/subscription",
  async (formData: any) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.post(createSubscriptionPlan, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred.");
      throw error;
    }
  }
);

// INITIAL STATE
interface PlanState {
  stripeLoading: boolean;
  stripeResponse: any;
}

const initialState: PlanState = {
  stripeLoading: false,
  stripeResponse: null,
};

const stripeSlice = createSlice({
  name: "planSlice",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET CREATE SUB PLANS CASE
      .addCase(createSubscriptionPlanAsync.pending, (state) => {
        state.stripeLoading = true;
      })
      .addCase(createSubscriptionPlanAsync.fulfilled, (state, action) => {
        state.stripeLoading = false;
        state.stripeResponse = action.payload?.body || null;
      })
      .addCase(createSubscriptionPlanAsync.rejected, (state) => {
        state.stripeLoading = false;
      });
  },
});

export const { reset } = stripeSlice.actions;

export default stripeSlice.reducer;
