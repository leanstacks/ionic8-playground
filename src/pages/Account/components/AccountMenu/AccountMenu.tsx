import { IonContent, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { BaseComponentProps } from 'common/components/types';
import { useConfig } from 'common/hooks/useConfig';

const AccountMenu = ({ className, testid = 'menu-account' }: BaseComponentProps): JSX.Element => {
  const config = useConfig();

  const versionTs = dayjs(config.VITE_BUILD_TS).format('YY.MM.DD.hhmm');
  const sha = config.VITE_BUILD_COMMIT_SHA.substring(0, 7);
  const version = `${versionTs}.${sha}`;

  return (
    <IonContent className={classNames('menu-account', className)} data-testid={testid}>
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
          <IonItem lines="full">
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
  );
};

export default AccountMenu;
