import { IonRow } from '@ionic/react';
import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames';

import './HeaderRow.scss';
import { BaseComponentProps } from '../types';

export interface HeaderProps extends BaseComponentProps, ComponentPropsWithoutRef<typeof IonRow> {
  border?: boolean;
  inset?: boolean;
}

const HeaderRow = ({
  border = false,
  className,
  inset = false,
  testid = 'row-header',
  ...rowProps
}: HeaderProps): JSX.Element => {
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
