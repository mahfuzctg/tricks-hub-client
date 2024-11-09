
import { TPost } from "@/app/(withCommon)/(home)/components/CreatePost/CreatePostModal";
import baseApi from "../../api/baseApi";


const postApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        createPost : builder.mutation({
            query: (post : TPost) => ({
                url : '/posts',
                method : "POST",
                body: post,   
            }),
           invalidatesTags: ['Posts']
        }),

        getPosts : builder.query({
            query: (query) => ({
                url : '/posts',
                method : "GET",
                params : query,
            }),
            providesTags: ['Posts']
        }),


        getSinglePost : builder.query({
            query: (postId: string) => ({
                url : `/posts/${postId}`,
                method : "GET",   
            }),
            providesTags : ['Post']
        }),

        deletePost : builder.mutation({
            query: (postId: string) => ({
                url : `/posts/${postId}`,
                method : "DELETE",   
            }),
            invalidatesTags: ['Posts']
        }),
        
        updatePost : builder.mutation({
            query: ({ postId , payload } : { postId: string, payload:Partial<TPost>}) => ({
                
                url : `/posts/${postId}`,
                method : "PUT", 
                body : payload,  
            }),
            invalidatesTags: ['Posts', 'Post']
        }),
        
        votePost : builder.mutation({
            query: (payload) => ({
          
                
                url : `/posts/vote`,
                method : "POST", 
                body : payload,  
            }),
            invalidatesTags: ['Posts', 'Post']
        }),
        
    })
})

export const {
    useCreatePostMutation,
     useGetPostsQuery,
      useUpdatePostMutation,
       useDeletePostMutation,
        useGetSinglePostQuery, useVotePostMutation
    } = postApi;