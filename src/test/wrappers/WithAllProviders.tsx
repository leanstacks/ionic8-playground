import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from 'test/query-client';
import ConfigContextProvider from 'common/providers/ConfigProvider';
import ToastProvider from 'common/providers/ToastProvider';
import Toasts from 'common/components/Toast/Toasts';

const WithAllProviders = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ConfigContextProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <MemoryRouter>{children}</MemoryRouter>
          <Toasts />
        </ToastProvider>
      </QueryClientProvider>
    </ConfigContextProvider>
  );
};

export default WithAllProviders;
