import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ConfigContextProvider from './common/providers/ConfigProvider';
import { queryClient } from 'common/utils/query-client';
import HomePage from './pages/Home/HomePage';
import NewItemPage from './pages/Items/NewItemPage';
import UsersPage from 'pages/Users/UsersPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp data-testid="app">
    <ConfigContextProvider>
      <QueryClientProvider client={queryClient}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/new">
              <NewItemPage />
            </Route>
            <Route exact path="/users">
              <UsersPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/users" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigContextProvider>
  </IonApp>
);

export default App;
