import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ParkState {
  data?: any;
  region?: string | null;
  filtered?: boolean;
  pageNumber?: number;
  pageFilteredNumber?: number;
}

const initialState: ParkState = {
  data: null,
  region: null,
  filtered: false,
  pageNumber: 1,
  pageFilteredNumber: 1,
};

const parkSlice = createSlice({
  name: "park",
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<ParkState | null>) => {
      if (action?.payload !== null) {
        state.data = action.payload.data;
      }
    },
    filterBySelected: (state, action: PayloadAction<ParkState | null>) => {
      if (action?.payload !== null) {
        if (action.payload.region) {
          state.region = action.payload.region;
          state.filtered = true;
        }
      }
    },
    resetData: (state) => {
      state.region = null;
      state.filtered = false;
      state.pageNumber = 1;
      state.pageFilteredNumber = 1;
    },
    goPage: (state, action: PayloadAction<ParkState | null>) => {
      state.pageNumber = action?.payload?.pageNumber;
    },
    goFilteredPage: (state, action: PayloadAction<ParkState | null>) => {
      state.pageFilteredNumber = action?.payload?.pageFilteredNumber;
    },
    resetFilterPage: (state) => {
      state.pageFilteredNumber = 1;
    },
  },
});

export const {
  updateData,
  filterBySelected,
  resetData,
  goPage,
  goFilteredPage,
  resetFilterPage,
} = parkSlice.actions;
export default parkSlice.reducer;
