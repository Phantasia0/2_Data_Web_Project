import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  keyword?: string | null;
  data?: any;
  filtered?: boolean;
  pageNumber?: number;
  total?: number;
  commentListUpdate?: false;
}

const initialState: ProfileState = {
  keyword: null,
  data: null,
  filtered: false,
  pageNumber: 1,
  total: 12,
  commentListUpdate: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    searchKeyword: (state, action: PayloadAction<ProfileState | null>) => {
      if (action?.payload !== null) {
        state.keyword = action.payload.keyword;
        state.filtered = true;
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
      state.pageNumber = 1;
    },
    goPage: (state, action: PayloadAction<ProfileState | null>) => {
      state.pageNumber = action?.payload?.pageNumber;
    },
    setTotal: (state, action: PayloadAction<number | null>) => {
      if (action?.payload !== null) {
        state.total = action?.payload;
      }
    },
    updateCommentList: (state) => {
      // @ts-ignore
      state.commentListUpdate = !state.commentListUpdate;
    },
  },
});

export const {
  searchKeyword,
  updateData,
  resetData,
  goPage,
  setTotal,
  updateCommentList,
} = profileSlice.actions;
export default profileSlice.reducer;
