import { IonFab, IonFabButton } from '@ionic/react';
import classNames from 'classnames';

import './UserAddFab.scss';
import { BaseComponentProps } from 'common/components/types';
import Icon, { IconName } from 'common/components/Icon/Icon';

/**
 * Properties for the `UserAddFab` component.
 */
interface UserAddFabProps extends BaseComponentProps {}

/**
 * The `UserAddFab` renders an Ionic Floating Action Button, or FAB.
 * The button navigates to the create new `User` form when clicked.
 * @param {UserAddFabProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserAddFab = ({ className, testid = 'fab-user-add' }: UserAddFabProps): JSX.Element => {
  return (
    <IonFab
      className={classNames('fab-user-add', className)}
      data-testid={testid}
      slot="fixed"
      vertical="bottom"
      horizontal="end"
    >
      <IonFabButton routerLink="/tabs/users/add">
        <Icon icon={IconName.Plus} />
      </IonFabButton>
    </IonFab>
  );
};

export default UserAddFab;
