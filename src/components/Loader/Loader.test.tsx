import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import StoreProvider from '../../store/StoreProvider';
import { Loader } from './Loader';

describe('Тесты спинера', () => {
   test('Рендер', () => {
      const { container } = render(
         <StoreProvider>
            <Loader />
         </StoreProvider>
      );
      const loaderElement = container.querySelector('span');

      expect(loaderElement).toBeInTheDocument();

      if (loaderElement) {
         const spinnerElement = loaderElement.querySelector('span');

         expect(spinnerElement).toBeInTheDocument();
      }
   });
});
