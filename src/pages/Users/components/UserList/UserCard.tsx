import { IonCard, IonIcon } from '@ionic/react';
import { mail } from 'ionicons/icons';
import classNames from 'classnames';

import classes from './UserCard.module.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import Avatar from 'common/components/Icon/Avatar';

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
      className={classNames(classes.card_user, className)}
      routerLink={`/tabs/users/${user.id}`}
      data-testid={testid}
    >
      <div className={classes.layout}>
        <Avatar className={classes.avatar} value={user.name} />
        <div>
          <div className={classes.header}>{user.name}</div>
          <div className={classes.content_row}>
            <div>
              <IonIcon icon={mail} />
              <div>{user.email}</div>
            </div>
          </div>
        </div>
      </div>
    </IonCard>
  );
};

export default UserCard;
