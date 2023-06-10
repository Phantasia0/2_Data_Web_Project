import { apiSlice } from "../services/authApi";

export const authApiWrapper = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body: { id: string; nickname: string; password: string }) => ({
        url: "user/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body: { id: string; password: string }) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/user/current",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } =
  authApiWrapper;
