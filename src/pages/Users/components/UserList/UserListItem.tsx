import { IonItem, IonLabel, IonNote } from '@ionic/react';

import './UserListItem.scss';
import { User } from 'common/models/user';

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
      className="list-item-user"
      data-testid={testid}
      routerLink={`/tabs/users/${user.id}`}
      lines={lines}
      detail
    >
      <IonLabel>
        <div className="name" data-testid={`${testid}-name`}>
          {user.name}
        </div>
        <IonNote data-testid={`${testid}-email`}>{user.email}</IonNote>
      </IonLabel>
    </IonItem>
  );
};

export default UserListItem;
