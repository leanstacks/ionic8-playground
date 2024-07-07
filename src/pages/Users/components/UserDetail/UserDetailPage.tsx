import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router';

import Header from 'common/components/Header/Header';
import UserDetail from './UserDetail';

/**
 * Router path parameters for the `UserDetailPage`.
 * @param {string} userId - A user identifier.
 */
interface UserDetailPageRouteParams {
  userId: string;
}

/**
 * The `UserDetailPage` component renders information about a single `User`.
 * @returns JSX
 */
export const UserDetailPage = (): JSX.Element => {
  const testid = 'page-user-detail';
  const { userId } = useParams<UserDetailPageRouteParams>();

  return (
    <IonPage className="page-user-detail" data-testid={testid}>
      <Header backButton defaultHref="/users" />

      <IonContent className="ion-padding" fullscreen>
        <UserDetail testid={`${testid}-user-detail`} userId={userId} />
      </IonContent>
    </IonPage>
  );
};

export default UserDetailPage;
