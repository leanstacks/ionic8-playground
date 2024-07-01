import { IonItem, IonLabel, IonNote } from '@ionic/react';

import './UserListItem.scss';
import { User } from 'common/models/user';

interface UserListItemProps extends Pick<HTMLIonItemElement, 'lines'> {
  user: User;
}

const UserListItem = ({ lines, user }: UserListItemProps): JSX.Element => {
  return (
    <IonItem
      className="list-item-user"
      data-testid={`list-item-user-${user.id}`}
      routerLink={`/users/${user.id}`}
      lines={lines}
      detail
    >
      <IonLabel>
        <div className="name">{user.name}</div>
        <IonNote>{user.email}</IonNote>
      </IonLabel>
    </IonItem>
  );
};

export default UserListItem;
