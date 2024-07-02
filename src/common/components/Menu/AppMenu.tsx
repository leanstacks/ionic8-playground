import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { home, people } from 'ionicons/icons';

import './AppMenu.scss';

const AppMenu = (): JSX.Element => {
  return (
    <IonMenu
      className="menu-app"
      contentId="content-main"
      data-testid="menu-app"
      menuId="menu-app"
      side="end"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonMenuToggle>
          <IonItem routerLink="/tabs/home" lines="full">
            <IonIcon icon={home} className="icon" />
            <IonLabel>Home</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem routerLink="/tabs/users" lines="full">
            <IonIcon icon={people} className="icon" />
            <IonLabel>Users</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;
