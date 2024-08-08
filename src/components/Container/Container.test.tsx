import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Тесты ограничивающего контейнера', () => {
   test('Рендер', () => {
      render(<Container>Lorem ipsum</Container>);
      const container = screen.getByText(/Lorem ipsum/i);

      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
   });
});
