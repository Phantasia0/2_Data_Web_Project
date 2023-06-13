import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./AppState";
import { restaurantsApi } from "../services/restaurantsApi";
import { kakaoApi } from "../services/restaurantsApi";
import { parksApi } from "../services/parksApi";
import { activitysApi } from "../services/activityApi";
import { apiSlice } from "../services/authApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      restaurantsApi.middleware,
      kakaoApi.middleware,
      parksApi.middleware,
      activitysApi.middleware,
      apiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
