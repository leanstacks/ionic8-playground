import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import classNames from 'classnames';

import classes from './UserSummaryCard.module.scss';
import { useGetUsers } from 'pages/Users/api/useGetUsers';
import { BaseComponentProps } from 'common/components/types';

/**
 * Properties for the `UserSummaryCard` component.
 * @see {@link BaseComponentProps}
 */
interface UserSummaryCardProps extends BaseComponentProps {}

/**
 * The `UserSummaryCard` component renders an `IonCard` containing summary
 * information about the `User` data. Facilitates navigation to the user
 * list  page.
 * @param {UserSummaryCardProps} props - Component properties.
 * @returns JSX
 */
const UserSummaryCard = ({
  className,
  testid = 'card-user-summary',
}: UserSummaryCardProps): JSX.Element => {
  const { data: users } = useGetUsers();

  return (
    <IonCard
      button
      routerLink="/tabs/users"
      className={classNames(classes.card_user_summary, className)}
      data-testid={testid}
    >
      <IonCardHeader>
        <IonCardTitle>
          Users
          {users && (
            <IonBadge className={classes.badge} data-testid={`${testid}-badge`}>
              {users.length}
            </IonBadge>
          )}
        </IonCardTitle>
        <IonCardSubtitle>Tap to view all users.</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        Browse and search all the users. View user profiles and read their posts.
      </IonCardContent>
    </IonCard>
  );
};

export default UserSummaryCard;
