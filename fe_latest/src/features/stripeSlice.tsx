import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const createSubscriptionPlan = "/api/subscription/";
const getAllSubscriptionPlan = "/api/subscription";
const cancelSubscriptionPlan = "/api/subscription";

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

// GET ALL SUBSCRIPTION ASYNC THUNK
export const getAllSubscriptionPlanAsync = createAsyncThunk(
  "stripe/getAllSubscription",
  async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.get(getAllSubscriptionPlan, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred.");
      throw error;
    }
  }
);

// interface CancelSubscriptionPlanPayload {
//   id: string;
// }

// CANCEL SUBSCRIPTION ASYNC THUNK
export const cancelSubscriptionPlanAsync = createAsyncThunk(
  "stripe/cancel",
  async ({ id }: any) => {
    
    console.log("id", id);
    
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.put(`${cancelSubscriptionPlan}/${id}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);
      console.log("response.data", response.data);

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
  allSubscriptionPlans: any;
}

const initialState: PlanState = {
  stripeLoading: false,
  stripeResponse: null,
  allSubscriptionPlans: [],
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
      })

      // GET ALL SUB PLANS CASE
      .addCase(getAllSubscriptionPlanAsync.pending, (state) => {
        state.stripeLoading = true;
      })
      .addCase(getAllSubscriptionPlanAsync.fulfilled, (state, action) => {
        state.stripeLoading = false;
        state.allSubscriptionPlans = action.payload?.body || null;
      })
      .addCase(getAllSubscriptionPlanAsync.rejected, (state) => {
        state.stripeLoading = false;
      });
  },
});

export const { reset } = stripeSlice.actions;

export default stripeSlice.reducer;
