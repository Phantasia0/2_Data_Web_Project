import { combineReducers } from "@reduxjs/toolkit";
import restaurantReducer from "./RestaurantReducer";
import { restaurantsApi } from "../services/restaurantsApi";
import { kakaoApi } from "../services/restaurantsApi";
import parkReducer from "./ParkReducer";
import { parksApi } from "../services/parksApi";
import activityReducer from "./ActivityReducer";
import { activitysApi } from "../services/activityApi";

export const rootReducer = combineReducers({
  restaurant: restaurantReducer,
  [restaurantsApi.reducerPath]: restaurantsApi.reducer,
  [kakaoApi.reducerPath]: kakaoApi.reducer,
  park: parkReducer,
  [parksApi.reducerPath]: parksApi.reducer,
  activity: activityReducer,
  [activitysApi.reducerPath]: activitysApi.reducer,
});
