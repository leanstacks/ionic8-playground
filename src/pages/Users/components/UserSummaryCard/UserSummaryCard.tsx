import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';

import './UserSummaryCard.scss';
import { useGetUsers } from 'pages/Users/api/useGetUsers';

/**
 * Properties for the `UserSummaryCard` component.
 */
interface UserSummaryCardProps {}

/**
 * The `UserSummaryCard` component renders an `IonCard` containing summary
 * information about the `User` data. Facilitates navigation to the user
 * list  page.
 * @param {UserSummaryCardProps} props - Component properties.
 * @returns JSX
 */
const UserSummaryCard = ({}: UserSummaryCardProps): JSX.Element => {
  const { data: users } = useGetUsers();

  return (
    <IonCard
      button
      routerLink="/tabs/users"
      className="card-user-summary"
      data-testid="card-user-summary"
    >
      <IonCardHeader>
        <IonCardTitle>
          Users
          {users && <IonBadge className="badge">{users.length}</IonBadge>}
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
