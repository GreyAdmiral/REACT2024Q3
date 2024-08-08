import { configureStore } from '@reduxjs/toolkit';
import { filmsApi } from '@services/filmsApi';
import { filmApi } from '@services/filmApi';
import stateReducer from './slices/stateSlice';
import infoReducer from './slices/infoSlice';
import schemeReducer from './slices/colorSchemeSlice';
import selectedReducer from './slices/selectedSlice';
import filmsApireducer from '@services/filmsApi';
import filmApireducer from '@services/filmApi';

export default configureStore({
   reducer: {
      [filmsApi.reducerPath]: filmsApireducer,
      [filmApi.reducerPath]: filmApireducer,
      state: stateReducer,
      info: infoReducer,
      scheme: schemeReducer,
      selected: selectedReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filmsApi.middleware, filmApi.middleware),
});
