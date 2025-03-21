import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';



const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: `${process.env.NEXT_PUBLIC_BASE_API}`,
 
    // baseUrl : "https://tricks-hub-server.vercel.app/api",
    baseUrl : "http://localhost:5000/api",
   
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Posts', 'Post', 'Users', 'User', 'Comments' ],
  endpoints: () => ({}), 
});

export default baseApi;