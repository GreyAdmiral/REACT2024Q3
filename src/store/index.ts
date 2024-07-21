import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './slices/stateSlice';
import infoReducer from './slices/infoSlice';
import schemeReducer from './slices/colorSchemeSlice';

export default configureStore({
   reducer: {
      state: stateReducer,
      info: infoReducer,
      scheme: schemeReducer,
   },
});
