import { configureStore } from '@reduxjs/toolkit';
import { filmsApi } from '@api/filmsApi';
import stateReducer from './slices/stateSlice';
import infoReducer from './slices/infoSlice';
import schemeReducer from './slices/colorSchemeSlice';
import selectedReducer from './slices/selectedSlice';
import filmsApireducer from '@api/filmsApi';

export default configureStore({
   reducer: {
      [filmsApi.reducerPath]: filmsApireducer,
      state: stateReducer,
      info: infoReducer,
      scheme: schemeReducer,
      selected: selectedReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filmsApi.middleware),
});
