import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import RootLayout from './layout';

describe('Тесты главного шаблона', () => {
   test('Рендер', () => {
      const { container } = render(<RootLayout />);
      const document = container.querySelector('html');
      const wrapper = container.querySelector(':scope .wrapper');

      expect(wrapper).toBeInTheDocument();
      expect(document).toHaveRole('document');
   });
});
