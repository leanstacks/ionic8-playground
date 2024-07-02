import { IonContent, IonPage } from '@ionic/react';

import './UserListPage.scss';
import Header from 'common/components/Header/Header';
import UserList from './UserList';

/**
 * The `UserListPage` component renders a list of all `User` objects.
 * @returns JSX
 */
export const UserListPage = (): JSX.Element => {
  return (
    <IonPage>
      <Header title="Users" />

      <IonContent fullscreen>
        <UserList className="user-list" />
      </IonContent>
    </IonPage>
  );
};

export default UserListPage;
