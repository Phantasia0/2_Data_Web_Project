import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_BASE_URL } from "./constant";

export const kakaoApi = createApi({
  reducerPath: "kakaoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getDetailData: builder.query<any, string>({
      query: (id) => `/kakao/${id}`,
    }),
  }),
});

export const { useGetDetailDataQuery } = kakaoApi;
