import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import StoreProvider from '../../../store/StoreProvider';
import LoadingMovies from './loading';

describe('Тесты контейнера главного спинера', () => {
   test('Рендер', () => {
      const { container } = render(
         <StoreProvider>
            <LoadingMovies />
         </StoreProvider>
      );
      const loadingElement = container.querySelector('div');

      expect(loadingElement).toHaveClass(/loader_container/i);
   });
});
