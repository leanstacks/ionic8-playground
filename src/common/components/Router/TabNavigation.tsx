import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { home, people } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';

import HomePage from 'pages/Home/HomePage';
import UserDetailPage from 'pages/Users/components/UserDetail/UserDetailPage';
import UserListPage from 'pages/Users/components/UserList/UserListPage';

const TabNavigation = (): JSX.Element => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        <Route path="/tabs/home">
          <HomePage />
        </Route>
        <Route exact path="/tabs/users">
          <UserListPage />
        </Route>
        <Route path="/tabs/users/:userId">
          <UserDetailPage />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="ion-hide-md-up">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="users" href="/tabs/users">
          <IonIcon icon={people} />
          <IonLabel>Users</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabNavigation;
