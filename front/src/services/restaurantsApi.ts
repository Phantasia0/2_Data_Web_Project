import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RestaurantData, Restaurant } from "../models/restaurant.model";

export const restaurantsApi = createApi({
  reducerPath: "restaurantsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }),
  endpoints: (builder) => ({
    getRestaurantsData: builder.query<RestaurantData, void>({
      query: () => "/restaurant",
    }),
    getRestaurantsFilteredData: builder.query<
      Restaurant[],
      { region?: string | null; foodCategory?: string | null }
    >({
      query: ({ region, foodCategory }) => {
        let queryString = "/restaurant/search";

        if (region) {
          queryString += `?region=${encodeURIComponent(region)}`;
        } else {
          queryString += "?region";
        }
        if (foodCategory) {
          if (queryString.includes("?")) {
            queryString += `&category=${encodeURIComponent(foodCategory)}`;
          } else {
            queryString += `?category=${encodeURIComponent(foodCategory)}`;
          }
        } else {
          queryString += "&category";
        }

        return queryString;
      },
    }),
    getRestaurantDetailData: builder.query<Restaurant, string>({
      query: (id) => `/restaurant/${id}`,
    }),
  }),
});

export const kakaoApi = createApi({
  reducerPath: "kakaoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/",
  }),
  endpoints: (builder) => ({
    getDetailData: builder.query<any, string>({
      query: (id) => `/kakao/${id}`, // 백엔드 서버로의 요청 경로로 변경
    }),
  }),
});

export const {
  useGetRestaurantsDataQuery,
  useGetRestaurantsFilteredDataQuery,
  useGetRestaurantDetailDataQuery,
} = restaurantsApi;

export const { useGetDetailDataQuery } = kakaoApi;
