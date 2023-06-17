import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ActivityData } from "../models/activity.model";
import { API_BASE_URL } from "./constant";

export const activitiesApi = createApi({
  reducerPath: "activitiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getActivitiesData: builder.query<ActivityData, string>({
      query: (category: string) => `/activity?category=${category}`,
    }),
  }),
});

export const { useGetActivitiesDataQuery } = activitiesApi;
