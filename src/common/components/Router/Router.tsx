import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';

import HomePage from 'pages/Home/HomePage';
import UsersPage from 'pages/Users/components/UsersPage';

const Router = (): JSX.Element => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
