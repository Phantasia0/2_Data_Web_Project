import { apiSlice } from "./authApi";

export const commentApiWrapper = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: ({ _id, body }) => ({
        url: `post/${_id}/comment`,
        method: "POST",
        params: { _id: _id },
        body,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ post_id, body, _id }) => ({
        url: `post/${post_id}/comment/${_id}`,
        method: "PUT",
        params: { _id: _id },
        body,
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ post_id, _id }) => ({
        url: `post/${post_id}/comment/${_id}`,
        method: "DELETE",
        params: { _id: _id },
      }),
    }),
  }),
});

export const {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApiWrapper;
