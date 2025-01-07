import { PropsWithChildren, useEffect, useState } from 'react';

import { AxiosContext, customAxios } from './AxiosContext';

/**
 * The `AxiosProvider` React component creates, maintains, and provides
 * access to the `AxiosContext` value.
 * @param {PropsWithChildren} props - Component properties, `PropsWithChildren`.
 * @returns {JSX.Element} JSX
 */
const AxiosProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // use axios interceptors

    setIsReady(true);

    return () => {
      // eject axios interceptors
    };
  }, []);

  return (
    <AxiosContext.Provider value={customAxios}>{isReady && <>{children}</>}</AxiosContext.Provider>
  );
};

export default AxiosProvider;
