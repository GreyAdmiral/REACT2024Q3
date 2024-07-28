import { describe, expect, test } from 'vitest';
import stateSliceReducer, { initialState } from '../slices/stateSlice';

describe('Тест среза stateSlice', () => {
   test('Инициализация состояния', () => {
      const state = stateSliceReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(initialState);
   });
});
