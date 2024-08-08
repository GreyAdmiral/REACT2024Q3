import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import StoreProvider from '../../store/StoreProvider';
import { Searsh } from './Searsh';

const localStorageValue = '';
const testUserValue = 'Lorem ipsum';
const setLocalStorageValue = vi.fn();

describe('Тесты поиска', () => {
   beforeEach(() => {
      render(
         <StoreProvider>
            <Searsh localStorageValue={localStorageValue} setLocalStorageValue={setLocalStorageValue} />
         </StoreProvider>
      );
   });

   test('Рендер', () => {
      expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveValue(localStorageValue);
      expect(screen.getByText('Найти')).toBeInTheDocument();
      expect(screen.getByText('Ошибка')).toBeInTheDocument();
   });

   test('Ввод текста', async () => {
      const input = screen.getByRole('textbox');

      await userEvent.type(input, testUserValue);
      expect(input).toHaveValue(testUserValue);
   });
});
