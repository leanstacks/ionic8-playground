import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';

import TabNavigation from './TabNavigation';

const AppRouter = (): JSX.Element => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tabs" render={() => <TabNavigation />} />
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
