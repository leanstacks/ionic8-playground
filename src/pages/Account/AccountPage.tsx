import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/react';
import { Redirect, Route } from 'react-router';
import dayjs from 'dayjs';

import './AccountPage.scss';
import { PropsWithTestId } from 'common/components/types';
import { useConfig } from 'common/hooks/useConfig';
import Header from 'common/components/Header/Header';
import AccountMenu from './components/AccountMenu/AccountMenu';
import ProfilePage from './components/Profile/ProfilePage';

/**
 * The `AccountPage` component renders a list of account related items which
 * a user may perform.
 * @param {PropsWithTestId} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const AccountPage = ({ testid = 'page-account' }: PropsWithTestId): JSX.Element => {
  const config = useConfig();

  const versionTs = dayjs(config.VITE_BUILD_TS).format('YY.MM.DD.hhmm');
  const sha = config.VITE_BUILD_COMMIT_SHA.substring(0, 7);
  const version = `${versionTs}.${sha}`;

  return (
    <IonPage className="page-account" data-testid={testid}>
      <Header title="My Account" />

      <IonSplitPane when="md" contentId="account-pane">
        <IonMenu contentId="account-pane">
          <AccountMenu className="ion-padding" />
        </IonMenu>

        <IonRouterOutlet id="account-pane">
          <Route exact path="/tabs/account/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/tabs/account">
            <AccountMenu />
          </Route>
        </IonRouterOutlet>

        {/* <div className="ion-page" id="account-pane">
          <IonContent>
            <IonList>
              <IonListHeader>
                <IonLabel>Account</IonLabel>
              </IonListHeader>
              <IonItem lines="full" routerLink="/tabs/account/profile">
                <IonLabel>Profile</IonLabel>
              </IonItem>
              <IonItem lines="full" routerLink="/auth/signout">
                <IonLabel>Sign Out</IonLabel>
              </IonItem>
            </IonList>

            <IonList>
              <IonListHeader>
                <IonLabel>Settings</IonLabel>
              </IonListHeader>
              <IonList>
                <IonItem>
                  <IonLabel color="medium">Version {version}</IonLabel>
                </IonItem>
              </IonList>
            </IonList>

            <IonList>
              <IonListHeader>
                <IonLabel>Legal</IonLabel>
              </IonListHeader>
              <IonItem lines="full">
                <IonLabel>Privacy policy</IonLabel>
              </IonItem>
              <IonItem lines="full">
                <IonLabel>Terms and conditions</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </div> */}
      </IonSplitPane>
    </IonPage>
  );
};

export default AccountPage;
