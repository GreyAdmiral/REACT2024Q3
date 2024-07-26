import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './slices/stateSlice';
import infoReducer from './slices/infoSlice';
import schemeReducer from './slices/colorSchemeSlice';
import selectedReducer from './slices/selectedSlice';

export default configureStore({
   reducer: {
      state: stateReducer,
      info: infoReducer,
      scheme: schemeReducer,
      selected: selectedReducer,
   },
});
