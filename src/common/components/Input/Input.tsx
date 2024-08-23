import { InputInputEventDetail, IonInput } from '@ionic/react';
import classNames from 'classnames';

import { BaseComponentProps } from '../types';
import { useField } from 'formik';
import { forwardRef } from 'react';

/**
 * Properties for the `Input` component.
 * @see {@link BaseComponentProps}
 * @see {@link IonInput}
 */
interface InputProps
  extends BaseComponentProps,
    Omit<React.ComponentPropsWithoutRef<typeof IonInput>, 'name'>,
    Required<Pick<React.ComponentPropsWithoutRef<typeof IonInput>, 'name'>> {}

/**
 * The `Input` component renders a standardized `IonInput` which is integrated
 * with Formik.
 *
 * Optionally accepts a forwarded `ref` which allows the parent to manipulate
 * the input, performing actions programmatically such as giving focus.
 *
 * @param {InputProps} props - Component properties.
 * @param {ForwardedRef<HTMLIonInputElement>} [ref] - Optional. A forwarded `ref`.
 * @returns {JSX.Element} JSX
 */
const Input = forwardRef<HTMLIonInputElement, InputProps>(
  ({ className, testid = 'input', ...props }: InputProps, ref): JSX.Element => {
    const [field, meta, helpers] = useField(props.name);

    return (
      <IonInput
        className={classNames(
          className,
          { 'ion-touched': meta.touched },
          { 'ion-invalid': meta.error },
          { 'ion-valid': meta.touched && !meta.error },
        )}
        onIonInput={async (e: CustomEvent<InputInputEventDetail>) =>
          await helpers.setValue(e.detail.value)
        }
        data-testid={testid}
        {...field}
        {...props}
        errorText={meta.error}
        ref={ref}
      ></IonInput>
    );
  },
);
Input.displayName = 'Input';

export default Input;
