import { IonCard } from '@ionic/react';
import classNames from 'classnames';

import './UserCard.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import Avatar from 'common/components/Icon/Avatar';
import Icon, { IconName } from 'common/components/Icon/Icon';

/**
 * Properties for the `UserCard` component.
 * @param {User} user - A `User` object.
 * @see {@link BaseComponentProps}
 */
interface UserCardProps extends BaseComponentProps {
  user: User;
}

/**
 * The `UserCard` component renders an `IonCard` which displays an avatar,
 * name, and email address of a single `User`.
 * @param {UserCardProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserCard = ({ className, testid = 'card-user', user }: UserCardProps): JSX.Element => {
  return (
    <IonCard
      className={classNames('card-user', className)}
      routerLink={`/tabs/users/${user.id}`}
      data-testid={testid}
    >
      <div className="layout">
        <Avatar value={user.name} />
        <div>
          <div className="header">{user.name}</div>
          <div className="content-row">
            <div>
              <Icon icon={IconName.Envelope} />
              <div>{user.email}</div>
            </div>
          </div>
        </div>
      </div>
    </IonCard>
  );
};

export default UserCard;
