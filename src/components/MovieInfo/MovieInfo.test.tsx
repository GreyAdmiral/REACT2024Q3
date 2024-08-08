import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MovieInfo } from './MovieInfo';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';

describe('Тесты компонента с подробной информацией', () => {
   test('Рендер', () => {
      render(
         <Provider store={store}>
            <Router>
               <MovieInfo />
            </Router>
         </Provider>
      );

      const header = screen.getByRole('banner');
      const button = screen.getByRole('button');

      expect(header).toBeInTheDocument();
      expect(header).toHaveClass(/movieInfo/);
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(/movieInfo/);
   });
});
