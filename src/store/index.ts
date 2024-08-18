import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';

export default configureStore({
   reducer: {
      form: formReducer,
   },
});
