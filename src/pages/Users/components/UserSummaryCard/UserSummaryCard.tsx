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

interface UserSummaryCardProps {}

const UserSummaryCard = ({}: UserSummaryCardProps): JSX.Element => {
  const { data: users } = useGetUsers();

  return (
    <IonCard
      button
      routerLink="/users"
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
