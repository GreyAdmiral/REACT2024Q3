import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormType } from '@typefiles/types';

export const initialState: FormType = {
   name: '',
   email: '',
   password: '',
   repassword: '',
   age: 0,
   sogletting: false,
};

const formSlice = createSlice({
   name: 'form',
   initialState: initialState,
   reducers: {
      saveFormInfo(state, action: PayloadAction<FormType>) {
         Object.assign(state, action.payload);
      },
   },
});

export const { saveFormInfo } = formSlice.actions;
export default formSlice.reducer;
