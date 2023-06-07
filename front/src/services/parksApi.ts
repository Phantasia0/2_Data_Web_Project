import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ParkData, Park } from "../models/park.model";

export const parksApi = createApi({
  reducerPath: "parksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }),
  endpoints: (builder) => ({
    getParksData: builder.query<ParkData, number>({
      query: (page: number) => `/park?page=${page}`,
    }),
    getParksFilteredData: builder.query<Park[], { region?: string | null }>({
      query: ({ region }) => {
        let queryString = "/park/search";

        if (region) {
          queryString += `?region=${encodeURIComponent(region)}`;
        } else {
          queryString += "?region";
        }

        return queryString;
      },
    }),
    getParkDetailData: builder.query<Park, string>({
      query: (id) => `/park/${id}`,
    }),
  }),
});

export const {
  useGetParksDataQuery,
  useGetParksFilteredDataQuery,
  useGetParkDetailDataQuery,
} = parksApi;
