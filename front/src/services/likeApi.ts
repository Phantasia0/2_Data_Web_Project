import { apiSlice } from "./authApi";

export const likeApiWrapper = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateLike: builder.mutation({
      query: ({ _id }) => ({
        url: `post/${_id}/like`,
        method: "PUT",
        params: { _id: _id },
      }),
    }),
  }),
});

export const { useUpdateLikeMutation } = likeApiWrapper;
