import { ComponentPropsWithoutRef } from 'react';
import { CheckboxCustomEvent, IonCheckbox } from '@ionic/react';
import { useField } from 'formik';
import classNames from 'classnames';

import './CheckboxInput.scss';
import { PropsWithTestId } from '../types';

/**
 * Properties for the `CheckboxInput`component.
 * @see {@link PropsWithTestId}
 * @see {@link IonCheckbox}
 */
interface CheckboxInputProps
  extends PropsWithTestId,
    Omit<ComponentPropsWithoutRef<typeof IonCheckbox>, 'name'>,
    Required<Pick<ComponentPropsWithoutRef<typeof IonCheckbox>, 'name'>> {}

/**
 * The `CheckboxInput` component renders a standardized `IonCheckbox` which is
 * integrated with Formik.
 *
 * @param {CheckboxInputProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const CheckboxInput = ({
  className,
  name,
  onIonChange,
  testid = 'ls-input-checkbox',
  ...checkboxProps
}: CheckboxInputProps): JSX.Element => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [field, meta, helpers] = useField<boolean>(name);

  /**
   * Handles changes to the `checked` property as a result of a user action.
   * @param {CheckboxCustomEvent} e - The event.
   */
  const onChange = async (e: CheckboxCustomEvent): Promise<void> => {
    await helpers.setValue(e.detail.checked);
    onIonChange?.(e);
  };

  return (
    <IonCheckbox
      className={classNames('ls-checkbox-input', className)}
      data-testid={testid}
      onIonChange={onChange}
      {...field}
      {...checkboxProps}
    ></IonCheckbox>
  );
};

export default CheckboxInput;
