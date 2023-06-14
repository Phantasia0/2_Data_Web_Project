import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/AuthReducer";

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
