import { IonSelect, SelectCustomEvent } from '@ionic/react';
import { ComponentPropsWithoutRef } from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

import { PropsWithTestId } from '../types';

/**
 * Properties for the `SelectInput` component.
 * @see {@link PropsWithTestId}
 * @see {@link IonSelect}
 */
interface SelectInputProps
  extends PropsWithTestId,
    Omit<ComponentPropsWithoutRef<typeof IonSelect>, 'name'>,
    Required<Pick<ComponentPropsWithoutRef<typeof IonSelect>, 'name'>> {}

/**
 * The `SelectInput` component renders a standardized wrapper of the `IonSelect`
 * component which is integrated with Formik.
 *
 * Accepts a collection of `IonSelectOption` components as `children`.
 *
 * @param {SelectInputProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const SelectInput = ({
  className,
  name,
  onIonChange,
  testid = 'input-select',
  ...selectProps
}: SelectInputProps): JSX.Element => {
  const [field, meta, helpers] = useField(name);

  const onChange = async (e: SelectCustomEvent) => {
    console.log(`SelectInput::onChange::${e.detail.value}`);
    await helpers.setValue(e.detail.value);
    onIonChange?.(e);
  };

  return (
    <IonSelect
      className={classNames(
        'ls-input-select',
        className,
        { 'ion-touched': meta.touched },
        { 'ion-invalid': meta.error },
        { 'ion-valid': meta.touched && !meta.error },
      )}
      onIonChange={onChange}
      data-testid={testid}
      {...field}
      {...selectProps}
    />
  );
};

export default SelectInput;
