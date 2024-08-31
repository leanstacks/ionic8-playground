import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';

import { PropsWithTestId } from 'common/components/types';
import Header from 'common/components/Header/Header';
import PageHeader from 'common/components/Content/PageHeader';
import AppDiagnostics from './AppDiagnostics';
import PlatformDiagnostics from './PlatformDiagnostics';

/**
 * The `DiagnosticsPage` renders a layout of components that display information
 * about the application to aid in support and problem resolution.
 *
 * @param {PropsWithTestId} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const DiagnosticsPage = ({ testid = 'page-diagnostics' }: PropsWithTestId): JSX.Element => {
  return (
    <IonPage className="page-diagnostics" data-testid={testid}>
      <Header title="Diagnostics" backButton defaultHref="/tabs/account" />

      <IonContent>
        <IonGrid fixed>
          <IonRow className="ion-margin-top ion-hide-md-down">
            <IonCol>
              <PageHeader border inset>
                Diagnostics
              </PageHeader>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" sizeLg="6">
              <AppDiagnostics />
            </IonCol>

            <IonCol size="12" sizeLg="6">
              <PlatformDiagnostics />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DiagnosticsPage;
