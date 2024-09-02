import { IonRange, RangeCustomEvent } from '@ionic/react';
import { ComponentPropsWithoutRef } from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

import { PropsWithTestId } from '../types';

/**
 * Properties for the `RangeInput` component.
 * @param {string} name - The field `name` attribute value.
 * @see {@link PropsWithTestId}
 * @see {@link IonRange}
 */
interface RangeInputProps extends PropsWithTestId, ComponentPropsWithoutRef<typeof IonRange> {
  name: string;
}

/**
 * The `RangeInput` component renders a standardized `IonRange` which is
 * integrated with Formik.
 *
 * @param {RangeInputProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const RangeInput = ({
  className,
  name,
  onIonChange,
  testid = 'input-range',
  ...rangeProps
}: RangeInputProps): JSX.Element => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [field, meta, helpers] = useField<number>(name);

  const onChange = async (e: RangeCustomEvent) => {
    await helpers.setValue(e.detail.value as number);
    onIonChange?.(e);
  };

  return (
    <IonRange
      className={classNames('ls-input-range', className)}
      onIonChange={onChange}
      data-testid={testid}
      {...field}
      {...rangeProps}
    ></IonRange>
  );
};

export default RangeInput;
