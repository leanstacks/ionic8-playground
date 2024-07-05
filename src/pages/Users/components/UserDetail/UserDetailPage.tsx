import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router';

import Header from 'common/components/Header/Header';
import { useGetUser } from 'pages/Users/api/useGetUser';

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
  const { data: user } = useGetUser({ userId });

  //TODO: loading, error, not found states

  const headerTitle: string = user ? user.name : '';

  return (
    <IonPage data-testid={testid}>
      <Header backButton defaultHref="/users" title={headerTitle} />

      <IonContent className="ion-padding" fullscreen>
        {user && <h1 data-testid={`${testid}-name`}>{user.name}</h1>}
      </IonContent>
    </IonPage>
  );
};

export default UserDetailPage;
