import { describe, expect, test } from 'vitest';
import colorSchemeReducer, { setColorScheme, schemeState } from '../slices/colorSchemeSlice';

describe('Тест среза colorSchemeSlice', () => {
   test('Инициализация состояния', () => {
      const state = colorSchemeReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(schemeState);
   });

   test('Смена темы', () => {
      const state = colorSchemeReducer(schemeState, setColorScheme('dark'));

      expect(schemeState.colorScheme).toEqual('');
      expect(state.colorScheme).toEqual('dark');
   });
});
