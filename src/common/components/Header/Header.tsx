import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

interface HeaderProps extends Pick<HTMLIonBackButtonElement, 'defaultHref'> {
  backButton?: boolean;
  title?: string;
}

const Header = ({ backButton = false, defaultHref, title }: HeaderProps): JSX.Element => {
  return (
    <IonHeader>
      <IonToolbar>
        {backButton && (
          <IonButtons slot="start">
            <IonBackButton defaultHref={defaultHref} />
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <IonMenuButton
            autoHide={false}
            menu="menu-app"
            className="ion-hide-md-down"
            data-testid="menu-app"
          ></IonMenuButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
