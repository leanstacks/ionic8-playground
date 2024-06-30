import { IonList, IonListHeader } from '@ionic/react';

import { useGetUsers } from 'pages/Users/api/useGetUsers';
import UserListItem from './UserListItem';

interface UserListProps {
  className?: string;
  header?: string;
  showHeader?: boolean;
}

const UserList = ({
  className,
  header = 'Users',
  showHeader = false,
}: UserListProps): JSX.Element => {
  const { data: users } = useGetUsers();

  return (
    <IonList className={className} data-testid="list-user">
      {showHeader && <IonListHeader>{header}</IonListHeader>}
      {users &&
        users.map((user, index) => (
          <UserListItem
            key={user.id}
            user={user}
            lines={index === users.length - 1 ? 'none' : 'full'}
          />
        ))}
    </IonList>
  );
};

export default UserList;
