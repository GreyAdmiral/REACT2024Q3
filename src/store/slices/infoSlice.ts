import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Details, InfoState } from '@typefiles/types';

export const initialState: InfoState = {
   isVisible: false,
   isLoading: false,
   details: {
      Title: '',
      Runtime: '',
      Plot: '',
      Awards: '',
      Poster: '',
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

      setDetails(state, action: PayloadAction<Details>) {
         state.details = action.payload;
      },
   },
});

export const { setIsVisible, setIsLoading, setDetails } = infoSlice.actions;
export default infoSlice.reducer;
