import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieProps, MoviesState } from '@typesfolder/types';

export const initialState: MoviesState = {
   activePage: 1,
   movies: [],
   totalPages: null,
   keywords: '',
   isError: false,
};

const stateSlice = createSlice({
   name: 'state',
   initialState: initialState,
   reducers: {
      setActivePage(state, action: PayloadAction<number>) {
         state.activePage = action.payload;
      },

      setMovies(state, action: PayloadAction<MovieProps[]>) {
         state.movies = action.payload;
      },

      setTotalPages(state, action: PayloadAction<number>) {
         state.totalPages = action.payload;
      },

      setKeywords(state, action: PayloadAction<string>) {
         state.keywords = action.payload;
      },

      setIsError(state, action: PayloadAction<boolean>) {
         state.isError = action.payload;
      },
   },
});

export const { setActivePage, setMovies, setTotalPages, setKeywords, setIsError } = stateSlice.actions;
export default stateSlice.reducer;
