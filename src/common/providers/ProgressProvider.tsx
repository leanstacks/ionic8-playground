import { IonProgressBar } from '@ionic/react';
import { ComponentPropsWithoutRef, createContext, ReactNode, useState } from 'react';

interface ProgressBarProps
  extends Pick<
    ComponentPropsWithoutRef<typeof IonProgressBar>,
    'buffer' | 'color' | 'reversed' | 'type' | 'value'
  > {}

type ProgressRenderFn = (progress: ProgressContextValue) => JSX.Element;

interface ProgressProviderProps extends ProgressBarProps {
  children: ProgressRenderFn | ReactNode;
}

export interface ProgressContextValue {
  isActive: boolean;
  progressBarProps: ProgressBarProps;
  setIsActive: (isActive: boolean) => void;
  setBuffer: (buffer: number) => void;
  setValue: (value: number) => void;
}

const DEFAULT_PROGRESS: ProgressContextValue = {
  isActive: false,
  progressBarProps: {
    type: 'indeterminate',
  },
  setIsActive: () => {},
  setBuffer: () => {},
  setValue: () => {},
};

export const ProgressContext = createContext<ProgressContextValue | null>(DEFAULT_PROGRESS);

const ProgressProvider = ({
  children,
  ...progressBarProps
}: ProgressProviderProps): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [buffer, setBuffer] = useState<number>(progressBarProps.buffer ?? 1);
  const [value, setValue] = useState<number>(progressBarProps.value ?? 0);
  console.log(`ProgressProvider::isActive::${isActive}`);

  const contextValue: ProgressContextValue = {
    isActive,
    progressBarProps: {
      ...progressBarProps,
      buffer,
      value,
    },
    setIsActive,
    setBuffer,
    setValue,
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
