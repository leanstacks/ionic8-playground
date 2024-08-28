import {
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
} from '@ionic/react';
import dayjs from 'dayjs';

import './AccountPage.scss';
import { PropsWithTestId } from 'common/components/types';
import { useConfig } from 'common/hooks/useConfig';
import ProgressProvider from 'common/providers/ProgressProvider';
import Header from 'common/components/Header/Header';
import SettingsForm from './components/Settings/SettingsForm';

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
      <ProgressProvider>
        <Header title="My Account" />

        <IonContent>
          <IonGrid fixed>
            <IonRow>
              <IonCol size="12" sizeLg="6">
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
              </IonCol>

              <IonCol size="12" sizeLg="6">
                <SettingsForm />
              </IonCol>

              <IonCol size="12" sizeLg="6">
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
              </IonCol>

              <IonCol size="12" sizeLg="6">
                <IonList>
                  <IonListHeader>
                    <IonLabel>About</IonLabel>
                  </IonListHeader>
                  <IonItem lines="full">
                    <IonLabel>Version {version}</IonLabel>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </ProgressProvider>
    </IonPage>
  );
};

export default AccountPage;
