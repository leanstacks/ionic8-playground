import { createContext } from 'react';

import axios, { AxiosInstance } from 'axios';

/**
 * Custom `Axios` instance.
 */
export const customAxios = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * The `AxiosContext` instance.
 */
export const AxiosContext = createContext<AxiosInstance>(customAxios);
