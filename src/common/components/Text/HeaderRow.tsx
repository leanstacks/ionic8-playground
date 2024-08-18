import { IonRow } from '@ionic/react';
import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames';

import './HeaderRow.scss';
import { BaseComponentProps } from '../types';

/**
 * Properties for the `HeaderRow` component.
 * @param {boolean} [border] - Optional. Indicates a bottom border should be
 * rendered. Default: `false`.
 * @param {boolean} [inset] - Optional. Indicates the contents should be inset
 * slightly from the left and right edges. Default: `false`.
 * @see {@link BaseComponentProps}
 * @see {@link IonRow}
 */
export interface HeaderRowProps
  extends BaseComponentProps,
    ComponentPropsWithoutRef<typeof IonRow> {
  border?: boolean;
  inset?: boolean;
}

/**
 * The `HeaderRow` component renders a styled `IonRow` as a heading. May be
 * used to render text only or several blocks of content.
 *
 * @param {HeaderRowProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const HeaderRow = ({
  border = false,
  className,
  inset = false,
  testid = 'row-header',
  ...rowProps
}: HeaderRowProps): JSX.Element => {
  return (
    <IonRow
      className={classNames(
        'row-header ion-align-items-center ion-text-uppercase',
        { bordered: border },
        { inset: inset },
        className,
      )}
      data-testid={testid}
      {...rowProps}
    />
  );
};

export default HeaderRow;
