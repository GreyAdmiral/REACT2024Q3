import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Details, InfoState } from '@typefiles/types';

const initialState: InfoState = {
   isVisible: false,
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

      setDetails(state, action: PayloadAction<Details>) {
         state.details = action.payload;
      },
   },
});

export const { setIsVisible, setDetails } = infoSlice.actions;
export default infoSlice.reducer;
