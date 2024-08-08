'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const filmsApi = createApi({
   reducerPath: 'filmsApi',
   baseQuery: fetchBaseQuery({ baseUrl: '/api/movies' }),
   endpoints: (build) => ({
      getFilms: build.query({
         query: ({ activePage = 1, keywords = '' }) => {
            let url = `?page=${activePage}`;

            if (keywords) {
               url += `&keyword=${encodeURIComponent(keywords)}`;
            }

            return {
               url: url,
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            };
         },
      }),
   }),
});

export const { useGetFilmsQuery } = filmsApi;
export default filmsApi.reducer;
