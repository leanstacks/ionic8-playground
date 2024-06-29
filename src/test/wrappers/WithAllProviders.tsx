import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';

import ConfigContextProvider from 'providers/ConfigProvider';

const WithAllProviders = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ConfigContextProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </ConfigContextProvider>
  );
};

export default WithAllProviders;
