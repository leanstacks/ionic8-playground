import { useContext } from 'react';

import { ScrollContext, ScrollContextValue } from 'common/providers/ScrollContext';

/**
 * The `useScrollContext` hook returns the current `ScrollContext` value.
 * @returns {ScrollContextValue} The current `ScrollContext` value, a
 * `ScrollContextValue` object.
 * @see {@link ScrollContextValue}
 */
export const useScrollContext = (): ScrollContextValue => {
  const context = useContext(ScrollContext);

  return context;
};
