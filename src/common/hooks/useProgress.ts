import { ProgressContext, ProgressContextValue } from 'common/providers/ProgressProvider';
import { useContext } from 'react';

export const useProgress = (): ProgressContextValue => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress hook must be used within a ProgressProvider');
  }

  return context;
};
