import { useContext } from 'react';

import { ToastContext, ToastContextValue } from 'common/providers/ToastProvider';

export const useToasts = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToasts hook must be used within a ToastProvider');
  }

  return context;
};
