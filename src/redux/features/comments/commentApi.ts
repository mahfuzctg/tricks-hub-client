

import { TComment } from "@/app/(withCommon)/(home)/components/CreatePost/CreatePostModal";
import baseApi from "../../api/baseApi";


const commentApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        getComments : builder.query({
            query: (query) => ({
                url : `/comments/${query.postId}`,
                method : "GET",
                params : query,
            }),
            providesTags: ['Comments']
        }),

        deleteComment : builder.mutation({
            query: (commentId: string) => ({
                url : `/comments/${commentId}`,
                method : "DELETE",   
            }),
            invalidatesTags: ['Posts', 'Comments']
        }),

        addComment : builder.mutation({
            query: (comment : TComment) => ({
                
                url : `/comments`,
                method : "POST", 
                body : comment,  
            }),
            invalidatesTags: ['Posts', 'Comments']
        }),
        
        updateComment : builder.mutation({
            query: ({ commentId , payload } : { commentId: string, payload:Partial<TComment>}) => ({
                
                url : `/comments/${commentId}`,
                method : "PATCH", 
                body : payload,  
            }),
            invalidatesTags: ['Posts', 'Comments']
        }),

    })
})

export const {
     useAddCommentMutation, useGetCommentsQuery, useDeleteCommentMutation, useUpdateCommentMutation
    } = commentApi;
