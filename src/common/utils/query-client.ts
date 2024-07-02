import { QueryClient } from '@tanstack/react-query';

/**
 * React Query `QueryClient` and configuration.
 * @see {@link https://tanstack.com/query/latest/docs/react/guides/important-defaults | Important Defaults}
 * @see {@link https://tanstack.com/query/latest/docs/react/reference/QueryClient | QueryClient}
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
