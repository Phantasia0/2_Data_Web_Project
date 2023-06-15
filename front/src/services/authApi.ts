import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://${window.location.hostname}:5001/`,
  prepareHeaders: (headers) => {
    // @ts-ignore
    const token = sessionStorage.getItem("user");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
