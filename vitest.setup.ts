import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

global.matchMedia =
   global.matchMedia ||
   function () {
      return {
         onchange: vi.fn(),
         addListener: vi.fn(),
         removeListener: vi.fn(),
         addEventListener: vi.fn(),
         removeEventListener: vi.fn(),
      };
   };

afterEach(() => {
   cleanup();
});
