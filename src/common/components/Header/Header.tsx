import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

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
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
