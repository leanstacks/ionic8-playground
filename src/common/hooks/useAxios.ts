import { useContext } from 'react';
import { AxiosInstance } from 'axios';

import { AxiosContext } from 'common/providers/AxiosProvider';

/**
 * The `useAxios` hook returns the current `AxiosContext` value.
 * @returns {AxiosInstance} The current `AxiosContext` value, an `AxiosInstance`.
 */
export const useAxios = (): AxiosInstance => {
  return useContext(AxiosContext);
};
