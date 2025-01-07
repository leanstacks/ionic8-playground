import { useContext } from 'react';

import { ToastContext, ToastContextValue } from 'common/providers/ToastContext';

/**
 * The `useToasts` hook returns the current `ToastContext` value.
 * @returns {ToastContextValue} The current `ToastContext` value.
 */
export const useToasts = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToasts hook must be used within a ToastProvider');
  }

  return context;
};
