import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';

import TabNavigation from './TabNavigation';
import SignInPage from 'pages/Auth/SignIn/SignInPage';

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
        <Route path="/auth/signin" render={() => <SignInPage />} />
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
        <Route render={() => <Redirect to="/tabs" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
