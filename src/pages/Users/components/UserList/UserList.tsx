import { IonCol, IonGrid, IonList, IonListHeader, IonRow } from '@ionic/react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import './UserList.scss';
import { BaseComponentProps } from 'common/components/types';
import { useGetUsers } from 'pages/Users/api/useGetUsers';
import UserListItem from './UserListItem';
import UserCard from './UserCard';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';
import CardRow from 'common/components/Card/CardRow';
import ErrorCard from 'common/components/Card/ErrorCard';
import EmptyCard from 'common/components/Card/EmptyCard';

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
          <ErrorCard content="We are experiencing problems getting the list of users." />
        </CardRow>
      </div>
    );
  }

  // Empty state
  if (isEmpty(users)) {
    return (
      <div {...baseProps}>
        <CardRow className="row-message" testid={`${testid}-empty`}>
          <EmptyCard content="No users found." />
        </CardRow>
      </div>
    );
  }

  // Success state
  const { className: baseClassName, ...otherProps } = baseProps;
  return (
    <>
      <IonList className={classNames(baseClassName, 'ion-hide-md-up')} {...otherProps}>
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
      <IonGrid className={classNames(baseClassName, 'ion-hide-md-down')} {...otherProps}>
        <IonRow>
          {users &&
            users.map((user) => (
              <IonCol key={user.id} sizeXs="12" sizeMd="6" sizeXl="4">
                <UserCard user={user} />
              </IonCol>
            ))}
        </IonRow>
      </IonGrid>
    </>
  );
};

export default UserList;
