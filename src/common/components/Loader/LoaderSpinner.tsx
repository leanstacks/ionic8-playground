import { IonSpinner } from '@ionic/react';
import classNames from 'classnames';

import classes from './LoaderSpinner.module.scss';
import { BaseComponentProps } from '../types';

/**
 * Properties for the `LoaderSpinner` component.
 * @param {string} [text] - Optional. Text to accompany the spinner icon.
 */
interface LoaderSpinnerProps extends BaseComponentProps {
  text?: string;
}

/**
 * The `LoaderSpinner` component renders an `IonSpinner` component which is
 * centered horizontally and vertically within a block.
 *
 * By default the height matches that of the spinner icon; however, you may
 * pass additional classes to modify the height and other styling of this
 * component.
 * @param {LoaderSpinnerProps} props - Component properties.
 * @returns JSX
 */
const LoaderSpinner = ({
  className,
  testid = 'loader-spinner',
  text,
}: LoaderSpinnerProps): JSX.Element => {
  return (
    <div className={classNames(classes.loader_spinner, className)} data-testid={testid}>
      <IonSpinner></IonSpinner>
      {text && <div className={classes.text}>{text}</div>}
    </div>
  );
};

export default LoaderSpinner;
