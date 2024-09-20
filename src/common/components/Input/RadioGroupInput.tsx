import { ComponentPropsWithoutRef } from 'react';
import { IonRadioGroup, IonText, RadioGroupCustomEvent } from '@ionic/react';
import { useField } from 'formik';
import classNames from 'classnames';

import './RadioGroupInput.scss';
import { PropsWithTestId } from '../types';

interface RadioGroupInputProps
  extends PropsWithTestId,
    Omit<ComponentPropsWithoutRef<typeof IonRadioGroup>, 'name'>,
    Required<Pick<ComponentPropsWithoutRef<typeof IonRadioGroup>, 'name'>> {}

const RadioGroupInput = ({
  className,
  name,
  onIonChange,
  testid = 'input-radiogroup',
  ...radioGroupProps
}: RadioGroupInputProps): JSX.Element => {
  const [field, meta, helpers] = useField({ name });

  const onChange = async (e: RadioGroupCustomEvent) => {
    await helpers.setValue(e.detail.value);
    await helpers.setTouched(true);
    onIonChange?.(e);
  };

  return (
    <div className="ls-radiogroup-wrapper" data-testid={`${testid}-wrapper`}>
      <IonRadioGroup
        className={classNames('ls-radiogroup-input', className)}
        data-testid={testid}
        onIonChange={onChange}
        {...field}
        {...radioGroupProps}
      />
      {!!meta.error && (
        <IonText className="ls-radiogroup-error" color="danger" data-testid={`${testid}-error`}>
          {meta.error}
        </IonText>
      )}
    </div>
  );
};

export default RadioGroupInput;
