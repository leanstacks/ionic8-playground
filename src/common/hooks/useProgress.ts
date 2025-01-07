import { useContext } from 'react';

import { ProgressContext, ProgressContextValue } from 'common/providers/ProgressContext';

/**
 * The `useProgress` hook returns the current `ProgressContext` value.
 * @returns {ProgressContextValue} The current `ProgressContext` value, a
 * `ProgressContextValue` object.
 */
export const useProgress = (): ProgressContextValue => {
  const context = useContext(ProgressContext);

  return context;
};
