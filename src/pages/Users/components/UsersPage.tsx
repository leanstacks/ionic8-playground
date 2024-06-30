import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router';
import UserListPage from './UserList/UserListPage';

const UsersPage = (): JSX.Element => {
  return (
    <IonPage data-testid="page-users">
      <IonRouterOutlet>
        <Route exact path="/users">
          <UserListPage />
        </Route>
        <Route render={() => <Redirect to="/users" />} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default UsersPage;
