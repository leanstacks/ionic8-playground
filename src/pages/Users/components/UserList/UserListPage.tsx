import { IonContent, IonPage } from '@ionic/react';

import './UserListPage.scss';
import Header from 'common/components/Header/Header';
import UserList from './UserList';

/**
 * The `UserListPage` component renders a list of all `User` objects.
 * @returns JSX
 */
export const UserListPage = (): JSX.Element => {
  const testid = 'page-user-list';

  return (
    <IonPage data-testid={testid}>
      <Header title="Users" />

      <IonContent fullscreen>
        <UserList className="user-list" />
      </IonContent>
    </IonPage>
  );
};

export default UserListPage;
