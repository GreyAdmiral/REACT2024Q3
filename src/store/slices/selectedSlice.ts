import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedMovie } from '@typefiles/types';

type InitialSelectedState = {
   selectedMoviesId: SelectedMovie[];
};

type PayloadOptions = {
   isSelected: boolean;
   info: SelectedMovie;
};

export const initialState: InitialSelectedState = {
   selectedMoviesId: [],
};

export const selectedSlice = createSlice({
   name: 'selected',
   initialState: initialState,
   reducers: {
      setSelectedMoviesId(state, action: PayloadAction<PayloadOptions>) {
         if (action.payload.isSelected) {
            state.selectedMoviesId.push(action.payload.info);
         } else {
            state.selectedMoviesId = state.selectedMoviesId.filter((item) => item.id !== action.payload.info.id);
         }
      },
      resetSelectedMoviesId(state) {
         state.selectedMoviesId = [];
      },
   },
});

export const { setSelectedMoviesId, resetSelectedMoviesId } = selectedSlice.actions;
export default selectedSlice.reducer;
