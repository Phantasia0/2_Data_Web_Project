import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ActivityData } from "../models/activity.model";

export const activitysApi = createApi({
  reducerPath: "activitysApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${window.location.hostname}:5001/`,
  }),
  endpoints: (builder) => ({
    getActivitysData: builder.query<ActivityData, string>({
      query: (category: string) => `/activity?category=${category}`,
    }),
  }),
});

export const { useGetActivitysDataQuery } = activitysApi;
