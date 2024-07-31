import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const filmsApi = createApi({
   reducerPath: 'filmsApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'https://kinopoiskapiunofficial.tech/api/v2.2/films' }),
   endpoints: (build) => ({
      getFilms: build.query({
         query: ({ activePage = 1, keywords = '' }) => ({
            url: `${(activePage || keywords) && '?'}${activePage && 'page=' + activePage}${activePage && '&'}${keywords && 'keyword=' + encodeURIComponent(keywords)}`,
            method: 'GET',
            headers: {
               'X-API-KEY': import.meta.env.VITE_API_KEY,
               'Content-Type': 'application/json',
            },
         }),
      }),
      getFilmDescription: build.mutation({
         query: (id = 301) => ({
            url: `/${id}`,
            method: 'GET',
            headers: {
               'X-API-KEY': import.meta.env.VITE_API_KEY,
               'Content-Type': 'application/json',
            },
         }),
      }),
   }),
});

export const { useGetFilmsQuery, useGetFilmDescriptionMutation } = filmsApi;
export default filmsApi.reducer;
