import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';

import { queryClient } from 'test/query-client';
import ConfigContextProvider from 'common/providers/ConfigProvider';
import { QueryClientProvider } from '@tanstack/react-query';

const WithAllProviders = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ConfigContextProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    </ConfigContextProvider>
  );
};

export default WithAllProviders;
