import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import planSlice from "../features/planSlice";
import stripeSlice from "../features/stripeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    plan: planSlice,
    stripe: stripeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
