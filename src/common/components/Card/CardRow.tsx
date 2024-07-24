import { IonRow } from '@ionic/react';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import classes from './CardRow.module.scss';
import { BaseComponentProps } from '../types';

/**
 * Properties for the `CardRow` component.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
interface CardRowProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `CardRow` component displays an `IonCard` (or other Card component)
 * in a horizontal row, an `IonRow`.
 *
 * The content is horizontally and vertically centered within the row. The
 * card width is responsive, adjusting based upon the viewport size.
 * @param {CardRowProps} props - Component properties.
 * @returns JSX
 */
const CardRow = ({ children, className, testid = 'row-card' }: CardRowProps): JSX.Element => {
  return (
    <IonRow className={classNames(classes.row_card, className)} data-testid={testid}>
      <div className={classes.wrapper}>{children}</div>
    </IonRow>
  );
};

export default CardRow;
