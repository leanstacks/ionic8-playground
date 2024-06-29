import {
  IonBackButton,
  IonBadge,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useConfig } from '../../hooks/useConfig';

const NewItemPage = (): JSX.Element => {
  const config = useConfig();

  return (
    <IonPage data-testid="page-item-new">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>New Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
      <IonFooter>
        <IonBadge>{config.VITE_BUILD_ENV_CODE}</IonBadge>
      </IonFooter>
    </IonPage>
  );
};

export default NewItemPage;
