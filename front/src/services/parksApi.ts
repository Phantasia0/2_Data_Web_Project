import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ParkData, Park } from "../models/park.model";

export const parksApi = createApi({
  reducerPath: "parksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${window.location.hostname}:5001/`,
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
    getParksData: builder.query<ParkData, number>({
      query: (page: number) => `/park?page=${page}`,
    }),
    getParksFilteredData: builder.query<
      ParkData,
      { page?: number | null; region?: string | null }
    >({
      query: ({ page, region }) => {
        let queryString = "/park/search";

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

        return queryString;
      },
    }),
    getParkDetailData: builder.query<Park, string>({
      query: (id) => `/park/${id}`,
    }),
    putParkIntoBasket: builder.mutation<any, any>({
      query: (_id) => ({
        url: `park/contact`,
        method: "PUT",
        body: { _id },
      }),
    }),
  }),
});

export const {
  useGetParksDataQuery,
  useGetParksFilteredDataQuery,
  useGetParkDetailDataQuery,
  usePutParkIntoBasketMutation,
} = parksApi;
