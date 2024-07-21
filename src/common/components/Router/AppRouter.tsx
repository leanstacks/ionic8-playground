import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';

import TabNavigation from './TabNavigation';

/**
 * The application router.  This is the main router for the Ionic React
 * application.
 *
 * This application uses Ionic tab navigation, therefore, the main
 * router redirect users to the `TabNavigation` component.
 * @returns JSX
 * @see {@link TabNavigation}
 */
const AppRouter = (): JSX.Element => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tabs" render={() => <TabNavigation />} />
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
        <Route render={() => <Redirect to="/tabs" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
