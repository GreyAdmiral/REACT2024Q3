import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Searsh } from './Searsh';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';

const localStorageValue = '';
const testUserValue = 'Lorem ipsum';
const setLocalStorageValue = vi.fn();

describe('Тесты поиска', () => {
   beforeEach(() => {
      render(
         <Provider store={store}>
            <Router>
               <Searsh localStorageValue={localStorageValue} setLocalStorageValue={setLocalStorageValue} />
            </Router>
         </Provider>
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
