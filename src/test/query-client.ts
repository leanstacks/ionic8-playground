import { QueryClient } from '@tanstack/react-query';

/**
 * React Query `QueryClient` with configuration optimized for test suite
 * execution.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
