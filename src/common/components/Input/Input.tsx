import { InputInputEventDetail, IonInput } from '@ionic/react';
import classNames from 'classnames';

import { BaseComponentProps } from '../types';
import { useField } from 'formik';

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
 * @param {InputProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Input = ({ className, testid = 'input', ...props }: InputProps): JSX.Element => {
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
    ></IonInput>
  );
};

export default Input;
