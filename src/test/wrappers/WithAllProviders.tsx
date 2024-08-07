import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from 'test/query-client';
import ConfigContextProvider from 'common/providers/ConfigProvider';
import ToastProvider from 'common/providers/ToastProvider';
import AxiosProvider from 'common/providers/AxiosProvider';

const WithAllProviders = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ConfigContextProvider>
      <QueryClientProvider client={queryClient}>
        <AxiosProvider>
          <ToastProvider>
            <MemoryRouter>{children}</MemoryRouter>
          </ToastProvider>
        </AxiosProvider>
      </QueryClientProvider>
    </ConfigContextProvider>
  );
};

export default WithAllProviders;
