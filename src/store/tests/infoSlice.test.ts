import { describe, expect, test } from 'vitest';
import infoSliceReducer, { setIsVisible, setIsLoading, setDetails, initialState } from '../slices/infoSlice';

describe('Тест среза infoSlice', () => {
   test('Инициализация состояния', () => {
      const state = infoSliceReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(initialState);
   });

   test('Спинер', () => {
      const state = infoSliceReducer(initialState, setIsLoading(true));

      expect(initialState.isLoading).toEqual(false);
      expect(state.isLoading).toEqual(true);
   });

   test('Показ информации о фильме', () => {
      const state = infoSliceReducer(initialState, setIsVisible(true));

      expect(initialState.isVisible).toEqual(false);
      expect(state.isVisible).toEqual(true);
   });

   test('Информация о фильме', () => {
      const state = infoSliceReducer(initialState, setDetails({ ...initialState.details, Title: 'Lorem ipsum' }));

      expect(initialState.details.Title).toEqual('');
      expect(state.details.Title).toEqual('Lorem ipsum');
   });
});
