import { IonItem, IonLabel, IonListHeader, IonText } from '@ionic/react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { BaseComponentProps } from 'common/components/types';
import List from 'common/components/List/List';
import { useConfig } from 'common/hooks/useConfig';

/**
 * The `BuildDiagnostics` component displays application diagnostic information
 * as a list of key/value pairs. The attributes are obtained from the application
 * configuration with values obtained from the DevOps automation pipeline.
 *
 * @param {BaseComponentProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const BuildDiagnostics = ({
  className,
  testid = 'diagnostics-build',
}: BaseComponentProps): JSX.Element => {
  const config = useConfig();

  return (
    <List className={classNames('build-diagnostics', className)} data-testid={testid}>
      <IonListHeader lines="full">
        <IonLabel>Build</IonLabel>
      </IonListHeader>

      <IonItem className="text-sm">
        <IonLabel className="font-medium ion-margin-end">Environment</IonLabel>
        <IonText>{config.VITE_BUILD_ENV_CODE}</IonText>
      </IonItem>
      <IonItem className="text-sm">
        <IonLabel className="font-medium ion-margin-end">Time</IonLabel>
        <IonText>{dayjs(config.VITE_BUILD_TS).format('YYYY-MM-DD HH:mm:ss Z')}</IonText>
      </IonItem>
      <IonItem className="text-sm">
        <IonLabel className="font-medium ion-margin-end">SHA</IonLabel>
        <IonText>{config.VITE_BUILD_COMMIT_SHA}</IonText>
      </IonItem>
      <IonItem className="text-sm">
        <IonLabel className="font-medium ion-margin-end">Workflow</IonLabel>
        <IonText>
          {config.VITE_BUILD_WORKFLOW_NAME} {config.VITE_BUILD_WORKFLOW_RUN_NUMBER}.
          {config.VITE_BUILD_WORKFLOW_RUN_ATTEMPT}
        </IonText>
      </IonItem>
    </List>
  );
};

export default BuildDiagnostics;
