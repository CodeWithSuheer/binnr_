import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// API URLs
const getAllSubscriptionPlanUrl = "/api/subscription/plan";

// Interface for a single subscription plan
interface SubscriptionPlan {
  _id: string;
  createdBy: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
  isActive: boolean;
  stripePlanId: string;
  stripeProductId: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for the API response body
interface SubscriptionPlanResponse {
  status: number;
  message: string;
  body: SubscriptionPlan[];
}

// GET ALL SUBSCRIPTION PLANS ASYNC THUNK
export const getAllSubscriptionPlansAsync = createAsyncThunk(
  "get/allSubPlan",
  async () => {
    try {
      const response = await axios.get<SubscriptionPlanResponse>(
        getAllSubscriptionPlanUrl
      );
      //   console.log("response", response);
      //   toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
);

// INITIAL STATE
interface PlanState {
  subLoading: boolean;
  allSubPlans: SubscriptionPlan[] | null;
}

const initialState: PlanState = {
  subLoading: false,
  allSubPlans: null,
};

const planSlice = createSlice({
  name: "planSlice",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET ALL SUB PLANS CASE
      .addCase(getAllSubscriptionPlansAsync.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(getAllSubscriptionPlansAsync.fulfilled, (state, action) => {
        state.subLoading = false;
        state.allSubPlans = action.payload?.body || null;

        localStorage.setItem(
          "allSubPlans",
          JSON.stringify(action.payload?.body || [])
        );
      })
      .addCase(getAllSubscriptionPlansAsync.rejected, (state) => {
        state.subLoading = false;
      });
  },
});

export const { reset } = planSlice.actions;

export default planSlice.reducer;
