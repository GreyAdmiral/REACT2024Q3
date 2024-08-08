import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UndefinedPage } from './UndefinedPage';

describe('Тесты страницы 404', () => {
   test('Рендер', () => {
      render(<UndefinedPage />);
      const page = screen.getByText(/404/i);

      expect(page).toBeInTheDocument();
      expect(page).toContainHTML('<span>Ошибка 404</span>');
   });
});
