import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Loader } from './Loader';
import { Provider } from 'react-redux';
import store from '../../store';

describe('Тесты спинера', () => {
   test('Рендер', () => {
      const { container } = render(
         <Provider store={store}>
            <Loader />
         </Provider>
      );
      const loaderElement = container.querySelector('span');

      expect(loaderElement).toBeInTheDocument();

      if (loaderElement) {
         const spinnerElement = loaderElement.querySelector('span');

         expect(spinnerElement).toBeInTheDocument();
      }
   });
});
