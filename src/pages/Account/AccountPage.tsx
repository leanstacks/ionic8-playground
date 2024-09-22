import {
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPage,
  IonRow,
  IonText,
  useIonRouter,
} from '@ionic/react';
import { useState } from 'react';
import dayjs from 'dayjs';

import { PropsWithTestId } from 'common/components/types';
import { useConfig } from 'common/hooks/useConfig';
import ProgressProvider from 'common/providers/ProgressProvider';
import Header from 'common/components/Header/Header';
import SettingsForm from './components/Settings/SettingsForm';
import List from 'common/components/List/List';

/**
 * The `AccountPage` component renders a list of account related items which
 * a user may perform.
 * @param {PropsWithTestId} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const AccountPage = ({ testid = 'page-account' }: PropsWithTestId): JSX.Element => {
  const [diagnosticsCount, setDiagnosticsCount] = useState<number>(0);
  const config = useConfig();
  const router = useIonRouter();

  const versionTs = dayjs(config.VITE_BUILD_TS).format('YY.MM.DD.hhmm');
  const sha = config.VITE_BUILD_COMMIT_SHA.substring(0, 7);
  const version = `${versionTs}.${sha}`;

  const onDiagnosticsClick = () => {
    if (diagnosticsCount >= 6) {
      setDiagnosticsCount(0);
      router.push('/tabs/account/diagnostics');
    } else {
      setDiagnosticsCount((value) => value + 1);
    }
  };

  return (
    <IonPage className="ls-page-account" data-testid={testid}>
      <ProgressProvider>
        <Header title="My Account" />

        <IonContent>
          <IonGrid fixed>
            <IonRow>
              <IonCol size="12" sizeLg="6" className="order-1-lg">
                <List>
                  <IonListHeader>
                    <IonLabel>Account</IonLabel>
                  </IonListHeader>

                  <IonItem className="text-sm" detail routerLink="/tabs/account/profile">
                    <IonLabel className="font-medium ion-margin-end">Profile</IonLabel>
                  </IonItem>
                  <IonItem className="text-sm" detail routerLink="/auth/signout">
                    <IonLabel className="font-medium ion-margin-end">Sign Out</IonLabel>
                  </IonItem>
                </List>
              </IonCol>

              <IonCol size="12" sizeLg="6" className="order-3-lg">
                <SettingsForm />
              </IonCol>

              <IonCol size="12" sizeLg="6" className="order-2-lg">
                <List>
                  <IonListHeader>
                    <IonLabel>Legal</IonLabel>
                  </IonListHeader>

                  <IonItem className="text-sm">
                    <IonLabel className="font-medium">Privacy policy</IonLabel>
                  </IonItem>
                  <IonItem className="text-sm">
                    <IonLabel className="font-medium">Terms and conditions</IonLabel>
                  </IonItem>
                </List>
              </IonCol>

              <IonCol size="12" sizeLg="6" className="order-4-lg">
                <List>
                  <IonListHeader>
                    <IonLabel>About</IonLabel>
                  </IonListHeader>

                  <IonItem className="text-sm" onClick={() => onDiagnosticsClick()}>
                    <IonLabel className="font-medium ion-margin-end">Version</IonLabel>
                    <IonText>{version}</IonText>
                  </IonItem>
                </List>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </ProgressProvider>
    </IonPage>
  );
};

export default AccountPage;
