import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  keyword?: string | null;
  data?: any;
  filtered?: boolean;
  pageNumber?: number;
}

const initialState: ProfileState = {
  keyword: null,
  data: null,
  filtered: false,
  pageNumber: 1,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    searchKeyword: (state, action: PayloadAction<ProfileState | null>) => {
      if (action?.payload !== null) {
        state.keyword = action.payload.keyword;
      }
    },
    updateData: (state, action: PayloadAction<ProfileState | null>) => {
      if (action?.payload !== null) {
        state.data = action.payload.data;
      }
    },
    resetData: (state) => {
      state.keyword = null;
      state.filtered = false;
    },
    goPage: (state, action: PayloadAction<ProfileState | null>) => {
      state.pageNumber = action?.payload?.pageNumber;
    },
  },
});

export const { searchKeyword, updateData, resetData, goPage } =
  profileSlice.actions;
export default profileSlice.reducer;
