import { ToggleChangeEventDetail, ToggleCustomEvent } from '@ionic/react';
import { useField } from 'formik';
import classNames from 'classnames';

import { PropsWithTestId } from '../types';
import Toggle, { ToggleProps } from '../Toggle/Toggle';

/**
 * Properties for the `ToggleInput` component.
 * @param {string} name - The field `name` attribute value.
 * @see {@link PropsWithTestId}
 * @see {@link ToggleProps}
 */
interface ToggleInputProps extends PropsWithTestId, ToggleProps {
  name: string;
}

/**
 * The `ToggleInput` component renders a standardized `Toggle` (`IonToggle`)
 * which is integrated with Formik.
 *
 * @param {ToggleInputProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const ToggleInput = ({
  className,
  name,
  onIonChange,
  testid = 'input-toggle',
  ...toggleProps
}: ToggleInputProps): JSX.Element => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [field, meta, helpers] = useField<boolean>(name);

  const onChange = async (e: ToggleCustomEvent<ToggleChangeEventDetail>) => {
    await helpers.setValue(e.detail.checked);
    onIonChange?.(e);
  };

  return (
    <Toggle
      className={classNames('input-toggle', className)}
      checked={field.value}
      onIonChange={onChange}
      testid={testid}
      {...toggleProps}
    />
  );
};

export default ToggleInput;
