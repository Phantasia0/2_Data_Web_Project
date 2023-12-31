import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RestaurantData, Restaurant } from "../models/restaurant.model";
import { API_BASE_URL } from "./constant";

export const restaurantsApi = createApi({
  reducerPath: "restaurantsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // @ts-ignore
      const token = sessionStorage.getItem("user");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRestaurantsData: builder.query<RestaurantData, number>({
      query: (page: number) => `/restaurant?page=${page}`,
    }),
    getRestaurantNotContactData: builder.query<any, number>({
      query: (page: number) => `/restaurant/contact?page=${page}`,
    }),
    getRestaurantsFilteredData: builder.query<
      RestaurantData,
      {
        region?: string | null;
        foodCategory?: string | null;
        page?: number | null;
      }
    >({
      query: ({ region, foodCategory, page }) => {
        let queryString = "/restaurant/search";

        if (page) {
          queryString += `?page=${encodeURIComponent(page)}`;
        } else {
          queryString += "?page";
        }

        if (region) {
          if (queryString.includes("?")) {
            queryString += `&region=${encodeURIComponent(region)}`;
          } else {
            queryString += `?region=${encodeURIComponent(region)}`;
          }
        } else {
          queryString += "&region";
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
    getRestaurantsFilteredNotContactData: builder.query<
      any,
      {
        region?: string | null;
        foodCategory?: string | null;
        page?: number | null;
      }
    >({
      query: ({ region, foodCategory, page }) => {
        let queryString = "/restaurant/search/contact";

        if (page) {
          queryString += `?page=${encodeURIComponent(page)}`;
        } else {
          queryString += "?page";
        }

        if (region) {
          if (queryString.includes("?")) {
            queryString += `&region=${encodeURIComponent(region)}`;
          } else {
            queryString += `?region=${encodeURIComponent(region)}`;
          }
        } else {
          queryString += "&region";
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
    putRestaurantIntoBasket: builder.mutation<any, any>({
      query: (_id) => ({
        url: `restaurant/contact`,
        method: "PUT",
        body: { _id },
      }),
    }),
  }),
});

export const {
  useGetRestaurantsDataQuery,
  useGetRestaurantsFilteredDataQuery,
  useGetRestaurantDetailDataQuery,
  usePutRestaurantIntoBasketMutation,
  useGetRestaurantNotContactDataQuery,
  useGetRestaurantsFilteredNotContactDataQuery,
} = restaurantsApi;
