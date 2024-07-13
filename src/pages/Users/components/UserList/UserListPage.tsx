import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { add } from 'ionicons/icons';

import './UserListPage.scss';
import Header from 'common/components/Header/Header';
import Container from 'common/components/Content/Container';
import PageHeader from 'common/components/Content/PageHeader';
import UserList from './UserList';
import UserGrid from './UserGrid';

/**
 * The `UserListPage` component renders a list of all `User` objects.
 * @returns JSX
 */
export const UserListPage = (): JSX.Element => {
  const testid = 'page-user-list';

  return (
    <IonPage className="page-user-list" data-testid={testid}>
      <Header />

      <IonContent>
        <Container fixed>
          <PageHeader
            title="Users"
            buttons={
              <>
                <IonButton>
                  <IonIcon slot="icon-only" icon={add} />
                </IonButton>
              </>
            }
          />
          <UserList className="ion-hide-md-up" />
          <UserGrid className="ion-hide-md-down" />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default UserListPage;
