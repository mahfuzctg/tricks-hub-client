
import baseApi from "../../api/baseApi";
import { TUser } from "../authentication/authSlice";


const userApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        getUsers : builder.query({
            query: (query) => ({
                url : '/users',
                method : "GET",
                params : query,
            }),
            providesTags: ['Users']
        }),

        getSingleUser : builder.query({
            query: (userEmail: string) => ({
                url : `/users/${userEmail}`,
                method : "GET",   
            }),
            providesTags : ['User']
        }),

        deleteUser : builder.mutation({
            query: (userId: string) => ({
                url : `/users/${userId}`,
                method : "DELETE",   
            }),
            invalidatesTags: ['Users']
        }),

        followUser : builder.mutation({
            query: (payload : { userId: string, targetedUserId : string}) => ({
                url : `/users/follow`,
                method : "PATCH", 
                body : payload,  
            }),
            invalidatesTags: ['User', 'Users']
        }),
        unFollowUser : builder.mutation({
            query: (payload : { userId: string, targetedUserId : string}) => ({
                url : `/users/unfollow`,
                method : "PATCH", 
                body : payload,  
            }),
            invalidatesTags: ['User', 'Users']
        }),

        updateUser : builder.mutation({
            query: ({ userId , payload } : { userId: string, payload:Partial<TUser>}) => ({
                
                url : `/users/${userId}`,
                method : "PUT", 
                body : payload,  
            }),
            invalidatesTags: ['User', 'Users' ]
        }),
    })
})

export const {
useGetSingleUserQuery, useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation, useFollowUserMutation, useUnFollowUserMutation
 } = userApi;