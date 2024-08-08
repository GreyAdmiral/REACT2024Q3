import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import StoreProvider from '../../store/StoreProvider';
import { HeaderLink } from './HeaderLink';
import { AppRoutes } from '@/router/routes';

describe('Тесты ссылки в шапке', () => {
   test('Рендер', () => {
      render(
         <StoreProvider>
            <HeaderLink />
         </StoreProvider>
      );
      const headerLink = screen.getByText(/Неофициальный кинопоиск/i);

      expect(headerLink).toBeInTheDocument();
      expect(headerLink).toHaveAttribute('href', AppRoutes.HOME_ROUTE);
      expect(headerLink).toHaveAttribute('title', 'Перейти на главную страницу');
   });
});
