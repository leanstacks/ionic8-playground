import { IonApp, setupIonicReact } from '@ionic/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ConfigContextProvider from './common/providers/ConfigProvider';
import { queryClient } from 'common/utils/query-client';
import AuthProvider from 'common/providers/AuthProvider';
import AxiosProvider from 'common/providers/AxiosProvider';
import ToastProvider from 'common/providers/ToastProvider';
import Toasts from 'common/components/Toast/Toasts';
import AppRouter from 'common/components/Router/AppRouter';

import './theme/main.scss';

setupIonicReact();

/**
 * The application root module. The outermost component of the Ionic React
 * application hierarchy. Declares application-wide providers.
 * @returns JSX
 */
const App = (): JSX.Element => (
  <IonApp data-testid="app">
    <ConfigContextProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AxiosProvider>
            <ToastProvider>
              <AppRouter />
              <Toasts />
              <ReactQueryDevtools initialIsOpen={false} />
            </ToastProvider>
          </AxiosProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ConfigContextProvider>
  </IonApp>
);

export default App;
