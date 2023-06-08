import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "../models/activity.model";

export interface ActiviyState {
  datas?: {
    [key: string]: Activity[];
  };
  data?: Activity[];
  categories?: string[];
  category?: string;
  filtered?: boolean;
}

const initialState: ActiviyState = {
  datas: {},
  data: [],
  categories: [],
  category: "",
  filtered: false,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    updateAllData: (state, action: PayloadAction<ActiviyState | null>) => {
      if (action?.payload !== null) {
        // @ts-ignore
        state.categories = [...action?.payload?.categories];
        state.categories?.reduce((acc, cur) => {
          // @ts-ignore
          acc[cur] = [
            // @ts-ignore
            ...action?.payload?.data?.filter((item) => item.category === cur),
          ];
          return acc;
        }, state.datas);
        state.filtered = true;
      }
    },
    updateData: (state, action: PayloadAction<ActiviyState | null>) => {
      if (
        action?.payload !== null &&
        typeof action?.payload?.category === "string"
      ) {
        const category = action.payload.category;
        // @ts-ignore
        if (state.categories.includes(category)) {
          // @ts-ignore
          state.datas = { ...state.datas, [category]: action.payload?.data };
        }
      }
    },
    filterBySelected: (state, action: PayloadAction<ActiviyState | null>) => {
      if (action?.payload !== null) {
        if (action.payload.category) {
          const category = action.payload.category;
          // @ts-ignore
          if (!state.categories.includes(category)) {
            // @ts-ignore
            state.categories.push(category);
          }
          state.category = category;
          state.filtered = true;
        }
      }
    },
    removeSelected: (state, action: PayloadAction<ActiviyState | null>) => {
      if (
        action?.payload !== null &&
        typeof action?.payload?.category === "string"
      ) {
        if (action.payload.category) {
          const category = action.payload.category;
          // @ts-ignore
          state.categories = state?.categories.filter(
            (item) => item !== category
          );
          // @ts-ignore
          if (state.datas.hasOwnProperty(category)) {
            // @ts-ignore
            delete state.datas[category];
          }
        }
      }
    },
  },
});

export const { filterBySelected, removeSelected, updateData, updateAllData } =
  activitySlice.actions;
export default activitySlice.reducer;
