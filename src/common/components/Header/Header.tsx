import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps): JSX.Element => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
