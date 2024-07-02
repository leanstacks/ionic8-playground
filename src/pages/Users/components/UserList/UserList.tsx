import { IonList, IonListHeader } from '@ionic/react';

import { useGetUsers } from 'pages/Users/api/useGetUsers';
import UserListItem from './UserListItem';
import { BaseComponentProps } from 'common/components/types';

/**
 * Properties for the `UserList` component.
 * @param {string} [header] - Optional. The list header title. Default: `Users`.
 * @param {boolean} [showHeader] - Optional. Indicates if the header is shown. Default: `false`.
 */
interface UserListProps extends BaseComponentProps {
  header?: string;
  showHeader?: boolean;
}

/**
 * The `UserList` component renders a list of `User` objects. Uses the `IonList`
 * component to provide base functionality.
 * @param {UserListProps} props - Component properties.
 * @returns JSX
 */
const UserList = ({
  className,
  header = 'Users',
  showHeader = false,
  testid = 'list-user',
}: UserListProps): JSX.Element => {
  const { data: users } = useGetUsers();

  return (
    <IonList className={className} data-testid={testid}>
      {showHeader && <IonListHeader data-testid={`${testid}-header`}>{header}</IonListHeader>}
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
