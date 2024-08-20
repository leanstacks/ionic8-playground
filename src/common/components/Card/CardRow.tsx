import { IonRow } from '@ionic/react';
import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames';

import './CardRow.scss';
import { BaseComponentProps } from '../types';

/**
 * Properties for the `CardRow` component.
 * @see {@link BaseComponentProps}
 * @see {@link IonRow}
 */
interface CardRowProps extends BaseComponentProps, ComponentPropsWithoutRef<typeof IonRow> {}

/**
 * The `CardRow` component displays an `IonCard` (or other Card component)
 * in a horizontal row, an `IonRow`.
 *
 * The content is horizontally and vertically centered within the row. The
 * card width is responsive, adjusting based upon the viewport size.
 * @param {CardRowProps} props - Component properties.
 * @returns JSX
 */
const CardRow = ({
  children,
  className,
  testid = 'row-card',
  ...rowProps
}: CardRowProps): JSX.Element => {
  return (
    <IonRow className={classNames('row-card', className)} data-testid={testid} {...rowProps}>
      <div className="wrapper">{children}</div>
    </IonRow>
  );
};

export default CardRow;
