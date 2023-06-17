import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "../models/activity.model";

export interface ActiviyState {
  dataObject: {
    [key: string]: Activity[];
  };
  data: Activity[] | undefined;
  categories: string[];
  category: string;
  filtered: boolean;
}

const initialState: ActiviyState = {
  dataObject: {},
  data: [],
  categories: ["교통", "전기", "냉/난방", "자원"],
  category: "",
  filtered: false,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    updateAllData: (state, action: PayloadAction<ActiviyState>) => {
      state?.categories?.reduce(
        (acc: { [key: string]: Activity[] }, cur: string) => {
          if (action?.payload.data) {
            acc[cur] = [
              ...action.payload.data.filter(
                (item: Activity) => item?.category === cur
              ),
            ];
          }
          return acc;
        },
        state.dataObject
      );
      state.filtered = true;
    },
    updateData: (state, action: PayloadAction<ActiviyState>) => {
      const category = action.payload.category;
      if (state.categories.includes(category)) {
        if (action.payload.data) {
          state.dataObject = {
            ...state.dataObject,
            [category]: action.payload?.data,
          };
        }
      }
    },
    filterBySelected: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        const category = action.payload;
        if (!state.categories.includes(category)) {
          state.categories.push(category);
        }
        state.category = category;
        state.filtered = true;
      }
    },
    removeSelected: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        const category = action.payload;
        if (state.dataObject.hasOwnProperty(category)) {
          delete state.dataObject[category];
        }
      }
    },
  },
});

export const { filterBySelected, removeSelected, updateData, updateAllData } =
  activitySlice.actions;
export default activitySlice.reducer;
