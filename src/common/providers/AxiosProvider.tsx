import React, { PropsWithChildren, useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';

/**
 * Custom `Axios` instance.
 */
const customAxios = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * The `AxiosContext` instance.
 */
export const AxiosContext = React.createContext<AxiosInstance>(customAxios);

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
