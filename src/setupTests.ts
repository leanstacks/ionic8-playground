// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from 'test/mocks/server';
import { queryClient } from 'test/query-client';

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

// Run before all test suites
beforeAll(() => {
  // mock service worker start up
  server.listen();
});

// Run after every test
afterEach(() => {
  // mock service worker reset handlers
  server.resetHandlers();
  // react query clear cache
  queryClient.clear();
});

// Run after all test suites
afterAll(() => {
  // mock service worker shut down
  server.close();
});
