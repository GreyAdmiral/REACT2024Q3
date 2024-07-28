import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layot } from './Layot';
import { Provider } from 'react-redux';
import store from '../../store';

describe('Тесты общего шаблона с компонентом Main', () => {
   test('Рендер', () => {
      const { container } = render(
         <Provider store={store}>
            <Router>
               <Layot />
            </Router>
         </Provider>
      );
      const main = container.querySelector('header+div');

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(window.location.pathname).toBe('/');
   });
});
