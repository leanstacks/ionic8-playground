import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { home, people, personCircle } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';

import AppMenu from '../Menu/AppMenu';
import HomePage from 'pages/Home/HomePage';
import UserDetailPage from 'pages/Users/components/UserDetail/UserDetailPage';
import UserListPage from 'pages/Users/components/UserList/UserListPage';
import UserEditPage from 'pages/Users/components/UserEdit/UserEditPage';
import AccountPage from 'pages/Account/AccountPage';

/**
 * The `TabNavigation` component provides a router outlet for all of the
 * application routes. The component renders two main application
 * navigation controls.
 *
 * On smaller viewport sizes, Ionic mobile tab navigation is rendered at
 * the bottom of the page.
 *
 * On larger viewport sizes, the Ionic [side] menu is rendered. The menu
 * may be toggled using the hamburger (three lines) icon in the top
 * toolbar.
 *
 * @returns JSX
 * @see {@link AppMenu}
 */
const TabNavigation = (): JSX.Element => {
  return (
    <>
      <AppMenu />

      <IonTabs>
        <IonRouterOutlet id="content-main">
          <Redirect exact path="/tabs" to="/tabs/home" />
          <Route exact path="/tabs/home">
            <HomePage />
          </Route>
          <Route exact path="/tabs/users">
            <UserListPage />
          </Route>
          <Route exact path="/tabs/users/:userId">
            <UserDetailPage />
          </Route>
          <Route exact path="/tabs/users/:userId/edit">
            <UserEditPage />
          </Route>
          <Route exact path="/tabs/account">
            <AccountPage />
          </Route>
          <Route exact path="/">
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
          <IonTabButton tab="account" href="/tabs/account">
            <IonIcon icon={personCircle} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default TabNavigation;
