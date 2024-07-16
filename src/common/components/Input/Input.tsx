import { InputInputEventDetail, IonInput } from '@ionic/react';
import classNames from 'classnames';

import { BaseComponentProps } from '../types';
import { useField } from 'formik';

interface InputProps
  extends BaseComponentProps,
    Pick<HTMLIonInputElement, 'disabled' | 'label' | 'name' | 'type'> {}

const Input = ({ className, testid = 'input', ...props }: InputProps): JSX.Element => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <IonInput
      className={classNames(
        className,
        { 'ion-touched': meta.touched },
        { 'ion-invalid': meta.error },
        { 'ion-valid': !meta.error },
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
