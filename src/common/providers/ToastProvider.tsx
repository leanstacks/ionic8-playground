import { IonToast } from '@ionic/react';
import React, {
  ComponentPropsWithoutRef,
  Dispatch,
  PropsWithChildren,
  useMemo,
  useReducer,
} from 'react';
import { v4 as uuid } from 'uuid';

/**
 * Describes the attributes of a single `Toast`.
 * @see {@link IonToast}
 */
export interface ToastData
  extends Pick<
    ComponentPropsWithoutRef<typeof IonToast>,
    'buttons' | 'color' | 'duration' | 'layout' | 'position' | 'positionAnchor'
  > {
  id: string;
  message: string;
}

/**
 * A DTO type which describes the attributes to create a new `Toast`.
 */
export type CreateToastDTO = Omit<ToastData, 'id'>;

/**
 * The `value` provided by the `ToastContext`.
 */
export interface ToastContextValue {
  toasts: ToastData[];
  createToast: (toast: CreateToastDTO) => void;
  removeToast: (id: string) => void;
}

/**
 * The `ToastContext` reducer state.
 */
type ToastContextState = {
  toasts: ToastData[];
};

/**
 * The `ToastContext` reducer action `type` values.
 */
enum ToastAction {
  Create = 'Create',
  Remove = 'Remove',
}

/**
 * The `ToastContext` reducer action type definitions. Each action consists
 * of a `type` and `payload`.
 *
 * The `type` indicates the specific action to be performed on the reducer
 * state.
 *
 * The `payload` contains information specific to the requested action.
 */
type ToastContextAction =
  | { type: ToastAction.Create; payload: ToastData }
  | { type: ToastAction.Remove; payload: string };

/**
 * The default state of the reducer.
 */
const DEFAULT_STATE: ToastContextState = { toasts: [] };

/**
 * The reducer function mutates the state as actions are dispatched.
 * @param {ToastContextState} state - The current reducer state.
 * @param {ToastContextAction} action - The action to be applied to the state.
 * @returns {ToastContextState} Returns the mutated state after the action is
 * performed.
 */
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

/**
 * Creates the action functions which may be used to dispatch mutations to the
 * reducer.
 * @param dispatch - The reducer dispatch function.
 * @returns An object whose properties are the action functions instrumented with
 * `dispatch`.
 */
const actions = (dispatch: Dispatch<ToastContextAction>) => {
  const createToast = (toast: CreateToastDTO): void => {
    dispatch({
      type: ToastAction.Create,
      payload: {
        id: uuid(),
        ...toast,
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

/**
 * The `ToastContext` instance.
 */
export const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

/**
 * The `ToastProvider` component creates, maintains, and provides access to the
 * `ToastContext` value.
 * @param {PropsWithChildren} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const ToastProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [{ toasts }, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const value = useMemo<ToastContextValue>(() => {
    const { createToast, removeToast } = actions(dispatch);
    return { toasts, createToast, removeToast };
  }, [toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export default ToastProvider;
