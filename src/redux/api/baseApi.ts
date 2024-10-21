import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import envConfig from '@/config/envConfig';


const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery : fetchBaseQuery({

        baseUrl : envConfig.baseApi,

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
        
            if (token) {
              headers.set('authorization', `Bearer ${token}`);
            }
        
            return headers;
          },
    }),
    
    tagTypes: [ 'Posts', 'Post', 'Users', 'User', 'Comments'],
    endpoints: () => ({})
})

export default baseApi;