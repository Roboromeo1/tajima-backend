import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    // No need to manually add the token to the headers
    console.log('Headers:', headers);
    return headers;
  },
  credentials: 'include', // This is the important part for handling cookies
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User','ColorSet'],
  endpoints: (builder) => ({}),
});
