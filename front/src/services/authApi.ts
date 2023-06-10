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

// const baseQueryWithReauth = async (
//   args: string | FetchArgs,
//   api: BaseQueryApi,
//   extraOptions: {}
// ) => {
//   let result = await baseQuery(args, api, extraOptions);
//
//   // @ts-ignore
//   if (result?.error?.originalStatus === 403) {
//     console.log("sending refresh token");
//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       // @ts-ignore
//       const user = api.getState().auth.user;
//       // @ts-ignore
//       api.dispatch(setCredentials({ ...refreshResult.data, user }));
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }
//
//   return result;
// };

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
