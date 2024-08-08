import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';

describe('Тесты ErrorBoundary', () => {
   test('Рендер', () => {
      render(
         <Provider store={store}>
            <Router>
               <ErrorBoundary>
                  <div>Child Component</div>
               </ErrorBoundary>
            </Router>
         </Provider>
      );

      expect(screen.getByText('Child Component')).toBeInTheDocument();
   });

   test('Генерация ошибки', () => {
      const ErrorGenerator = () => {
         throw new Error('Lorem ipsum');
      };

      render(
         <Provider store={store}>
            <Router>
               <ErrorBoundary>
                  <ErrorGenerator />
               </ErrorBoundary>
            </Router>
         </Provider>
      );

      expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
   });
});
