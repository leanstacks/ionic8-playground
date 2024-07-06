import { setupServer } from 'msw/node';

import { handlers } from './handlers';

/**
 * Mock Service Worker (MSW) server configuration.
 */
export const server = setupServer(...handlers);
