import { IonList, IonListHeader } from '@ionic/react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import './UserList.scss';
import { BaseComponentProps } from 'common/components/types';
import { useGetUsers } from 'pages/Users/api/useGetUsers';
import { filterUsers } from 'pages/Users/utils/users';
import UserListItem from './UserListItem';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';
import CardRow from 'common/components/Card/CardRow';
import ErrorCard from 'common/components/Card/ErrorCard';
import EmptyCard from 'common/components/Card/EmptyCard';

/**
 * Properties for the `UserList` component.
 * @param {string} [filterBy] - Optional. Critera to filter the list of `Users`.
 * @param {string} [header] - Optional. The list header title. Default: `Users`.
 * @param {boolean} [showHeader] - Optional. Indicates if the header is shown. Default: `false`.
 * @see {@link BaseComponentProps}
 */
interface UserListProps extends BaseComponentProps {
  filterBy?: string;
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
  filterBy,
  header = 'Users',
  showHeader = false,
  testid = 'list-user',
}: UserListProps): JSX.Element => {
  const { data: users, isError, isLoading } = useGetUsers();

  const baseProps = {
    className: classNames('list-user', className),
    'data-testid': testid,
  };

  // Loading state
  if (isLoading) {
    return (
      <div {...baseProps}>
        <LoaderSpinner className="loader" testid={`${testid}-loader`} text="Loading users..." />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div {...baseProps}>
        <CardRow className="row-message" testid={`${testid}-error`}>
          <ErrorCard content="We are experiencing problems getting the users." />
        </CardRow>
      </div>
    );
  }

  const filteredUsers = filterUsers(users, filterBy);

  // Empty state
  if (isEmpty(filteredUsers)) {
    return (
      <div {...baseProps}>
        <CardRow className="row-message" testid={`${testid}-empty`}>
          <EmptyCard content="No users found." />
        </CardRow>
      </div>
    );
  }

  // Success state
  return (
    <IonList {...baseProps}>
      {showHeader && <IonListHeader data-testid={`${testid}-header`}>{header}</IonListHeader>}

      {filteredUsers &&
        filteredUsers.map((user, index) => (
          <UserListItem
            key={user.id}
            user={user}
            lines={index === filteredUsers.length - 1 ? 'none' : 'full'}
          />
        ))}
    </IonList>
  );
};

export default UserList;
