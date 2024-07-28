import React, { Dispatch, PropsWithChildren, useMemo, useReducer } from 'react';
import { v4 as uuid } from 'uuid';

export interface ToastData {
  id: string;
  message: string;
  duration: number;
}

export type CreateToastDTO = Pick<ToastData, 'message' | 'duration'>;

export interface ToastContextValue {
  toasts: ToastData[];
  createToast: (toast: CreateToastDTO) => void;
  removeToast: (id: string) => void;
}

type ToastContextState = {
  toasts: ToastData[];
};

enum ToastAction {
  Create = 'Create',
  Remove = 'Remove',
}

type ToastContextAction =
  | { type: ToastAction.Create; payload: ToastData }
  | { type: ToastAction.Remove; payload: string };

const DEFAULT_STATE: ToastContextState = { toasts: [] };

const reducer = (state: ToastContextState, action: ToastContextAction): ToastContextState => {
  const { payload, type } = action;

  switch (type) {
    case ToastAction.Create:
      return {
        ...state,
        toasts: [...state.toasts, payload],
      };
    case ToastAction.Remove:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== payload),
      };
    default:
      return state;
  }
};

const actions = (dispatch: Dispatch<ToastContextAction>) => {
  const createToast = ({ duration, message }: CreateToastDTO): void => {
    dispatch({
      type: ToastAction.Create,
      payload: {
        id: uuid(),
        duration,
        message,
      },
    });
  };

  const removeToast = (id: string): void => {
    dispatch({
      type: ToastAction.Remove,
      payload: id,
    });
  };

  return {
    createToast,
    removeToast,
  };
};

export const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

const ToastProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [{ toasts }, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const value = useMemo<ToastContextValue>(() => {
    const { createToast, removeToast } = actions(dispatch);
    return { toasts, createToast, removeToast };
  }, [toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export default ToastProvider;
