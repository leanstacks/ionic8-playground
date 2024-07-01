import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';

import HomePage from 'pages/Home/HomePage';
import UserListPage from 'pages/Users/components/UserList/UserListPage';
import UserDetailPage from 'pages/Users/components/UserDetail/UserDetailPage';

const Router = (): JSX.Element => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route exact path="/users">
          <UserListPage />
        </Route>
        <Route path="/users/:userId">
          <UserDetailPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
