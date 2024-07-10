import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';

import './HomePage.scss';
import Header from 'common/components/Header/Header';
import UserSummaryCard from 'pages/Users/components/UserSummaryCard/UserSummaryCard';
import WelcomeBlock from './components/WelcomeBlock/WelcomeBlock';

/**
 * The `HomePage` component renders the layout for the home page. It displays
 * blocks and cards containing information in a responsive grid.
 * @returns JSX
 */
const HomePage = (): JSX.Element => {
  return (
    <IonPage className="page-home" data-testid="page-home">
      <Header title="Ionic Playground" />

      <IonContent fullscreen>
        <IonGrid fixed>
          <IonRow>
            <IonCol sizeXs="2" sizeMd="1">
              <WelcomeBlock className="block-welcome" />
            </IonCol>
            <IonCol sizeXs="2" sizeMd="1">
              <UserSummaryCard />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
