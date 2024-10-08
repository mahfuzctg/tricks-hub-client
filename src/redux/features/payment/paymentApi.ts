
import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        getPaymentHistories : builder.query({
            query: (email: string) => ({
                url : `/payments/?userEmail=${email}`,
                method : "GET",
            }),
        }),

        savePayment : builder.mutation({
            query: (payload ) => ({
                
                url : `/payments`,
                method : "POST", 
                body : payload,  
            }),
            invalidatesTags: ['User', 'Users' ]
        }),
    })
})

export const {
useSavePaymentMutation, useGetPaymentHistoriesQuery } = userApi;