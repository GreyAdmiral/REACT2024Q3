import { describe, expect, test } from 'vitest';
import stateSliceReducer, {
   initialState,
   setActivePage,
   setIsError,
   setKeywords,
   setMovies,
   setTotalPages,
} from '../slices/stateSlice';

describe('Тест среза stateSlice', () => {
   test('Инициализация состояния', () => {
      const state = stateSliceReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(initialState);
   });

   test('Изменение активной страницы', () => {
      const state = stateSliceReducer(initialState, setActivePage(2));

      expect(initialState.activePage).toEqual(1);
      expect(state.activePage).toEqual(2);
   });

   test('Изменение количества страниц', () => {
      const state = stateSliceReducer(initialState, setTotalPages(5));

      expect(initialState.totalPages).toBeNull();
      expect(state.totalPages).toEqual(5);
   });

   test('Изменение поискового запроса', () => {
      const state = stateSliceReducer(initialState, setKeywords('Lorem ipsum'));

      expect(initialState.keywords).toEqual('');
      expect(state.keywords).toEqual('Lorem ipsum');
   });

   test('Изменение состояния ошибки', () => {
      const state = stateSliceReducer(initialState, setIsError(true));

      expect(initialState.isError).toEqual(false);
      expect(state.isError).toEqual(true);
   });

   test('Изменение списка фильмов', () => {
      const state = stateSliceReducer(
         initialState,
         setMovies([
            {
               kinopoiskId: '5260016',
               imdbId: null,
               nameRu: 'Lorem ipsum',
               nameEn: '',
               nameOriginal: '',
               countries: [
                  {
                     country: 'Россия',
                  },
               ],
               genres: [
                  {
                     genre: 'документальный',
                  },
               ],
               ratingKinopoisk: 9.4,
               ratingImdb: null,
               year: 2022,
               type: 'TV_SERIES',
               posterUrl: '',
               posterUrlPreview: '',
            },
         ])
      );

      expect(initialState.movies.length).toBe(0);
      expect(state.movies.length).toBe(1);
      expect(state.movies[0].nameRu).toEqual('Lorem ipsum');
   });
});
