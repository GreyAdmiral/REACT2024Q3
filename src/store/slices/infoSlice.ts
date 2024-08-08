import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfoState, MovieDetails } from '@typesfolder/types';

export const initialState: InfoState = {
   isVisible: false,
   isLoading: false,
   details: {
      nameRu: '',
      nameEn: '',
      nameOriginal: '',
      posterUrl: '',
      description: '',
      shortDescription: '',
      webUrl: '',
   },
};

const infoSlice = createSlice({
   name: 'info',
   initialState: initialState,
   reducers: {
      setIsVisible(state, action: PayloadAction<boolean>) {
         state.isVisible = action.payload;
      },

      setIsLoading(state, action: PayloadAction<boolean>) {
         state.isLoading = action.payload;
      },

      setDetails(state, action: PayloadAction<MovieDetails>) {
         state.details = action.payload;
      },
   },
});

export const { setIsVisible, setIsLoading, setDetails } = infoSlice.actions;
export default infoSlice.reducer;
