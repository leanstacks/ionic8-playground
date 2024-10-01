import { IonItem, IonLabel, IonListHeader } from '@ionic/react';
import classNames from 'classnames';

import { BaseComponentProps } from 'common/components/types';
import { usePlatform } from 'common/hooks/usePlatform';
import { useGetAppInfo } from 'pages/Account/api/useGetAppInfo';
import List from 'common/components/List/List';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

/**
 * The `AppDiagnostics` component displays application diagnostic information
 * as a list of key/value pairs. The attributes are obtained from the `App`
 * capacitor.
 *
 * @param {BaseComponentProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const AppDiagnostics = ({
  className,
  testid = 'diagnostics-app',
}: BaseComponentProps): JSX.Element => {
  const { isNativePlatform } = usePlatform();
  const { data: appInfo, isLoading } = useGetAppInfo();

  if (isNativePlatform) {
    return (
      <List className={classNames('ls-app-diagnostics', className)} data-testid={testid}>
        <IonListHeader lines="full">
          <IonLabel>App</IonLabel>
        </IonListHeader>
        {isLoading && (
          <IonItem data-testid={`${testid}-loading`}>
            <LoaderSkeleton animated heightStyle="1.5rem" />
          </IonItem>
        )}
        {appInfo && (
          <>
            <IonItem className="text-sm">
              <IonLabel className="font-medium ion-margin-end">Name</IonLabel>
              <IonLabel className="ion-text-end" data-testid={`${testid}-name`}>
                {appInfo.name}
              </IonLabel>
            </IonItem>
            <IonItem className="text-sm">
              <IonLabel className="font-medium ion-margin-end">ID</IonLabel>
              <IonLabel className="ion-text-end" data-testid={`${testid}-id`}>
                {appInfo.id}
              </IonLabel>
            </IonItem>
            <IonItem className="text-sm">
              <IonLabel className="font-medium ion-margin-end">Build</IonLabel>
              <IonLabel className="ion-text-end" data-testid={`${testid}-build`}>
                {appInfo.build}
              </IonLabel>
            </IonItem>
            <IonItem className="text-sm">
              <IonLabel className="font-medium ion-margin-end">Version</IonLabel>
              <IonLabel className="ion-text-end" data-testid={`${testid}-version`}>
                {appInfo.version}
              </IonLabel>
            </IonItem>
          </>
        )}
      </List>
    );
  } else {
    return (
      <List className={classNames('ls-app-diagnostics', className)} data-testid={testid}>
        <IonListHeader lines="full">
          <IonLabel>App</IonLabel>
        </IonListHeader>
        <IonItem className="text-sm">
          <IonLabel color="medium" className="font-medium" data-testid={`${testid}-not-native`}>
            Information available on mobile devices.
          </IonLabel>
        </IonItem>
      </List>
    );
  }
};

export default AppDiagnostics;
