import { IonContent, IonPage } from '@ionic/react';

import './UserListPage.scss';
import Header from 'common/components/Header/Header';
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
      <Header title="Users" />

      <IonContent fullscreen>
        <UserList className="ion-hide-md-up" />
        <UserGrid className="ion-hide-md-down" />
      </IonContent>
    </IonPage>
  );
};

export default UserListPage;
