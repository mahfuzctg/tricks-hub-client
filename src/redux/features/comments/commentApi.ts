import { TComment } from "@/app/(withCommon)/(home)/components/CreatePost/CreatePostModal";
import baseApi from "../../api/baseApi";

type GetCommentsQuery = {
  postId: string;
  limit?: number;
  offset?: number;
};

type UpdateCommentPayload = {
  commentId: string;
  payload: Partial<TComment>;
};

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get comments for a specific post
    getComments: builder.query({
      query: ({ postId, limit, offset }: GetCommentsQuery) => ({
        url: `/comments/${postId}`, // Endpoint to fetch comments
        method: "GET",
        params: { limit, offset },
      }),
      providesTags: ["Comments"], // Caches and tags comments
    }),

    // Mutation to delete a comment by its ID
    deleteComment: builder.mutation({
      query: (commentId: string) => ({
        url: `/comments/${commentId}`, // Matches backend delete route
        method: "DELETE",
      }),
      invalidatesTags: ["Comments", "Posts"], // Invalidates comments and posts cache
    }),

    // Mutation to add a new comment
    addComment: builder.mutation({
      query: (comment: TComment) => ({
        url: `/comments`, // Matches backend add route
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Posts", "Comments"], // Refresh posts and comments
    }),

    // Mutation to update a comment by its ID
    updateComment: builder.mutation({
      query: ({ commentId, payload }: UpdateCommentPayload) => ({
        url: `/comments/${commentId}`, // Matches backend update route
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Posts", "Comments"], // Refresh posts and comments
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
