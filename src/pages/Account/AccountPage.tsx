import { IonContent, IonItem, IonLabel, IonList, IonListHeader, IonPage } from '@ionic/react';

import './AccountPage.scss';
import { PropsWithTestId } from 'common/components/types';
import Header from 'common/components/Header/Header';

/**
 * The `AccountPage` component renders a list of account related items which
 * a user may perform.
 * @param {PropsWithTestId} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const AccountPage = ({ testid = 'page-account' }: PropsWithTestId): JSX.Element => {
  return (
    <IonPage className="page-account" data-testid={testid}>
      <Header title="My Account" />

      <IonContent fullscreen>
        <IonList>
          <IonListHeader>
            <IonLabel>Account</IonLabel>
          </IonListHeader>
          <IonItem routerLink="/auth/signout">
            <IonLabel>Sign Out</IonLabel>
          </IonItem>
        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>Legal</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Privacy policy</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Terms and conditions</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AccountPage;
