import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SchemeState } from '@typefiles/types';

export const schemeState: SchemeState = {
   colorScheme: '',
};

const colorSchemeState = createSlice({
   name: 'scheme',
   initialState: schemeState,
   reducers: {
      setColorScheme(state, action: PayloadAction<string>) {
         state.colorScheme = action.payload;
      },
   },
});

export const { setColorScheme } = colorSchemeState.actions;
export default colorSchemeState.reducer;
