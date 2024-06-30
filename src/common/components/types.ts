export interface PropsWithClassName {
  className?: string;
}

export interface PropsWithTestId {
  testid?: string;
}

export interface BaseComponentProps extends PropsWithClassName, PropsWithTestId {}
