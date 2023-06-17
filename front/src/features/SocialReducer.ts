import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SKIPCOUNT } from "../utils/validate";

interface SocialState {
  feeds?: any[];
  total?: number;
  deletedFeeds?: any[];
  currentPage?: number;
  commentUpdated?: any;
}

const initialState: SocialState = {
  feeds: [],
  total: 0,
  deletedFeeds: [],
  currentPage: 1,
  commentUpdated: false,
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

          if (isExisting) {
            const existingFeedIndex = state?.feeds?.findIndex(
              (feed) => feed._id === newFeed._id
            );
            // @ts-ignore
            state.feeds = [
              // @ts-ignore
              ...state?.feeds?.slice(0, existingFeedIndex),

              {
                // @ts-ignore
                ...state?.feeds[existingFeedIndex],
                commentCount: newFeed.commentCount,
                likeCheck: newFeed.likeCheck,
              },
              // @ts-ignore
              ...state?.feeds.slice(existingFeedIndex + 1),
            ];
          }

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
        if (Number(state.total / SKIPCOUNT) > state.currentPage) {
          state.currentPage += action?.payload;
        }
      }
    },
    resetCurrentPage: (state, action: PayloadAction<any>) => {
      state.currentPage = 1;
    },
    addThisFeed: (state, action: PayloadAction<any>) => {
      state?.feeds?.unshift(action?.payload);
    },
    updateThisFeedComment: (state, action: PayloadAction<any>) => {
      if (action?.payload !== null) {
        const feedId = action?.payload?._id;
        state.commentUpdated = true;
        const feedToUpdate = state?.feeds?.find((feed) => feed._id === feedId);
        if (feedToUpdate) {
          // @ts-ignore
          feedToUpdate.commentCount += action?.payload?.commentCount;
          // @ts-ignore
          state.commentUpdated = false;
        }
      }
    },
  },
});

export const {
  getAllFeed,
  deleteThisFeed,
  updateThisFeed,
  goNext,
  resetCurrentPage,
  addThisFeed,
  updateThisFeedComment,
} = socialSlice.actions;

export default socialSlice.reducer;
