import { apiSlice } from "./authApi";

export const feedApiWrapper = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFeed: builder.mutation({
      query: (body: any) => ({
        url: "post",
        method: "POST",
        body,
      }),
    }),
    updateFeed: builder.mutation({
      query: ({ _id, body }) => ({
        url: `post/${_id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteFeed: builder.mutation({
      query: ({ _id }) => ({
        url: `post/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddFeedMutation,
  useUpdateFeedMutation,
  useDeleteFeedMutation,
} = feedApiWrapper;
