// @ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./authApi";

export const socialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeed: builder.query<any, string>({
      query: (_id: string) => `/post/${_id}`,
    }),
  }),
});

export const { useGetFeedQuery } = socialApi;

export const newSocialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSocialData: builder.query<any, any>({
      query: (page: number) => ({
        url: `/post?page=${page}`,
      }),
    }),
    getNicknameData: builder.query<any, any>({
      query: ({ nickname, page }) => ({
        url: `/post/search?nickname=${nickname}&page=${page}`,
      }),
    }),
  }),
});

export const { useGetSocialDataQuery, useGetNicknameDataQuery } = newSocialApi;
