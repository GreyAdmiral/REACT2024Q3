import { describe, expect, test } from 'vitest';
import selectedSliceReducer, { setSelectedMoviesId, initialState } from '../slices/selectedSlice';

const movie = {
   id: '1234',
   name: 'Lorem ipsum',
   year: 1234,
   type: '',
   posterUrl: '',
   countries: '',
   genres: '',
};

const movie2 = {
   id: '5678',
   name: 'Dolor sit amet',
   year: 2345,
   type: '',
   posterUrl: '',
   countries: '',
   genres: '',
};

describe('Тест среза selectedSlice', () => {
   test('Инициализация состояния', () => {
      const state = selectedSliceReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(initialState);
   });

   test('Добавление выбранного фильма', () => {
      const state = selectedSliceReducer(initialState, setSelectedMoviesId({ isSelected: true, info: movie }));

      expect(initialState.selectedMoviesId.length).toBe(0);
      expect(state.selectedMoviesId.length).toBe(1);
      expect(state.selectedMoviesId[0].name).toEqual('Lorem ipsum');
   });

   test('Удаление выбранного фильма', () => {
      const state = selectedSliceReducer(
         { selectedMoviesId: [movie, movie2] },
         setSelectedMoviesId({ isSelected: false, info: movie })
      );

      expect(state.selectedMoviesId.length).toBe(1);
      expect(state.selectedMoviesId[0].name).toEqual('Dolor sit amet');
   });
});
