import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ColorSchemeButton } from './ColorSchemeButton';
import { Provider } from 'react-redux';
import store from '../../store';

describe('Тесты кнопки выбора темы', () => {
   beforeEach(() => {
      render(
         <Provider store={store}>
            <ColorSchemeButton />
         </Provider>
      );
   });

   test('Рендер', () => {
      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(/schemeButton/);
   });

   test('Тест нажатия', async () => {
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(button).not.toHaveFocus();
   });
});
