import { IonContent, IonPage } from '@ionic/react';

import './UserListPage.scss';
import Header from 'common/components/Header/Header';
import UserList from './UserList';

export const UserListPage = (): JSX.Element => {
  return (
    <>
      <Header title="Users" />

      <IonContent fullscreen>
        <UserList className="user-list" />
      </IonContent>
    </>
  );
};

export default UserListPage;
