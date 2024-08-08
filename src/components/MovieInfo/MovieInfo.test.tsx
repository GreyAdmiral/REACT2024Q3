import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StoreProvider from '../../store/StoreProvider';
import { MovieInfo } from './MovieInfo';

vi.mock('next/navigation', () => ({
   useRouter() {
      return {
         prefetch: () => null,
      };
   },
   useSearchParams() {
      return {
         prefetch: () => null,
      };
   },
}));

describe('Тесты компонента с подробной информацией', () => {
   test('Рендер', () => {
      render(
         <StoreProvider>
            <MovieInfo />
         </StoreProvider>
      );

      const header = screen.getByRole('banner');
      const button = screen.getByRole('button');

      expect(header).toBeInTheDocument();
      expect(header).toHaveClass(/movie_info/);
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(/movie_info/);
   });
});
