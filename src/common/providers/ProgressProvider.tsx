import { IonProgressBar } from '@ionic/react';
import { ComponentPropsWithoutRef, createContext, ReactNode, useState } from 'react';

/**
 * Select properties from `IonProgressBar` which control how the progress bar
 * is rendered.
 */
interface ProgressBarProps
  extends Pick<
    ComponentPropsWithoutRef<typeof IonProgressBar>,
    'buffer' | 'color' | 'reversed' | 'type' | 'value'
  > {}

/**
 * The `ProgressProvider` render props function type.
 */
type ProgressRenderFn = (progress: ProgressContextValue) => JSX.Element;

/**
 * Properties for the `ProgressProvider` component.
 * @param {ProgressRenderFn | ReactNode} children - A render props function
 * or `ReactNode`.
 * @see {@link ProgressRenderFn}
 * @see {@link ReactNode}
 */
interface ProgressProviderProps {
  children: ProgressRenderFn | ReactNode;
}

/**
 * The `value` provided  by the `ProgressContext`.
 */
export interface ProgressContextValue {
  isActive: boolean;
  progressBar: ProgressBarProps;
  setIsActive: (isActive: boolean) => void;
  setProgressBar: (props: ProgressBarProps) => void;
  setProgress: (isActive: boolean, options?: ProgressBarProps) => void;
}

/**
 * Default `ProgressBarProps` value for the `ProgressContext`.
 */
const DEFAULT_PROGRESS_BAR: ProgressBarProps = {
  type: 'indeterminate',
};

/**
 * Default value for the `ProgressContext`.
 */
const DEFAULT_PROGRESS: ProgressContextValue = {
  isActive: false,
  progressBar: DEFAULT_PROGRESS_BAR,
  setIsActive: () => {},
  setProgressBar: () => {},
  setProgress: () => {},
};

/**
 * The `ProgressContext` instance.
 */
export const ProgressContext = createContext<ProgressContextValue | null>(DEFAULT_PROGRESS);

/**
 * The `ProgessProvider` component creates and provides access to the
 * `ProgressContext` value.
 * @param {ProgressProviderProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const ProgressProvider = ({ children }: ProgressProviderProps): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<ProgressBarProps>(DEFAULT_PROGRESS_BAR);

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

  const isRenderFunction = typeof children === 'function';
  return (
    <ProgressContext.Provider value={contextValue}>
      {isRenderFunction ? children(contextValue) : children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;
