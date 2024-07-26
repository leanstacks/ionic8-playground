import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import classNames from 'classnames';

import classes from './UserListItem.module.scss';
import { User } from 'common/models/user';
import Avatar from 'common/components/Icon/Avatar';
import { mail } from 'ionicons/icons';

/**
 * Properties for the `UserListItem` component.
 * @param {string} [lines] - See `lines` from `IonItem`.
 * @param {User} user - A `User` object.
 * @see {@link HTMLIonItemElement}
 */
interface UserListItemProps extends Pick<HTMLIonItemElement, 'lines'> {
  user: User;
}

/**
 * The `UserListItem` component renders a single item in the list of
 * `User` objects. Uses `IonItem` to provide base functionality.
 *
 * When clicked, navigates to the user detail page.
 * @param {UserListItemProps} props - Component properties.
 * @returns JSX
 */
const UserListItem = ({ lines, user }: UserListItemProps): JSX.Element => {
  const testid = `list-item-user-${user.id}`;

  return (
    <IonItem
      className={classes.list_item_user}
      data-testid={testid}
      routerLink={`/tabs/users/${user.id}`}
      lines={lines}
      detail
    >
      <Avatar value={user.name} className={classes.avatar} />
      <IonLabel>
        <div
          className={classNames(classes.content_row, classes.primary)}
          data-testid={`${testid}-name`}
        >
          {user.name}
        </div>
        <div className={classNames(classes.content_row, classes.secondary)}>
          <div>
            <IonIcon icon={mail} />
            <div data-testid={`${testid}-email`}>{user.email}</div>
          </div>
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default UserListItem;
