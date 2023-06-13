import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ActivityData } from "../models/activity.model";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${window.location.hostname}:5001`,
  }),
  endpoints: (builder) => ({
    getUserFeed: builder.query<any, any>({
      query: ({ _id, page }: any) => ({
        url: `/post/user/${_id}?page=${page}`,
        method: "GET",
        params: { _id: _id },
      }),
    }),
    getUserComment: builder.query<any, any>({
      query: ({ _id, page }: any) => ({
        url: `/post/user/${_id}/comment?page=${page}`,
        method: "GET",
        params: { _id: _id },
      }),
    }),
  }),
});

export const { useGetUserFeedQuery, useGetUserCommentQuery } = profileApi;
