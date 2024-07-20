import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './slices/stateSlice';
import infoReducer from './slices/infoSlice';

export default configureStore({
   reducer: {
      state: stateReducer,
      info: infoReducer,
   },
});
