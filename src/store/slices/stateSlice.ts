import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieProps, MoviesState } from '@typefiles/types';

const initialState: MoviesState = {
   activePage: 1,
   movies: [],
   totalPages: null,
   keywords: '',
   isLoading: false,
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

      setIsLoading(state, action: PayloadAction<boolean>) {
         state.isLoading = action.payload;
      },

      setIsError(state, action: PayloadAction<boolean>) {
         state.isError = action.payload;
      },
   },
});

export const { setActivePage, setMovies, setTotalPages, setKeywords, setIsLoading, setIsError } = stateSlice.actions;
export default stateSlice.reducer;
