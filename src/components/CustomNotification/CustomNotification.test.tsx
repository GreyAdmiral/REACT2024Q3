import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomNotification } from './CustomNotification';

describe('Тесты уведомления', () => {
   test('Рендер показа уведомления', () => {
      render(<CustomNotification isOpenNotification={true}>Lorem ipsum</CustomNotification>);
      const notification = screen.getByText(/Lorem ipsum/i);

      expect(notification).toBeInTheDocument();
      expect(notification).toHaveClass(/notification/);
   });

   test('Отсутствие уведомления', () => {
      render(<CustomNotification isOpenNotification={false}>Lorem ipsum</CustomNotification>);
      const notification = screen.queryByText(/Lorem ipsum/i);

      expect(notification).toBeNull();
   });
});
