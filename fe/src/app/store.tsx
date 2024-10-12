import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import planSlice from "../features/planSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    plan: planSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
