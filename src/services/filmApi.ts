'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const filmApi = createApi({
   reducerPath: 'filmApi',
   baseQuery: fetchBaseQuery({ baseUrl: '/api/movie' }),
   endpoints: (build) => ({
      getFilmDescription: build.mutation({
         query: (id = 301) => ({
            url: `?id=${id}`,
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         }),
      }),
   }),
});

export const { useGetFilmDescriptionMutation } = filmApi;
export default filmApi.reducer;
