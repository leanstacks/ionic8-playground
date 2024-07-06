import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { useParams } from 'react-router';

import './UserDetailPage.scss';
import Header from 'common/components/Header/Header';
import { useGetUser } from 'pages/Users/api/useGetUser';
import UserSummary from './UserSummary';
import CompanyDetail from './CompanyDetail';
import AddressDetail from './AddressDetail';

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
    <IonPage className="page-user-detail" data-testid={testid}>
      <Header backButton defaultHref="/users" title={headerTitle} />

      <IonContent className="ion-padding" fullscreen>
        {user && (
          <>
            <UserSummary user={user} />
            <IonGrid>
              <IonRow>
                <IonCol sizeXs="2" sizeMd="1">
                  <CompanyDetail company={user.company} />
                </IonCol>
                <IonCol sizeXs="2" sizeMd="1">
                  <AddressDetail address={user.address} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UserDetailPage;
