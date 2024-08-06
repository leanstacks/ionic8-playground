import { IonProgressBar } from '@ionic/react';
import { ComponentPropsWithoutRef, createContext, ReactNode, useState } from 'react';

interface ProgressBarProps
  extends Pick<
    ComponentPropsWithoutRef<typeof IonProgressBar>,
    'buffer' | 'color' | 'reversed' | 'type' | 'value'
  > {}

type ProgressRenderFn = (progress: ProgressContextValue) => JSX.Element;

interface ProgressProviderProps {
  children: ProgressRenderFn | ReactNode;
}

export interface ProgressContextValue {
  isActive: boolean;
  progressBar: ProgressBarProps;
  setIsActive: (isActive: boolean) => void;
  setProgressBar: (props: ProgressBarProps) => void;
  setProgress: (isActive: boolean, options?: ProgressBarProps) => void;
}

const DEFAULT_PROGRESS_BAR: ProgressBarProps = {
  type: 'indeterminate',
};

const DEFAULT_PROGRESS: ProgressContextValue = {
  isActive: false,
  progressBar: DEFAULT_PROGRESS_BAR,
  setIsActive: () => {},
  setProgressBar: () => {},
  setProgress: () => {},
};

export const ProgressContext = createContext<ProgressContextValue | null>(DEFAULT_PROGRESS);

const ProgressProvider = ({ children }: ProgressProviderProps): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<ProgressBarProps>(DEFAULT_PROGRESS_BAR);
  console.log(
    `ProgressProvider::isActive::${isActive}::progressBar::${JSON.stringify(progressBar)}`,
  );

  const setProgress = (isActive: boolean, options?: ProgressBarProps): void => {
    setIsActive(isActive);
    setProgressBar({ ...DEFAULT_PROGRESS_BAR, ...options });
  };

  const contextValue: ProgressContextValue = {
    isActive,
    progressBar: {
      ...progressBar,
    },
    setIsActive,
    setProgressBar,
    setProgress,
  };
  console.log(`ProgressProvider::context::${JSON.stringify(contextValue)}`);

  const isRenderFunction = typeof children === 'function';
  return (
    <ProgressContext.Provider value={contextValue}>
      {isRenderFunction ? children(contextValue) : children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;
