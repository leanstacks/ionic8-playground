import { IonContent, IonPage } from '@ionic/react';

import './UserListPage.scss';
import Header from 'common/components/Header/Header';
import Container from 'common/components/Content/Container';
import PageHeader from 'common/components/Content/PageHeader';
import UserList from './UserList';
import UserGrid from './UserGrid';
import ProgressProvider from 'common/providers/ProgressProvider';

/**
 * The `UserListPage` component renders a list of all `User` objects.
 * @returns JSX
 */
export const UserListPage = (): JSX.Element => {
  const testid = 'page-user-list';

  return (
    <IonPage className="page-user-list" data-testid={testid}>
      <ProgressProvider type="indeterminate">
        <Header />

        <IonContent>
          <Container fixed>
            <PageHeader title="Users" />
            <UserList className="ion-hide-md-up" />
            <UserGrid className="ion-hide-md-down" />
          </Container>
        </IonContent>
      </ProgressProvider>
    </IonPage>
  );
};

export default UserListPage;
