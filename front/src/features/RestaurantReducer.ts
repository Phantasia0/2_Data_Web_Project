import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RestaurantState {
  keyword?: string | null;
  data?: any;
  region?: string | null;
  foodCategory?: string | null;
}

const initialState: RestaurantState = {
  keyword: null,
  data: null,
  region: null,
  foodCategory: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    searchKeyword: (state, action: PayloadAction<RestaurantState | null>) => {
      if (action?.payload !== null) {
        state.keyword = action.payload.keyword;
      }
    },
    updateData: (state, action: PayloadAction<RestaurantState | null>) => {
      if (action?.payload !== null) {
        state.data = action.payload.data;
      }
    },
    filterBySelected: (
      state,
      action: PayloadAction<RestaurantState | null>
    ) => {
      if (action?.payload !== null) {
        if (action.payload.region) {
          state.region = action.payload.region;
        }
        if (action.payload.foodCategory) {
          state.foodCategory = action.payload.foodCategory;
        }
      }
    },
    resetData: (state) => {
      state.keyword = null;
      state.region = null;
      state.foodCategory = null;
    },
  },
});

export const { searchKeyword, updateData, filterBySelected, resetData } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
