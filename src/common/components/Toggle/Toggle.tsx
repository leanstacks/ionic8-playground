import { IonToggle } from '@ionic/react';
import { ComponentPropsWithoutRef } from 'react';

import { PropsWithTestId } from '../types';

/**
 * Properties for the `Toggle` component.
 */
export interface ToggleProps extends PropsWithTestId, ComponentPropsWithoutRef<typeof IonToggle> {}

/**
 * The `Toggle` component is a wrapper for `IonToggle`. Provides a standardized
 * implementation of a toggle.
 *
 * The standalone `Toggle` component is typically used outside of a form. Use
 * the `ToggleInput` component within a form.
 *
 * @param {ToggleProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Toggle = ({ testid = 'toggle', ...toggleProps }: ToggleProps): JSX.Element => {
  return <IonToggle data-testid={testid} {...toggleProps} />;
};

export default Toggle;
