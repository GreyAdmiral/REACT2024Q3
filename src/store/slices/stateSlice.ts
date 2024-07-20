import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieProps, MoviesState } from '@typefiles/types';

const initialState: MoviesState = {
   activePage: 1,
   movies: [],
   totalPages: null,
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

      setIsError(state, action: PayloadAction<boolean>) {
         state.isError = action.payload;
      },
   },
});

export const { setActivePage, setMovies, setTotalPages, setIsError } = stateSlice.actions;
export default stateSlice.reducer;
