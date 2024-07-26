import { IonCol, IonGrid, IonRow } from '@ionic/react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import classes from './UserGrid.module.scss';
import { BaseComponentProps } from 'common/components/types';
import { useGetUsers } from 'pages/Users/api/useGetUsers';
import UserCard from './UserCard';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';
import CardRow from 'common/components/Card/CardRow';
import ErrorCard from 'common/components/Card/ErrorCard';
import EmptyCard from 'common/components/Card/EmptyCard';

/**
 * Properties for the `UserGrid` component.
 */
interface UserGridProps extends BaseComponentProps {}

/**
 * The `UserGrid` component renders a grid of `UserCard`s. Uses the `IonGrid`
 * component to provide base functionality.
 * @param {UserGridProps} props - Component properties.
 * @returns JSX
 * @see {@link IonGrid}
 */
const UserGrid = ({ className, testid = 'grid-user' }: UserGridProps): JSX.Element => {
  const { data: users, isError, isLoading } = useGetUsers();

  const baseProps = {
    className: classNames(classes.grid_user, className),
    'data-testid': testid,
  };

  // Loading state
  if (isLoading) {
    return (
      <div {...baseProps}>
        <LoaderSpinner
          className={classes.loader}
          testid={`${testid}-loader`}
          text="Loading users..."
        />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div {...baseProps}>
        <CardRow className={classes.row_message} testid={`${testid}-error`}>
          <ErrorCard content="We are experiencing problems getting the users." />
        </CardRow>
      </div>
    );
  }

  // Empty state
  if (isEmpty(users)) {
    return (
      <div {...baseProps}>
        <CardRow className={classes.row_message} testid={`${testid}-empty`}>
          <EmptyCard content="No users found." />
        </CardRow>
      </div>
    );
  }

  // Success state
  return (
    <IonGrid {...baseProps}>
      <IonRow>
        {users &&
          users.map((user) => (
            <IonCol key={user.id} sizeXs="12" sizeMd="6" sizeXl="4">
              <UserCard user={user} testid={`${testid}-card-user-${user.id}`} />
            </IonCol>
          ))}
      </IonRow>
    </IonGrid>
  );
};

export default UserGrid;
