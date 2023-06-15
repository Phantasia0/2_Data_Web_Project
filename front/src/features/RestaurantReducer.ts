import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RestaurantState {
  keyword?: string | null;
  data?: any;
  region?: string | null;
  foodCategory?: string | null;
  filtered?: boolean;
  pageNumber?: number;
  foodCategoryList?: string[] | null;
  pageFilteredNumber?: number;
}

const initialState: RestaurantState = {
  keyword: null,
  data: null,
  region: null,
  foodCategory: null,
  filtered: false,
  pageNumber: 1,
  foodCategoryList: [],
  pageFilteredNumber: 1,
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
          state.filtered = true;
          state.keyword = "";
        }
        if (action.payload.foodCategory) {
          state.foodCategory = action.payload.foodCategory;
          state.filtered = true;
        }
      }
    },
    resetData: (state) => {
      state.keyword = null;
      state.region = null;
      state.foodCategory = null;
      state.filtered = false;
      state.pageFilteredNumber = 1;
      state.pageNumber = 1;
      state.foodCategoryList = [];
    },
    goPage: (state, action: PayloadAction<RestaurantState | null>) => {
      state.pageNumber = action?.payload?.pageNumber;
    },
    setFoodCategoryList: (state, action: PayloadAction<any>) => {
      if (action?.payload !== null) {
        state.foodCategory = null;
        state.foodCategoryList = [];
        // @ts-ignore
        state.foodCategoryList = [...action?.payload];
      }
    },
    resetFood: (state) => {
      state.foodCategory = null;
      state.pageFilteredNumber = 1;
    },
    goFilteredPage: (state, action: PayloadAction<RestaurantState | null>) => {
      state.pageFilteredNumber = action?.payload?.pageFilteredNumber;
    },
    resetFilterPage: (state) => {
      state.pageFilteredNumber = 1;
    },
  },
});

export const {
  searchKeyword,
  updateData,
  filterBySelected,
  resetData,
  goPage,
  setFoodCategoryList,
  resetFood,
  goFilteredPage,
  resetFilterPage,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
