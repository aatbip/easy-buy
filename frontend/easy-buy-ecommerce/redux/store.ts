import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import hostReducer from "./hostDashboard/hostDashboardSlice";
import userReducer from "./userDashboard/userDashboardSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    hostDashboard: hostReducer,
    userDashboard: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
