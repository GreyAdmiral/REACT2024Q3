import { describe, expect, test, vi } from 'vitest';
import { fireEvent, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useQueryParams } from './useQueryParams';
import { useMediaQuery } from './useMediaQuery';
import { useLocalStorage } from './useLocalStorage';
import { useFastLocalStorage } from './useFastLocalStorage';
import { useClickOutside } from './useClickOutside';
import { useReactPlaceholder } from './useReactPlaceholder';

vi.mock('next/navigation', () => ({
   useQueryParams() {
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

describe('Тесты кастомных хуков', () => {
   test('Тест хука useQueryParams', () => {
      const query = renderHook(() => useQueryParams('keyword', 'lorem ipsum'));

      expect(window.location.search.match(/keyword/i)).toBeTruthy();
      expect(window.location.search.match(/lorem/i)).toBeTruthy();
      expect(window.location.search.match(/ipsum/i)).toBeTruthy();

      query.unmount();
   });

   test('Тест хука useMediaQuery', () => {
      const query = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'));

      expect(query).toBeTruthy();

      query.unmount();
   });

   test('Тест хука useLocalStorage', () => {
      const testText = 'lorem ipsum';
      const localStorage = renderHook(() => useLocalStorage('keywords', testText));
      const {
         result: { current },
      } = localStorage;

      expect(current[0]).toBe(testText);

      localStorage.unmount();
   });

   test('Тест хука useFastLocalStorage', () => {
      const testText = 'dark';
      const localStorage = renderHook(() => useFastLocalStorage('userScheme', testText));
      const {
         result: { current },
      } = localStorage;

      expect(current[0]).toBe(testText);

      localStorage.unmount();
   });

   test('Тест хука useClickOutside', async () => {
      const target = document.createElement('aside') as HTMLTemplateElement;
      const outside = document.createElement('div');
      const ref = {
         current: target,
      };
      const callback = vi.fn();
      const hook = renderHook(() => useClickOutside(ref, callback));

      document.body.appendChild(target);
      document.body.appendChild(outside);

      expect(callback).toHaveBeenCalledTimes(0);

      await userEvent.click(outside);
      expect(callback).toHaveBeenCalledTimes(1);

      vi.spyOn(document, 'removeEventListener');
      hook.unmount();
      expect(document.removeEventListener).toHaveBeenCalledTimes(1);

      await userEvent.click(outside);
      expect(callback).toHaveBeenCalledTimes(1);
   });

   test('Тест хука useReactPlaceholder', async () => {
      const placeholder = 'lorem ipsum';
      const setPlaceholder = vi.fn();
      const input = document.createElement('input');
      const output = document.createElement('div');
      const ref = {
         current: input,
      };
      const hook = renderHook(() => useReactPlaceholder({ ref, placeholder, setPlaceholder }));

      input.placeholder = placeholder;
      document.body.appendChild(input);
      document.body.appendChild(output);

      expect(setPlaceholder).toHaveBeenCalledTimes(0);

      fireEvent.focus(input);
      expect(setPlaceholder).toHaveBeenCalledTimes(1);

      fireEvent.blur(output);
      expect(setPlaceholder).toHaveBeenCalledTimes(1);

      vi.spyOn(input, 'removeEventListener');
      hook.unmount();
      expect(document.removeEventListener).toHaveBeenCalledTimes(1);
   });
});
