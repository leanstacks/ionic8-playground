import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './UsersPage.scss';
import Header from 'common/components/Header/Header';
import UserList from './components/UserList/UserList';

export const UsersPage = (): JSX.Element => {
  return (
    <IonPage data-testid="page-users">
      <Header title="Users" />

      <IonContent fullscreen>
        <UserList className="user-list" />
      </IonContent>
    </IonPage>
  );
};

export default UsersPage;
