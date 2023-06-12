import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SocialData, Social } from "../models/social.model";
import { socialApi, useGetSocialDataQuery } from "../services/socialApi";

interface SocialState {
  feeds?: any[];
  total?: number;
  deletedFeeds?: any[];
  currentPage?: number;
}

const initialState: SocialState = {
  feeds: [],
  total: 0,
  deletedFeeds: [],
  currentPage: 1,
};

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    getAllFeed: (state, action: PayloadAction<any>) => {
      if (action?.payload !== null) {
        state.total = action?.payload.total;
        for (let i = 0; i < action?.payload.feeds.length; i++) {
          const newFeed = action?.payload.feeds[i];
          const isExisting = state?.feeds?.some(
            (feed) => feed._id === newFeed._id
          );
          const isDeleted = state?.deletedFeeds?.some(
            (deletedFeedId) => deletedFeedId === newFeed._id
          );
          if (!isExisting && !isDeleted) {
            state?.feeds?.push(newFeed);
          }
        }
      }
    },
    updateThisFeed: (state, action: PayloadAction<any>) => {
      if (action?.payload !== null) {
        const feedId = action?.payload?._id;
        const newContent = action?.payload?.content;
        const feedToUpdate = state?.feeds?.find((feed) => feed._id === feedId);
        if (feedToUpdate) {
          feedToUpdate.content = newContent;
        }
      }
    },
    deleteThisFeed: (state, action: PayloadAction<any>) => {
      if (action?.payload !== null) {
        const feedId = action.payload;
        state.feeds = state?.feeds?.filter((feed) => feed._id !== feedId);
        state?.deletedFeeds?.push(feedId);
      }
    },
    goNext: (state, action: PayloadAction<any>) => {
      if (action?.payload !== null) {
        // @ts-ignore
        if (Number(state.total / 4) > state.currentPage) {
          state.currentPage += action?.payload;
        }
      }
    },
  },
});

export const { getAllFeed, deleteThisFeed, updateThisFeed, goNext } =
  socialSlice.actions;

export default socialSlice.reducer;
